/**
 * LockwoodSTEM Certification Account Backend
 *
 * Deploy as a Google Apps Script Web App:
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * Then paste the /exec Web App URL into:
 * certifications/auth-config.js
 */

const SHEET_USERS = 'Users';
const SHEET_SESSIONS = 'Sessions';

function doGet() {
  return json_({
    ok: true,
    message: 'LockwoodSTEM Certification Account Backend is running.'
  });
}

function doPost(e) {
  try {
    setup_();

    const payload = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : '{}');
    const action = String(payload.action || '').toLowerCase();

    if (action === 'register') return register_(payload);
    if (action === 'login') return login_(payload);
    if (action === 'validate') return validate_(payload);
    if (action === 'logout') return logout_(payload);

    return json_({ ok: false, error: 'Unknown account action.' });
  } catch (err) {
    return json_({ ok: false, error: err.message || String(err) });
  }
}

function setup_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let users = ss.getSheetByName(SHEET_USERS);
  if (!users) {
    users = ss.insertSheet(SHEET_USERS);
    users.appendRow([
      'userId', 'createdAt', 'updatedAt', 'firstName', 'lastName',
      'email', 'studentId', 'period', 'passwordSalt', 'passwordHash',
      'role', 'status', 'lastLogin'
    ]);
    users.setFrozenRows(1);
  }

  let sessions = ss.getSheetByName(SHEET_SESSIONS);
  if (!sessions) {
    sessions = ss.insertSheet(SHEET_SESSIONS);
    sessions.appendRow([
      'token', 'userId', 'createdAt', 'expiresAt', 'revokedAt'
    ]);
    sessions.setFrozenRows(1);
  }
}

function register_(payload) {
  const firstName = clean_(payload.firstName);
  const lastName = clean_(payload.lastName);
  const email = clean_(payload.email).toLowerCase();
  const studentId = clean_(payload.studentId);
  const period = clean_(payload.period);
  const password = String(payload.password || '');

  if (!firstName || !lastName || !email || !studentId || !period || !password) {
    return json_({ ok: false, error: 'All account fields are required.' });
  }
  if (password.length < 8) {
    return json_({ ok: false, error: 'Password must be at least 8 characters.' });
  }

  const users = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
  const existing = findUser_(email, studentId);
  if (existing) {
    return json_({ ok: false, error: 'An account already exists for that email or student ID.' });
  }

  const userId = Utilities.getUuid();
  const salt = Utilities.getUuid();
  const hash = hashPassword_(password, salt);
  const now = new Date().toISOString();

  users.appendRow([
    userId, now, now, firstName, lastName, email, studentId, period,
    salt, hash, 'student', 'active', ''
  ]);

  const user = publicUser_({
    userId, firstName, lastName, email, studentId, period,
    role: 'student', status: 'active'
  });

  const session = createSession_(userId);
  return json_({
    ok: true,
    token: session.token,
    expiresAt: session.expiresAt,
    user
  });
}

function login_(payload) {
  const identifier = clean_(payload.identifier).toLowerCase();
  const password = String(payload.password || '');

  if (!identifier || !password) {
    return json_({ ok: false, error: 'Email/student ID and password are required.' });
  }

  const found = findUser_(identifier, identifier);
  if (!found) {
    return json_({ ok: false, error: 'Account not found.' });
  }

  const row = found.row;
  const user = found.user;
  if (String(user.status).toLowerCase() !== 'active') {
    return json_({ ok: false, error: 'This account is not active.' });
  }

  const expected = hashPassword_(password, user.passwordSalt);
  if (expected !== user.passwordHash) {
    return json_({ ok: false, error: 'Incorrect password.' });
  }

  const users = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
  users.getRange(row, 13).setValue(new Date().toISOString());

  const session = createSession_(user.userId);
  return json_({
    ok: true,
    token: session.token,
    expiresAt: session.expiresAt,
    user: publicUser_(user)
  });
}

function validate_(payload) {
  const token = clean_(payload.token);
  if (!token) return json_({ ok: false, error: 'Missing session token.' });

  const sessions = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SESSIONS);
  const values = sessions.getDataRange().getValues();
  const now = new Date();

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (String(row[0]) === token) {
      const userId = row[1];
      const expiresAt = new Date(row[3]);
      const revokedAt = row[4];

      if (revokedAt) return json_({ ok: false, error: 'Session has been logged out.' });
      if (expiresAt < now) return json_({ ok: false, error: 'Session has expired.' });

      const found = findUserById_(userId);
      if (!found) return json_({ ok: false, error: 'Account not found.' });
      if (String(found.user.status).toLowerCase() !== 'active') {
        return json_({ ok: false, error: 'This account is not active.' });
      }

      return json_({ ok: true, user: publicUser_(found.user) });
    }
  }

  return json_({ ok: false, error: 'Invalid session token.' });
}

function logout_(payload) {
  const token = clean_(payload.token);
  if (!token) return json_({ ok: true });

  const sessions = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SESSIONS);
  const values = sessions.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === token) {
      sessions.getRange(i + 1, 5).setValue(new Date().toISOString());
      break;
    }
  }

  return json_({ ok: true });
}

function createSession_(userId) {
  const sessions = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SESSIONS);
  const token = Utilities.getUuid() + '-' + Utilities.getUuid();
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 1000 * 60 * 60 * 24 * 30); // 30 days

  sessions.appendRow([
    token,
    userId,
    createdAt.toISOString(),
    expiresAt.toISOString(),
    ''
  ]);

  return {
    token,
    expiresAt: expiresAt.toISOString()
  };
}

function findUser_(emailOrIdentifier, studentIdOrIdentifier) {
  const users = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
  const values = users.getDataRange().getValues();

  const emailNeedle = String(emailOrIdentifier || '').toLowerCase();
  const idNeedle = String(studentIdOrIdentifier || '').toLowerCase();

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const email = String(row[5] || '').toLowerCase();
    const studentId = String(row[6] || '').toLowerCase();
    if (email === emailNeedle || studentId === idNeedle) {
      return { row: i + 1, user: rowToUser_(row) };
    }
  }
  return null;
}

function findUserById_(userId) {
  const users = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
  const values = users.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (String(row[0]) === String(userId)) {
      return { row: i + 1, user: rowToUser_(row) };
    }
  }
  return null;
}

function rowToUser_(row) {
  return {
    userId: row[0],
    createdAt: row[1],
    updatedAt: row[2],
    firstName: row[3],
    lastName: row[4],
    email: row[5],
    studentId: row[6],
    period: row[7],
    passwordSalt: row[8],
    passwordHash: row[9],
    role: row[10],
    status: row[11],
    lastLogin: row[12]
  };
}

function publicUser_(user) {
  return {
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: [user.firstName, user.lastName].filter(Boolean).join(' '),
    email: user.email,
    studentId: user.studentId,
    period: user.period,
    role: user.role,
    status: user.status
  };
}

function hashPassword_(password, salt) {
  const secret = PropertiesService.getScriptProperties().getProperty('AUTH_SECRET') || 'CHANGE_THIS_SECRET_IN_SCRIPT_PROPERTIES';
  const raw = salt + ':' + password + ':' + secret;
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw);
  return bytes.map(function (b) {
    const v = (b < 0 ? b + 256 : b).toString(16);
    return v.length === 1 ? '0' + v : v;
  }).join('');
}

function clean_(value) {
  return String(value == null ? '' : value).trim();
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
