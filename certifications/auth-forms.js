document.addEventListener("DOMContentLoaded", () => {
  const auth = window.LockwoodCertAuth;
  const setupNotice = document.querySelector("[data-setup-notice]");
  const configError = auth ? auth.getConfigError() : "Account scripts did not load.";

  if (setupNotice && configError) {
    setupNotice.hidden = false;
    setupNotice.textContent = configError;
  }

  const loginForm = document.querySelector("[data-login-form]");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = document.querySelector("[data-login-status]");
      setStatus(status, "Signing in...", false);

      const data = Object.fromEntries(new FormData(loginForm).entries());
      try {
        const result = await auth.request("login", {
          identifier: data.identifier,
          password: data.password
        });
        auth.saveSession(result);
        const params = new URLSearchParams(window.location.search);
        const next = params.get("next") || "index.html";
        window.location.href = next;
      } catch (err) {
        setStatus(status, err.message, true);
      }
    });
  }

  const registerForm = document.querySelector("[data-register-form]");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = document.querySelector("[data-register-status]");
      const data = Object.fromEntries(new FormData(registerForm).entries());

      if (data.password !== data.confirmPassword) {
        setStatus(status, "Passwords do not match.", true);
        return;
      }

      setStatus(status, "Creating account...", false);
      try {
        const result = await auth.request("register", {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          studentId: data.studentId,
          period: data.period,
          password: data.password
        });
        auth.saveSession(result);
        window.location.href = "index.html";
      } catch (err) {
        setStatus(status, err.message, true);
      }
    });
  }

  const accountBox = document.querySelector("[data-account-box]");
  if (accountBox && auth) {
    const profile = auth.getProfile();
    if (!profile) {
      window.location.href = "login.html";
      return;
    }
    accountBox.innerHTML = `
      <h2>Account</h2>
      <dl class="cert-profile-list">
        <div><dt>Name</dt><dd>${auth.escapeHtml(profile.fullName || [profile.firstName, profile.lastName].filter(Boolean).join(" "))}</dd></div>
        <div><dt>Email</dt><dd>${auth.escapeHtml(profile.email || "")}</dd></div>
        <div><dt>Student ID</dt><dd>${auth.escapeHtml(profile.studentId || "")}</dd></div>
        <div><dt>Class period</dt><dd>${auth.escapeHtml(profile.period || "")}</dd></div>
        <div><dt>Role</dt><dd>${auth.escapeHtml(profile.role || "student")}</dd></div>
      </dl>
      <div class="hero-actions">
        <a class="btn" href="index.html">Back to Certifications</a>
        <button class="btn secondary" type="button" data-account-logout>Log out</button>
      </div>
      <section class="cert-account-status-card" aria-live="polite">
        <h2>Certification progress</h2>
        <div data-cert-status data-cert-id="engineering-safety">
          <p class="muted">Loading certification status...</p>
        </div>
      </section>
      <section class="cert-account-status-card">
        <h2>Microcredential badges</h2>
        <p class="muted">Earned badges appear in full color. Locked badges show certifications still to complete.</p>
        <div class="micro-badge-grid" data-microbadge-grid>
          <p class="muted">Loading badges...</p>
        </div>
      </section>
    `;
    accountBox.querySelector("[data-account-logout]").addEventListener("click", () => {
      auth.clearSession();
      window.location.href = "login.html";
    });
  }
});

function setStatus(el, message, isError) {
  if (!el) return;
  el.hidden = false;
  el.textContent = message;
  el.classList.toggle("error", !!isError);
}
