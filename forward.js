// Forwards an OAuth sign-in result (code / error + state) to Clipping Studio on this PC.
// The studio puts its own port in the state: "cs<port>-<random>". The studio checks the whole state (one-time,
// 15 minutes), so only a sign-in the studio itself started is accepted. Nothing is stored or sent anywhere else.
(function () {
  "use strict";
  var q = new URLSearchParams(window.location.search);
  var state = q.get("state") || "";
  var m = /^cs(\d{4,5})-[A-Za-z0-9_-]{16,128}$/.exec(state);
  var msg = document.getElementById("msg");
  var port = m ? parseInt(m[1], 10) : 0;
  if (!m || port < 1024 || port > 65535) {
    msg.textContent = "This page only works for a sign-in started from Clipping Studio. You can close this tab.";
    return;
  }
  var allowed = ["code", "state", "error", "error_reason", "error_description", "scopes"];
  var out = new URLSearchParams();
  allowed.forEach(function (k) { var v = q.get(k); if (v !== null) out.set(k, k === "code" ? v.replace(/#_$/, "") : v); });
  var target = "http://127.0.0.1:" + port + "/api/social/oauth/callback?" + out.toString();
  var go = document.getElementById("go");
  var addr = document.getElementById("addr");
  go.href = target;
  addr.value = target;
  // If the browser blocks the jump to this PC, show the link + the address to paste.
  window.setTimeout(function () {
    msg.textContent = "If nothing happened, press the button below.";
    go.hidden = false;
    document.getElementById("manual").hidden = false;
    addr.hidden = false;
  }, 2500);
  window.location.replace(target);
})();
