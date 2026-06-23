# LockwoodSTEM Certification Account Backend

This folder contains the Google Apps Script backend for the Certification login/account system.

## Setup

1. Create a new Google Sheet named `LockwoodSTEM Certification Accounts`.
2. Open Extensions → Apps Script.
3. Paste the contents of `Code.gs`.
4. In Apps Script, open Project Settings → Script Properties.
5. Add a property:
   - `AUTH_SECRET`
   - Use a long random value.
6. Run `setup` once and approve permissions.
7. Deploy → New deployment → Web app.
8. Set:
   - Execute as: Me
   - Who has access: Anyone
9. Copy the Web App `/exec` URL.
10. Paste that URL into:

```js
certifications/auth-config.js
```

## Notes

- Students create accounts on `certifications/register.html`.
- Students log in on `certifications/login.html`.
- The certification hub and all certification pages redirect to login when no valid session exists.
- Passwords are stored as salted SHA-256 hashes in the Google Sheet, not as plain text.
- This is appropriate for a classroom certification portal, not for high-security applications.


## RC6 Engineering Safety Certification

This backend now also creates a `Certifications` sheet. The Engineering Safety final test submits student answers to Apps Script, where the answer key is scored. Passing score is 80%.

Supported certification actions:
- `submitCertification`
- `getCertificationStatus`

After replacing `Code.gs`, run `setup` again so the `Certifications` tab is created.


## RC7 Microcredential Badges

The backend now supports `getAllCertificationStatuses`, which lets the site show earned and locked badge states in the signed-in account bar and account page.


## RC8 Teacher Hands-on Approval

This backend now creates a `HandsOn` sheet and supports teacher-only hands-on approvals.

New public setup function:
- `promoteTeacherAccount`

Teacher setup:
1. Create your normal certification account on the website.
2. In Apps Script Project Settings, set Script Property `TEACHER_EMAIL` to your teacher account email. If omitted, the default is `jdlockwo@gmail.com`.
3. Run `promoteTeacherAccount`.
4. Deploy a new Web App version.
5. Open `certifications/teacher-login.html`.

Badge rule:
- A badge is earned only when the online test is passed and the hands-on portion is marked complete by a teacher.


## RC9 3D Printing Certification

The backend now supports scoring and status tracking for the `3d-printing` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `3d-printing` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC10 Laser Cutter Certification

The backend now supports scoring and status tracking for the `laser-cutting` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `laser-cutting` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC11 Drill Press Certification

The backend now supports scoring and status tracking for the `drill-press` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `drill-press` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC12 Hand & Cutting Tools Certification

The backend now supports scoring and status tracking for the `hand-cutting-tools` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `hand-cutting-tools` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC13 Soldering Certification

The backend now supports scoring and status tracking for the `soldering` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `soldering` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC14 CNC Mill Certification

The backend now supports scoring and status tracking for the `cnc` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `cnc` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC15 Technical Sketching Certification

The backend now supports scoring and status tracking for the `technical-sketching` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `technical-sketching` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC16 Engineering Documentation Certification

The backend now supports scoring and status tracking for the `engineering-documentation` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `engineering-documentation` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC17 Fusion CAD Level 1 Certification

The backend now supports scoring and status tracking for the `fusion-cad-level-1` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `fusion-cad-level-1` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC18 Engineering Drawings Certification

The backend now supports scoring and status tracking for the `engineering-drawings` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `engineering-drawings` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC19 Fusion CAD Level 2 Certification

The backend now supports scoring and status tracking for the `fusion-cad-level-2` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `fusion-cad-level-2` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.


## RC20 Design Review Certification

The backend now supports scoring and status tracking for the `design-review` certification.

Badge rule:
- Online test must be passed.
- Hands-on completion must be marked by a teacher.
- Only then does the `design-review` badge appear as earned.

After replacing `Code.gs`, run `setup`, then deploy a new Web App version.
