(function () {
  const fallbackWebAppUrl = "https://script.google.com/macros/s/AKfycbw0j9MBMdMG-QNi2IIbp1SE6htXwYgKVV65dV1gLMMTkyK6ujNBWYXtIl-1Jnjlyns/exec";
  const cfg = window.LOCKWOOD_CERT_AUTH || {};
  if (!cfg.WEB_APP_URL) cfg.WEB_APP_URL = fallbackWebAppUrl;
  const sessionKey = cfg.SESSION_KEY || "lockwoodstem_cert_session";
  const profileKey = cfg.PROFILE_KEY || "lockwoodstem_cert_profile";

  function getConfigError() {
    if (!cfg.WEB_APP_URL || cfg.WEB_APP_URL.includes("PASTE")) {
      return "Certification accounts are not connected yet. Add your Google Apps Script Web App URL in certifications/auth-config.js.";
    }
    return "";
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(sessionKey) || "null");
    } catch (err) {
      return null;
    }
  }

  function getProfile() {
    try {
      return JSON.parse(localStorage.getItem(profileKey) || "null");
    } catch (err) {
      return null;
    }
  }

  function saveSession(payload) {
    if (payload && payload.token) {
      localStorage.setItem(sessionKey, JSON.stringify({
        token: payload.token,
        expiresAt: payload.expiresAt || "",
        savedAt: new Date().toISOString()
      }));
    }
    if (payload && payload.user) {
      localStorage.setItem(profileKey, JSON.stringify(payload.user));
    }
  }

  function clearSession() {
    localStorage.removeItem(sessionKey);
    localStorage.removeItem(profileKey);
  }

  async function request(action, data) {
    const configError = getConfigError();
    if (configError) {
      throw new Error(configError);
    }

    const body = Object.assign({}, data || {}, { action });
    const response = await fetch(cfg.WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
      redirect: "follow"
    });

    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (err) {
      throw new Error("The account server returned an unreadable response. Check deployment permissions and the Web App URL.");
    }

    if (!json.ok) {
      throw new Error(json.error || "The account request could not be completed.");
    }
    return json;
  }

  async function validateSession() {
    const session = getSession();
    if (!session || !session.token) {
      return { ok: false, reason: "missing" };
    }

    try {
      const result = await request("validate", { token: session.token });
      if (result.user) {
        localStorage.setItem(profileKey, JSON.stringify(result.user));
      }
      return { ok: true, user: result.user || getProfile() };
    } catch (err) {
      clearSession();
      return { ok: false, reason: err.message };
    }
  }

  function redirectToLogin() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    const query = encodeURIComponent(current + window.location.search + window.location.hash);
    window.location.href = "login.html?next=" + query;
  }

  function renderAccountBar(user) {
    const main = document.querySelector("main");
    if (!main || document.querySelector(".cert-account-bar")) return;

    const displayName = user && (user.fullName || [user.firstName, user.lastName].filter(Boolean).join(" ")) || "Student";
    const role = user && user.role ? user.role : "student";
    const bar = document.createElement("section");
    bar.className = "cert-account-bar";
    bar.innerHTML = `
      <div class="container cert-account-inner">
        <div class="cert-account-identity">
          <strong>Signed in:</strong> <span>${escapeHtml(displayName)}</span>
          <span class="cert-account-role">${escapeHtml(role)}</span>
        </div>
        <div class="micro-badge-strip" data-microbadge-strip aria-label="Certification microcredential badges">
          <span class="micro-badge-loading">Loading badges...</span>
        </div>
        <div class="cert-account-actions">
          ${String(role).toLowerCase() === "teacher" ? `<a class="btn small secondary cert-teacher-dashboard-btn" href="teacher-dashboard.html">Teacher Dashboard</a>` : ""}
          <a class="btn small secondary cert-account-btn" href="account.html">Account</a>
          <button class="btn small cert-logout-btn" type="button" data-cert-logout aria-label="Log out of certification account">Log out</button>
        </div>
      </div>
    `;
    main.prepend(bar);
    if (window.LockwoodMicroBadges && window.LockwoodMicroBadges.refresh) window.LockwoodMicroBadges.refresh();
    document.querySelectorAll("[data-cert-logout]").forEach((btn) => {
      if (btn.dataset.logoutReady === "true") return;
      btn.dataset.logoutReady = "true";
      btn.addEventListener("click", async () => {
        const session = getSession();
        try {
          if (session && session.token && !getConfigError()) {
            await request("logout", { token: session.token });
          }
        } catch (err) {
          // Log out locally even if the server cannot be reached.
        }
        clearSession();
        window.location.href = "login.html";
      });
    });
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[ch];
    });
  }

  window.LockwoodCertAuth = {
    request,
    getSession,
    getProfile,
    saveSession,
    clearSession,
    validateSession,
    redirectToLogin,
    renderAccountBar,
    getConfigError,
    escapeHtml
  };
})();
