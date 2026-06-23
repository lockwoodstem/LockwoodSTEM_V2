# LockwoodSTEM Full Site RC1

This is a fresh GitHub-ready static site assembled from the current LockwoodSTEM / Aerospace IED curriculum direction defined in the chat.

## Included
- Homepage using the established dark navy/gold LockwoodSTEM style
- Courses page with IED, POE, and Advanced Manufacturing hubs
- Complete IED Units 0–7 course hub
- Unit pages for Units 0–7
- Lesson pages for every IED lesson in Units 0–7
- Resource Library with templates, references, asset boards, and package downloads
- Certification Hub
- FabLab page
- Portfolio page
- Publishing Standard page
- Build Status page

## Notes
This package is review-ready, not final-publication-complete. Reference guides and certification exams still need final publishing layout and question-bank development.

## Deploy
Upload the contents of this folder to a GitHub Pages repository. `.nojekyll` is included.


## GitHub Lite Notes
This version replaces the many individual IED lesson files with one dynamic page:
`courses/ied/lesson.html?unit=1&lesson=1`

The course content remains reviewable, but the `courses` folder is much smaller and easier to upload through GitHub's web uploader.
Large image assets were compressed for upload-friendly previews. Full-size downloads are in the separate Resource Downloads Pack.


## RC5d Certification Login Cacheproof Build

Certification auth scripts include cache-busting query strings and auth.js contains a fallback Apps Script Web App URL.


## RC20b Backend URL Update

Certification backend URL updated to:
https://script.google.com/macros/s/AKfycbw0j9MBMdMG-QNi2IIbp1SE6htXwYgKVV65dV1gLMMTkyK6ujNBWYXtIl-1Jnjlyns/exec
