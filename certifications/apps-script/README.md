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
