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
  } else if (certId === 'laser-cutting') {
    score = scoreLaserCutting_(answers);
  } else if (certId === 'drill-press') {
    score = scoreDrillPress_(answers);
  } else if (certId === 'hand-cutting-tools') {
    score = scoreHandCuttingTools_(answers);
  } else if (certId === 'soldering') {
    score = scoreSoldering_(answers);
  } else if (certId === 'cnc') {
    score = scoreCNC_(answers);
  } else if (certId === 'technical-sketching') {
    score = scoreTechnicalSketching_(answers);
  } else if (certId === 'engineering-documentation') {
    score = scoreEngineeringDocumentation_(answers);
  } else if (certId === 'fusion-cad-level-1') {
    score = scoreFusionCADLevel1_(answers);
  } else if (certId === 'engineering-drawings') {
    score = scoreEngineeringDrawings_(answers);
  } else if (certId === 'fusion-cad-level-2') {
    score = scoreFusionCADLevel2_(answers);
  } else if (certId === 'design-review') {
    score = scoreDesignReview_(answers);
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
    { certId: 'technical-sketching', label: 'Technical Sketching', hasOnline: true },
    { certId: 'engineering-documentation', label: 'Engineering Documentation', hasOnline: true },
    { certId: 'fusion-cad-level-1', label: 'Fusion CAD Level 1', hasOnline: true },
    { certId: 'engineering-drawings', label: 'Engineering Drawings', hasOnline: true },
    { certId: 'fusion-cad-level-2', label: 'Fusion CAD Level 2', hasOnline: true },
    { certId: 'design-review', label: 'Design Review', hasOnline: true },
    { certId: '3d-printing', label: '3D Printing', hasOnline: true },
    { certId: 'laser-cutting', label: 'Laser Cutting', hasOnline: true },
    { certId: 'cnc', label: 'CNC Mill', hasOnline: true },
    { certId: 'drill-press', label: 'Drill Press', hasOnline: true },
    { certId: 'soldering', label: 'Soldering', hasOnline: true },
    { certId: 'hand-cutting-tools', label: 'Hand & Cutting Tools', hasOnline: true }
  ];
}

function getCertificationIds_() {
  return getCertificationList_().map(function (cert) { return cert.certId; });
}

function requiresOnlineTest_(certId) {
  return certId === 'engineering-safety' || certId === '3d-printing' || certId === 'laser-cutting' || certId === 'drill-press' || certId === 'hand-cutting-tools' || certId === 'soldering' || certId === 'cnc' || certId === 'technical-sketching' || certId === 'engineering-documentation' || certId === 'fusion-cad-level-1' || certId === 'engineering-drawings' || certId === 'fusion-cad-level-2' || certId === 'design-review';
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


function scoreLaserCutting_(answers) {
  const key = {
    q1: 'instruction, certification requirements, teacher permission, and supervision expectations are met',
    q2: 'staying with the laser and watching the job for smoke, flame, material movement, and unsafe behavior',
    q3: 'not lasered unless identified and approved',
    q4: 'on and functioning before cutting or engraving',
    q5: 'stop or pause the job and ask for help',
    q6: 'pause/stop the job and alert the teacher',
    q7: 'material approval, file scale, operation settings, focus/origin, ventilation, and job boundary',
    q8: 'cutting or scoring',
    q9: 'engraving',
    q10: 'cause the same path to cut more than once and overburn material',
    q11: 'the job fits on the material and is positioned correctly',
    q12: 'flat and secure on the bed so it will not shift during the job',
    q13: 'only after motion stops and it is safe to do so',
    q14: 'reduce flare-ups and improve cut quality when required',
    q15: 'pause/stop the job and ask for help',
    q16: 'hot edges, smoldering pieces, scrap, and machine/material issues',
    q17: 'removing parts/scrap safely, cleaning the bed, and returning tools/materials',
    q18: 'stop and ask for help',
    q19: 'complete a safe supervised laser workflow from material approval through cleanup',
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


function scoreDrillPress_(answers) {
  const key = {
    q1: 'instruction, certification requirements, teacher permission, and supervision expectations are met',
    q2: 'rotating parts, entanglement, flying chips, and spinning workpieces',
    q3: 'whenever drilling or standing near active drilling',
    q4: 'secured before operating the drill press',
    q5: 'catch in rotating parts and pull a hand toward the bit',
    q6: 'removed immediately after tightening and before turning on the machine',
    q7: 'correct for the material and hole size, straight, undamaged, and seated properly',
    q8: 'clamped or held in an approved vise/fixture',
    q9: 'prevent the workpiece from spinning or shifting and keep hands away from the bit',
    q10: 'reduce tear-out and protect the drill press table',
    q11: 'material, bit size, and teacher-approved settings',
    q12: 'slower speeds',
    q13: 'start the machine, lower the bit with controlled pressure, and avoid forcing the cut',
    q14: 'drill a little, back out to clear chips, then continue',
    q15: 'after the spindle fully stops, using a brush or approved tool',
    q16: 'turn off the machine and wait for the spindle and bit to fully stop',
    q17: 'stop and check the setup or ask for help',
    q18: 'stop the machine and ask for teacher assistance',
    q19: 'removing chips safely, returning bits/clamps/tools, and leaving the station ready',
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


function scoreHandCuttingTools_(answers) {
  const key = {
    q1: 'instruction and teacher permission',
    q2: 'measure, mark, support, and secure the material',
    q3: 'away from the body, hands, and classmates',
    q4: 'behind or away from the blade path',
    q5: 'light repeated passes instead of one forced deep cut',
    q6: 'retracted, covered, or stored safely',
    q7: 'reported and not used',
    q8: 'secure material and keep hands out of the tool path',
    q9: 'puts fingers in the blade path',
    q10: 'protect the table and support the cut',
    q11: 'only on approved materials and thicknesses',
    q12: 'closed or point-down, and passed handle-first',
    q13: 'secured when needed and handled with controlled strokes',
    q14: 'deburred, sanded, or handled carefully when appropriate',
    q15: 'approved cleanup methods, not by blowing them into the air',
    q16: 'feels dull, damaged, loose, or unsafe',
    q17: 'stop and ask for help',
    q18: 'returning tools, disposing of scrap correctly, and leaving the station ready',
    q19: 'safely measure, support, cut, finish, and clean up under teacher observation',
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


function scoreSoldering_(answers) {
  const key = {
    q1: 'instruction, certification requirements, teacher permission, and supervision expectations are met',
    q2: 'whenever the station is active or recently used',
    q3: 'returned to its stand',
    q4: 'hot solder, clipped leads, and small parts can injure eyes',
    q5: 'reduce direct exposure to solder fumes',
    q6: 'kept away from soldering stations',
    q7: 'iron stand, fume control, tip cleaner, solder, secured work, and clear workspace',
    q8: 'transfers heat better',
    q9: 'approved sponge or brass wool methods',
    q10: 'heat the joint surfaces, then feed solder into the heated joint',
    q11: 'shiny/smooth, properly wetted, and not excessive',
    q12: 'dull, grainy, cracked, balled-up, or poorly bonded',
    q13: 'accidental solder connecting points that should be separate',
    q14: 'hide problems or create shorts',
    q15: 'create weak or intermittent electrical connections',
    q16: 'small pieces can fly and injure eyes or create debris',
    q17: 'damage components, insulation, or the circuit board',
    q18: 'inspect for bridges, cold joints, loose wires, and clipped leads',
    q19: 'turning off/unplugging as instructed, returning tools, disposing scraps, and washing hands',
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


function scoreCNC_(answers) {
  const key = {
    q1: 'instruction, certification requirements, teacher permission, and supervision expectations are met',
    q2: 'automatic machine motion, rotating tools, flying chips, dust, and loose stock',
    q3: 'during CNC setup, cutting, chip clearing, and cleanup',
    q4: 'catch in rotating parts and pull a hand toward the tool',
    q5: 'the teacher has approved the material for the machine, bit, and project',
    q6: 'cause a crash, wrong depth, incomplete cut, or damage',
    q7: 'correct for the material and operation, undamaged, and secured properly',
    q8: 'units, scale, stock size, origin, setup orientation, tool, and toolpath preview',
    q9: 'wrong depth, collisions, clamp hits, and toolpaths outside the stock',
    q10: 'review and approval according to the class workflow',
    q11: 'secure stock so it cannot shift or spin during cutting',
    q12: 'outside the toolpath',
    q13: 'cutting depth relative to the stock or machine bed',
    q14: 'machine motion and setup before the real cut',
    q15: 'sound, chips, dust, tool motion, and stock movement',
    q16: 'the stock moves, the bit breaks, unusual sounds occur, or the toolpath looks wrong',
    q17: 'wait for the spindle and all motion to fully stop',
    q18: 'with approved brushes or vacuum methods after motion stops',
    q19: 'safely set up, review, monitor, stop, and clean up a supervised CNC workflow',
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


function scoreTechnicalSketching_(answers) {
  const key = {
    q1: 'communicate shape, features, scale relationships, and design intent',
    q2: 'clear, readable, and accurate enough to communicate the idea',
    q3: 'plan proportions and layout before darkening final object lines',
    q4: 'distinguish final object edges from planning marks and notes',
    q5: 'three faces of an object in one pictorial view',
    q6: 'one vertical axis and two receding axes about 30° from horizontal',
    q7: 'stay parallel to the matching isometric axis',
    q8: 'ellipses',
    q9: 'front, top, and right side',
    q10: 'width, height, and depth relationships are consistent',
    q11: 'show the object\'s most descriptive shape when possible',
    q12: 'edges that can be seen from the selected view',
    q13: 'edges or features behind visible surfaces',
    q14: 'axes of symmetry, holes, cylinders, and circular features',
    q15: 'identify important features without cluttering the sketch',
    q16: 'a note refers to a specific feature',
    q17: 'date, title, purpose, sketch, notes, and revision information when needed',
    q18: 'kept with notes explaining what changed',
    q19: 'drawing too small to read or misaligning orthographic views',
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


function scoreEngineeringDocumentation_(answers) {
  const key = {
    q1: 'what was designed, tested, changed, and learned',
    q2: 'communicate, defend decisions, repeat tests, and improve designs',
    q3: 'date, title, project/task, and purpose',
    q4: 'labeled clearly',
    q5: 'kept with notes explaining changes and lessons learned',
    q6: 'why a decision was made using constraints, criteria, evidence, or test results',
    q7: 'criteria, weights when used, scores, and a short interpretation',
    q8: 'what was tested, how it was tested, and what variables were controlled or changed',
    q9: 'units',
    q10: 'recorded honestly and interpreted',
    q11: 'show useful evidence and include labels or captions',
    q12: 'what the image shows and why it matters',
    q13: 'what changed, when it changed, and why it changed',
    q14: 'provide comparison or evidence',
    q15: 'descriptive and includes project, part, version, or date when helpful',
    q16: 'organized by project',
    q17: 'problem, constraints, design process, testing, revisions, and final outcome',
    q18: 'evidence from sketches, tests, calculations, or observations',
    q19: 'summarize the design story, not replace the full notebook record',
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


function scoreFusionCADLevel1_(answers) {
  const key = {
    q1: 'dimensions and features can be changed later',
    q2: 'saving in the correct project folder with a descriptive name',
    q3: 'project, part, version, or assignment context when helpful',
    q4: 'an appropriate plane or face based on the part orientation',
    q5: 'symmetry, alignment, and future edits',
    q6: 'extrude features',
    q7: 'size and location',
    q8: 'relationships such as horizontal, vertical, parallel, perpendicular, and concentric',
    q9: 'more predictable and easier to revise',
    q10: 'stop and fix the constraint or dimension issue',
    q11: 'turn a closed sketch profile into a 3D solid or cut',
    q12: 'intentionally based on the design task',
    q13: 'modify edges based on design intent',
    q14: 'understand and edit the order of features',
    q15: 'edit sketch dimensions or feature settings when possible',
    q16: 'size, distance, diameter, and clearance',
    q17: 'units, orientation, model correctness, and required file type',
    q18: '3D printing workflows',
    q19: 'kept separate from exported manufacturing files when appropriate',
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


function scoreEngineeringDrawings_(answers) {
  const key = {
    q1: 'exact part shape, size, features, and production requirements',
    q2: 'inspect, fabricate, or model the part accurately',
    q3: 'front, top, and right side',
    q4: 'width, height, and depth match correctly',
    q5: 'show the most descriptive shape when possible',
    q6: 'edges that can be seen',
    q7: 'edges or features behind visible surfaces',
    q8: 'axes of symmetry, holes, cylinders, and circular features',
    q9: 'communicate measurements',
    q10: 'size and location clearly',
    q11: 'duplicate or conflicting dimensions',
    q12: 'where they are easy to read and relate to the correct feature',
    q13: 'centerlines and dimensions',
    q14: 'part, project, student/team, date, scale, units, and revision when required',
    q15: 'how the drawing view size relates to real part size',
    q16: 'show interior features by imagining the part cut open',
    q17: 'the cut material surface',
    q18: 'enlarge small or complex areas that are hard to read at normal scale',
    q19: 'what changed and why',
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


function scoreFusionCADLevel2_(answers) {
  const key = {
    q1: 'organized, editable, reviewable, and assembly or fabrication ready',
    q2: 'how sketches, features, components, and joints are structured',
    q3: 'a piece of geometry',
    q4: 'moves, repeats, appears in a BOM, or needs its own organization',
    q5: 'clear enough that the browser communicates the design structure',
    q6: 'how components are positioned or allowed to move relative to each other',
    q7: 'locks components together',
    q8: 'allows rotation around an axis',
    q9: 'allows motion along a line',
    q10: 'symmetry, alignment, offsets, hole placement, and angled features',
    q11: 'repeat features, bodies, or components using controlled spacing and count',
    q12: 'reflect geometry across a plane or line of symmetry',
    q13: 'thickness, clearance, hole spacing, or tab width',
    q14: 'easier to update and understand',
    q15: 'views, dimensions, notes, or title block information may need updates',
    q16: 'units, scale, orientation, part selection, and correct file type',
    q17: 'kept separate from exported manufacturing files',
    q18: 'model structure, intended motion, key dimensions, fabrication plan, and revision readiness',
    q19: 'timeline errors, broken references, missing joints, wrong materials, and outdated drawings',
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


function scoreDesignReview_(answers) {
  const key = {
    q1: 'a structured checkpoint used to improve a design before more time or material is committed',
    q2: 'reasoning, evidence, risks, and next steps',
    q3: 'the intended user or mission',
    q4: 'what success looks like',
    q5: 'limits such as material, time, size, tools, cost, safety, or performance requirements',
    q6: 'constraints, criteria, data, or observed performance',
    q7: 'evidence such as sketches, CAD, prototypes, calculations, measurements, or test data',
    q8: 'tradeoff discussions when multiple options are compared',
    q9: 'make the design easier to understand quickly',
    q10: 'cause the design to fail, become unsafe, or miss a requirement',
    q11: 'improving one criterion may weaken another',
    q12: 'named clearly instead of hidden',
    q13: 'listening fully, asking clarifying questions, and recording feedback',
    q14: 'task, owner, due date, and reason it matters',
    q15: 'safety, feasibility, major risks, and project deadlines',
    q16: 'only a conversation, not a complete engineering checkpoint',
    q17: 'decisions, feedback, action items, and planned revisions',
    q18: 'traceable',
    q19: 'separating critique of the design from personal identity',
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
