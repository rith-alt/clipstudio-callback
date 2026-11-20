# clipstudio-callback

An HTTPS sign-in return page for Clipping Studio (a desktop app). Instagram and TikTok only accept HTTPS redirect
addresses, but the studio runs on your own PC at `http://127.0.0.1:<port>`. This page passes the sign-in result
(`code`/`error` and `state`) straight on to the studio on the same PC.

- No secrets, no cookies, no storage, no tracking, no third-party scripts (see `forward.js`).
- Only states made by the studio (`cs<port>-<random>`) are forwarded; the studio accepts each state once, for 15 minutes.
- The sign-in code alone is useless: it can only be swapped for a key with the app secret, which never leaves your PC.

Redirect address to register: `https://<github-user>.github.io/clipstudio-callback/`
