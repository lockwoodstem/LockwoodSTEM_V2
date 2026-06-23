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
const SHEET_CERTIFICATIONS = 'Certifications';
const SHEET_HANDS_ON = 'HandsOn';

function doGet() {
  return json_({
    ok: true,
    message: 'LockwoodSTEM Certification Account Backend is running.'
  });
}


function setup() {
  setup_();
  return 'LockwoodSTEM certification account sheets created.';
}

function promoteTeacherAccount() {
  setup_();
  const teacherEmail = PropertiesService.getScriptProperties().getProperty('TEACHER_EMAIL') || 'jdlockwo@gmail.com';
  const found = findUser_(teacherEmail, teacherEmail);
  if (!found) {
    return 'No user account found for ' + teacherEmail + '. Create the account first or set TEACHER_EMAIL in Script Properties.';
  }
  const users = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
  users.getRange(found.row, 3).setValue(new Date().toISOString());
  users.getRange(found.row, 11).setValue('teacher');
  users.getRange(found.row, 12).setValue('active');
  return 'Teacher role assigned to ' + teacherEmail;
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
    if (action === 'submitcertification') return submitCertification_(payload);
    if (action === 'getcertificationstatus') return getCertificationStatus_(payload);
    if (action === 'getallcertificationstatuses') return getAllCertificationStatuses_(payload);
    if (action === 'sethandsoncompletion') return setHandsOnCompletion_(payload);
    if (action === 'getteacherdashboard') return getTeacherDashboard_(payload);

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

  let certs = ss.getSheetByName(SHEET_CERTIFICATIONS);
  if (!certs) {
    certs = ss.insertSheet(SHEET_CERTIFICATIONS);
    certs.appendRow([
      'attemptId', 'timestamp', 'userId', 'firstName', 'lastName', 'email',
      'studentId', 'period', 'certId', 'certName', 'scorePercent',
      'correct', 'total', 'passed', 'answersJson'
    ]);
    certs.setFrozenRows(1);
  }

  let handsOn = ss.getSheetByName(SHEET_HANDS_ON);
  if (!handsOn) {
    handsOn = ss.insertSheet(SHEET_HANDS_ON);
    handsOn.appendRow([
      'recordId', 'timestamp', 'teacherUserId', 'teacherName',
      'studentUserId', 'certId', 'completed', 'notes'
    ]);
    handsOn.setFrozenRows(1);
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


function submitCertification_(payload) {
  const token = clean_(payload.token);
  const certId = clean_(payload.certId);
  const certName = clean_(payload.certName) || certId;
  const answers = payload.answers || {};

  if (!token) return json_({ ok: false, error: 'Missing session token.' });
  const auth = validateTokenForServer_(token);
  if (!auth.ok) return json_(auth);

  let score;
  if (certId === 'engineering-safety') {
    score = scoreEngineeringSafety_(answers);
  } else if (certId === '3d-printing') {
    score = score3DPrinting_(answers);
  } else {
    return json_({ ok: false, error: 'Unknown certification.' });
  }
  const passed = score.percent >= 80;
  const now = new Date().toISOString();
  const attemptId = Utilities.getUuid();

  const certs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CERTIFICATIONS);
  certs.appendRow([
    attemptId,
    now,
    auth.user.userId,
    auth.user.firstName,
    auth.user.lastName,
    auth.user.email,
    auth.user.studentId,
    auth.user.period,
    certId,
    certName,
    score.percent,
    score.correct,
    score.total,
    passed,
    JSON.stringify(answers)
  ]);

  const currentStatus = statusForUserCert_(auth.user.userId, certId);
  return json_({
    ok: true,
    attemptId: attemptId,
    certId: certId,
    certName: certName,
    percent: score.percent,
    correct: score.correct,
    total: score.total,
    onlinePassed: passed,
    passed: currentStatus.badgeEarned,
    handsOnComplete: currentStatus.handsOnComplete,
    badgeEarned: currentStatus.badgeEarned,
    recordedAt: now
  });
}


function getCertificationStatus_(payload) {
  const token = clean_(payload.token);
  const certId = clean_(payload.certId);
  if (!token) return json_({ ok: false, error: 'Missing session token.' });

  const auth = validateTokenForServer_(token);
  if (!auth.ok) return json_(auth);

  return json_({
    ok: true,
    status: statusForUserCert_(auth.user.userId, certId)
  });
}

function getAllCertificationStatuses_(payload) {
  const token = clean_(payload.token);
  if (!token) return json_({ ok: false, error: 'Missing session token.' });

  const auth = validateTokenForServer_(token);
  if (!auth.ok) return json_(auth);

  const certIds = getCertificationIds_();
  const statuses = {};
  certIds.forEach(function (certId) {
    statuses[certId] = statusForUserCert_(auth.user.userId, certId);
  });

  return json_({
    ok: true,
    statuses: statuses
  });
}

function getTeacherDashboard_(payload) {
  const token = clean_(payload.token);
  if (!token) return json_({ ok: false, error: 'Missing session token.' });

  const auth = validateTokenForServer_(token);
  if (!auth.ok) return json_(auth);
  if (String(auth.user.role).toLowerCase() !== 'teacher') {
    return json_({ ok: false, error: 'Teacher access is required.' });
  }

  const users = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
  const values = users.getDataRange().getValues();
  const certIds = getCertificationIds_();
  const students = [];

  for (let i = 1; i < values.length; i++) {
    const user = rowToUser_(values[i]);
    if (String(user.role).toLowerCase() === 'teacher') continue;
    if (String(user.status).toLowerCase() !== 'active') continue;

    const statuses = {};
    certIds.forEach(function (certId) {
      statuses[certId] = statusForUserCert_(user.userId, certId);
    });

    students.push({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: [user.firstName, user.lastName].filter(Boolean).join(' '),
      email: user.email,
      studentId: user.studentId,
      period: user.period,
      statuses: statuses
    });
  }

  return json_({
    ok: true,
    teacher: publicUser_(auth.user),
    certifications: getCertificationList_(),
    students: students
  });
}

function setHandsOnCompletion_(payload) {
  const token = clean_(payload.token);
  const studentUserId = clean_(payload.studentUserId);
  const certId = clean_(payload.certId);
  const completed = String(payload.completed).toLowerCase() === 'true';
  const notes = clean_(payload.notes);

  if (!token) return json_({ ok: false, error: 'Missing session token.' });
  if (!studentUserId || !certId) return json_({ ok: false, error: 'Missing student or certification.' });

  const auth = validateTokenForServer_(token);
  if (!auth.ok) return json_(auth);
  if (String(auth.user.role).toLowerCase() !== 'teacher') {
    return json_({ ok: false, error: 'Teacher access is required.' });
  }

  const student = findUserById_(studentUserId);
  if (!student) return json_({ ok: false, error: 'Student account not found.' });

  const status = statusForUserCert_(studentUserId, certId);
  if (requiresOnlineTest_(certId) && !status.onlinePassed && completed) {
    return json_({ ok: false, error: 'Online test must be passed before hands-on completion can be marked.' });
  }

  const handsOn = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_HANDS_ON);
  handsOn.appendRow([
    Utilities.getUuid(),
    new Date().toISOString(),
    auth.user.userId,
    [auth.user.firstName, auth.user.lastName].filter(Boolean).join(' '),
    studentUserId,
    certId,
    completed,
    notes
  ]);

  return json_({
    ok: true,
    status: statusForUserCert_(studentUserId, certId)
  });
}

function statusForUserCert_(userId, certId) {
  const online = onlineStatusForUserCert_(userId, certId);
  const hands = handsOnStatusForUserCert_(userId, certId);
  const requiresHandsOn = true;
  const requiresOnline = requiresOnlineTest_(certId);
  const onlinePassed = requiresOnline ? online.onlinePassed : false;
  const handsOnComplete = hands.completed;
  const badgeEarned = requiresOnline ? (onlinePassed && handsOnComplete) : handsOnComplete;
  const certifiedAt = badgeEarned ? (hands.timestamp || online.certifiedAt || '') : '';

  return {
    certId: certId,
    hasAttempt: online.hasAttempt,
    attempts: online.attempts,
    bestPercent: online.bestPercent,
    lastAttemptAt: online.lastAttemptAt,
    onlinePassed: onlinePassed,
    passed: badgeEarned,
    requiresHandsOn: requiresHandsOn,
    requiresOnline: requiresOnline,
    handsOnComplete: handsOnComplete,
    handsOnAt: hands.timestamp,
    handsOnTeacher: hands.teacherName,
    badgeEarned: badgeEarned,
    certifiedAt: certifiedAt
  };
}

function onlineStatusForUserCert_(userId, certId) {
  const certs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CERTIFICATIONS);
  const values = certs.getDataRange().getValues();

  let attempts = 0;
  let bestPercent = 0;
  let lastAttemptAt = '';
  let certifiedAt = '';
  let onlinePassed = false;

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const rowUserId = String(row[2]);
    const rowCertId = String(row[8]);
    if (rowUserId !== String(userId) || rowCertId !== String(certId)) continue;

    attempts++;
    const timestamp = String(row[1]);
    const percent = Number(row[10]) || 0;
    const rowPassed = String(row[13]).toLowerCase() === 'true';

    if (!lastAttemptAt || new Date(timestamp) > new Date(lastAttemptAt)) {
      lastAttemptAt = timestamp;
    }
    if (percent > bestPercent) bestPercent = percent;
    if (rowPassed) {
      onlinePassed = true;
      if (!certifiedAt || new Date(timestamp) < new Date(certifiedAt)) {
        certifiedAt = timestamp;
      }
    }
  }

  return {
    hasAttempt: attempts > 0,
    attempts: attempts,
    bestPercent: bestPercent,
    lastAttemptAt: lastAttemptAt,
    onlinePassed: onlinePassed,
    certifiedAt: certifiedAt
  };
}

function handsOnStatusForUserCert_(userId, certId) {
  const handsOn = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_HANDS_ON);
  const values = handsOn.getDataRange().getValues();

  let latest = null;
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const rowUserId = String(row[4]);
    const rowCertId = String(row[5]);
    if (rowUserId !== String(userId) || rowCertId !== String(certId)) continue;
    if (!latest || new Date(row[1]) > new Date(latest.timestamp)) {
      latest = {
        timestamp: String(row[1]),
        teacherName: String(row[3]),
        completed: String(row[6]).toLowerCase() === 'true',
        notes: String(row[7] || '')
      };
    }
  }

  return latest || {
    timestamp: '',
    teacherName: '',
    completed: false,
    notes: ''
  };
}

function getCertificationList_() {
  return [
    { certId: 'engineering-safety', label: 'Engineering Safety', hasOnline: true },
    { certId: 'technical-sketching', label: 'Technical Sketching', hasOnline: false },
    { certId: 'engineering-documentation', label: 'Engineering Documentation', hasOnline: false },
    { certId: 'fusion-cad-level-1', label: 'Fusion CAD Level 1', hasOnline: false },
    { certId: 'engineering-drawings', label: 'Engineering Drawings', hasOnline: false },
    { certId: 'fusion-cad-level-2', label: 'Fusion CAD Level 2', hasOnline: false },
    { certId: '3d-printing', label: '3D Printing', hasOnline: true },
    { certId: 'laser-cutting', label: 'Laser Cutting', hasOnline: false },
    { certId: 'cnc', label: 'CNC Mill', hasOnline: false },
    { certId: 'drill-press', label: 'Drill Press', hasOnline: false },
    { certId: 'soldering', label: 'Soldering', hasOnline: false },
    { certId: 'hand-cutting-tools', label: 'Hand & Cutting Tools', hasOnline: false }
  ];
}

function getCertificationIds_() {
  return getCertificationList_().map(function (cert) { return cert.certId; });
}

function requiresOnlineTest_(certId) {
  return certId === 'engineering-safety' || certId === '3d-printing';
}

function validateTokenForServer_(token) {
  const sessions = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SESSIONS);
  const values = sessions.getDataRange().getValues();
  const now = new Date();

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (String(row[0]) === String(token)) {
      const userId = row[1];
      const expiresAt = new Date(row[3]);
      const revokedAt = row[4];

      if (revokedAt) return { ok: false, error: 'Session has been logged out.' };
      if (expiresAt < now) return { ok: false, error: 'Session has expired.' };

      const found = findUserById_(userId);
      if (!found) return { ok: false, error: 'Account not found.' };
      if (String(found.user.status).toLowerCase() !== 'active') {
        return { ok: false, error: 'This account is not active.' };
      }

      return { ok: true, user: found.user };
    }
  }
  return { ok: false, error: 'Invalid session token.' };
}

function scoreEngineeringSafety_(answers) {
  const key = {
    q1: 'complete instruction/certification and receive permission',
    q2: 'fabricating, cutting, drilling, sanding, soldering, or using powered equipment',
    q3: 'report it and do not use it',
    q4: 'get caught in moving equipment',
    q5: 'catch and pull a hand toward moving parts',
    q6: 'stop work and alert the teacher immediately',
    q7: 'never acceptable',
    q8: 'not be used until approved by the teacher',
    q9: 'only after the machine fully stops',
    q10: 'keep materials secure and hands away from danger',
    q11: 'not operate it',
    q12: 'it allows safe movement and emergency access',
    q13: 'a broken bit, damaged cord, missing guard, or unusual machine behavior',
    q14: 'help identify hazards before someone gets hurt',
    q15: 'return tools, clean the area, and secure materials',
    q16: 'for immediate safety concerns',
    q17: 'they are unsure about a tool, material, setup, or procedure',
    q18: 'handled carefully and allowed to cool or be deburred when needed',
    q19: 'the student, classmates, equipment, and workspace',
    q20: 'pause when unsure, communicate concerns, and follow the approved process'
  };

  let correct = 0;
  const total = Object.keys(key).length;
  Object.keys(key).forEach(function (id) {
    if (String(answers[id] || '').trim() === key[id]) correct++;
  });

  return {
    correct: correct,
    total: total,
    percent: Math.round((correct / total) * 100)
  };
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


function score3DPrinting_(answers) {
  const key = {
    q1: 'printer profile, filament/material profile, model scale, and estimated print time',
    q2: 'PLA unless another material is approved',
    q3: 'only after instruction, certification requirements, and permission',
    q4: 'matches slicing assumptions to the printer being used',
    q5: 'check units and scale before printing',
    q6: 'improve bed contact, reduce unnecessary supports, and support the part\'s function',
    q7: 'when the model has unsupported overhangs or features that need them',
    q8: 'the part\'s function, time, material use, and required strength',
    q9: 'layer, support, orientation, and first-layer problems before printing',
    q10: 'clear, installed correctly, and ready for the selected printer',
    q11: 'poor first-layer adhesion often causes print failure',
    q12: 'stop or ask for help immediately',
    q13: 'parts are moving or hot surfaces may be present',
    q14: 'teacher-approved, clean, dry, untangled, and properly supported',
    q15: 'reported instead of forced',
    q16: 'using approved methods after cooling when required',
    q17: 'cleaned up and disposed of in the correct location',
    q18: 'identifying the cause and changing the design, orientation, or settings before reprinting',
    q19: 'complete a safe supervised print workflow from setup through cleanup',
    q20: 'the online test is passed and the teacher marks the hands-on portion complete'
  };

  let correct = 0;
  const total = Object.keys(key).length;
  Object.keys(key).forEach(function (id) {
    if (String(answers[id] || '').trim() === key[id]) correct++;
  });

  return {
    correct: correct,
    total: total,
    percent: Math.round((correct / total) * 100)
  };
}
