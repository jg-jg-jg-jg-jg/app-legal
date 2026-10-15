# Legal / Rechtliches

Legal notice and privacy policies for the apps by Johannes Groß (Afflatus),
published with GitHub Pages.

Impressum und Datenschutzerklärungen für die Apps von Johannes Groß
(Afflatus), veröffentlicht über GitHub Pages.

- Legal notice / Impressum: https://apps.afflatus.company/impressum/
- Regex Trainer: Daily Drills – privacy policy / Datenschutzerklärung:
  https://apps.afflatus.company/regex-trainer/datenschutz/
- Regex Trainer: Daily Drills – store link (sends Android to Google Play,
  iPhone to the App Store once it is there; used by the QR code and links on
  the app's share images): https://apps.afflatus.company/regex-trainer/

The `badges/` folder holds the official Google Play and App Store badges
(English, German) for that page, unmodified, from the private brand-assets
repository.

## Adding another app

Every app gets a folder named after it (e.g. `sql-trainer/`) with two pages:

1. `<app>/index.html` - its store link: copy `regex-trainer/index.html`,
   change the title and the two lines of text, and put the app's own Google
   Play link into `goToStore({ play: ..., appStore: null })` and into the
   Google Play badge's `href`. Add the App Store link once the app is there.
   The redirect logic itself is shared in `store-link.js`.
2. `<app>/datenschutz/index.html` - its privacy policy (English first,
   German below), written against what that app really does.

The legal notice (`impressum/`) is shared by all apps; add the new app to
its "Scope" paragraphs and to `index.html`.

Served at https://apps.afflatus.company (custom domain; `CNAME` file, DNS at
Strato: CNAME `apps` → `jg-jg-jg-jg-jg.github.io`). The github.io addresses
redirect there.
