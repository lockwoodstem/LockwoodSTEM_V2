(function () {
  const CERTS = [
    { certId: "engineering-safety", label: "Engineering Safety", hasOnline: true },
    { certId: "3d-printing", label: "3D Printing", hasOnline: true },
    { certId: "laser-cutting", label: "Laser Cutting", hasOnline: true },
    { certId: "cnc", label: "CNC Mill", hasOnline: true },
    { certId: "drill-press", label: "Drill Press", hasOnline: true },
    { certId: "soldering", label: "Soldering", hasOnline: true },
    { certId: "hand-cutting-tools", label: "Hand & Cutting Tools", hasOnline: true },
    { certId: "technical-sketching", label: "Technical Sketching", hasOnline: true },
    { certId: "engineering-documentation", label: "Engineering Documentation", hasOnline: true },
    { certId: "fusion-cad-level-1", label: "Fusion CAD Level 1", hasOnline: true },
    { certId: "engineering-drawings", label: "Engineering Drawings", hasOnline: true },
    { certId: "fusion-cad-level-2", label: "Fusion CAD Level 2", hasOnline: true },
    { certId: "design-review", label: "Design Review", hasOnline: true }
  ];

  let dashboardData = null;

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[ch];
    });
  }

  function currentUser() {
    const auth = window.LockwoodCertAuth;
    return auth && auth.getProfile ? auth.getProfile() : null;
  }

  function requireTeacher() {
    const user = currentUser();
    if (!user) return false;
    const isTeacher = String(user.role || "").toLowerCase() === "teacher";
    if (!isTeacher) {
      window.location.href = "teacher-login.html?role=required";
      return false;
    }
    return true;
  }

  async function setupTeacherLogin() {
    const form = document.querySelector("[data-teacher-login-form]");
    if (!form) return;

    const status = document.querySelector("[data-teacher-login-status]");
    const params = new URLSearchParams(window.location.search);
    if (params.get("role") === "required") {
      status.hidden = false;
      status.className = "form-status error";
      status.textContent = "Teacher access is required for that page.";
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const auth = window.LockwoodCertAuth;
      const data = Object.fromEntries(new FormData(form).entries());
      status.hidden = false;
      status.className = "form-status";
      status.textContent = "Checking teacher account...";

      try {
        const result = await auth.request("login", {
          identifier: data.identifier,
          password: data.password
        });

        if (!result.user || String(result.user.role || "").toLowerCase() !== "teacher") {
          auth.clearSession();
          status.className = "form-status error";
          status.textContent = "This account is not marked as a teacher account.";
          return;
        }

        auth.saveSession(result);
        window.location.href = "teacher-dashboard.html";
      } catch (err) {
        status.className = "form-status error";
        status.textContent = err.message;
      }
    });
  }

  async function loadDashboard() {
    if (!document.querySelector("[data-teacher-dashboard]")) return;
    if (!requireTeacher()) return;

    const auth = window.LockwoodCertAuth;
    const session = auth.getSession();
    const status = document.querySelector("[data-teacher-dashboard-status]");
    const target = document.querySelector("[data-teacher-dashboard]");

    status.textContent = "Loading students and certification results...";
    target.innerHTML = "";

    try {
      dashboardData = await auth.request("getTeacherDashboard", {
        token: session.token
      });
      renderDashboard();
    } catch (err) {
      status.className = "teacher-dashboard-status error";
      status.textContent = err.message;
    }
  }

  function renderDashboard() {
    const status = document.querySelector("[data-teacher-dashboard-status]");
    const target = document.querySelector("[data-teacher-dashboard]");
    const filter = (document.querySelector("[data-teacher-filter]")?.value || "").toLowerCase();
    const certFilter = document.querySelector("[data-teacher-cert-filter]")?.value || "all";

    if (!dashboardData || !target) return;
    const students = dashboardData.students || [];

    const rows = [];
    students.forEach((student) => {
      const search = [
        student.fullName, student.email, student.studentId, student.period
      ].join(" ").toLowerCase();

      if (filter && !search.includes(filter)) return;

      CERTS.forEach((cert) => {
        if (certFilter !== "all" && cert.certId !== certFilter) return;
        const certStatus = (student.statuses && student.statuses[cert.certId]) || {};
        rows.push(rowMarkup(student, cert, certStatus));
      });
    });

    status.className = "teacher-dashboard-status";
    status.textContent = `${students.length} student account(s) loaded. ${rows.length} approval row(s) shown.`;

    target.innerHTML = `
      <table class="teacher-approval-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Certification</th>
            <th>Online Test</th>
            <th>Hands-on</th>
            <th>Badge</th>
            <th>Teacher Action</th>
          </tr>
        </thead>
        <tbody>${rows.join("") || `<tr><td colspan="6">No matching students.</td></tr>`}</tbody>
      </table>
    `;
    bindApprovalButtons();
  }

  function rowMarkup(student, cert, status) {
    const onlinePassed = !!status.onlinePassed;
    const handsOnComplete = !!status.handsOnComplete;
    const badgeEarned = !!status.badgeEarned;
    const hasOnline = cert.hasOnline;

    const onlineLabel = hasOnline
      ? (onlinePassed ? `Passed${status.bestPercent ? " • " + status.bestPercent + "%" : ""}` : "Not passed yet")
      : "Online test not built yet";

    const handsOnLabel = handsOnComplete
      ? `Complete${status.handsOnAt ? " • " + new Date(status.handsOnAt).toLocaleDateString() : ""}`
      : "Not complete";

    const actionDisabled = hasOnline && !onlinePassed ? "disabled" : "";
    const nextState = handsOnComplete ? "false" : "true";
    const actionText = handsOnComplete ? "Remove Hands-on" : "Mark Complete";

    return `
      <tr data-student-row
          data-search="${escapeHtml([student.fullName, student.email, student.studentId, student.period].join(" ").toLowerCase())}">
        <td>
          <strong>${escapeHtml(student.fullName || "Student")}</strong><br>
          <span class="muted">${escapeHtml(student.email || "")}</span><br>
          <span class="muted">${escapeHtml(student.studentId || "")} ${student.period ? "• " + escapeHtml(student.period) : ""}</span>
        </td>
        <td><strong>${escapeHtml(cert.label)}</strong></td>
        <td><span class="approval-pill ${onlinePassed ? "passed" : "locked"}">${escapeHtml(onlineLabel)}</span></td>
        <td><span class="approval-pill ${handsOnComplete ? "passed" : "locked"}">${escapeHtml(handsOnLabel)}</span></td>
        <td><span class="approval-pill ${badgeEarned ? "earned" : "locked"}">${badgeEarned ? "Earned" : "Locked"}</span></td>
        <td>
          <button class="btn small ${handsOnComplete ? "secondary" : "dark"}"
                  type="button"
                  data-mark-handson
                  data-user-id="${escapeHtml(student.userId)}"
                  data-cert-id="${escapeHtml(cert.certId)}"
                  data-completed="${nextState}"
                  ${actionDisabled}>
            ${escapeHtml(actionText)}
          </button>
          ${actionDisabled ? `<p class="teacher-note">Online test must be passed first.</p>` : ""}
        </td>
      </tr>
    `;
  }

  function bindApprovalButtons() {
    document.querySelectorAll("[data-mark-handson]").forEach((button) => {
      button.addEventListener("click", async () => {
        const auth = window.LockwoodCertAuth;
        const session = auth.getSession();
        const status = document.querySelector("[data-teacher-dashboard-status]");
        const completed = button.dataset.completed === "true";
        button.disabled = true;
        const oldText = button.textContent;
        button.textContent = "Saving...";

        try {
          await auth.request("setHandsOnCompletion", {
            token: session.token,
            studentUserId: button.dataset.userId,
            certId: button.dataset.certId,
            completed,
            notes: ""
          });
          status.className = "teacher-dashboard-status";
          status.textContent = "Hands-on status saved. Refreshing dashboard...";
          await loadDashboard();
        } catch (err) {
          status.className = "teacher-dashboard-status error";
          status.textContent = err.message;
          button.disabled = false;
          button.textContent = oldText;
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupTeacherLogin();

    if (document.querySelector("[data-teacher-dashboard]")) {
      setTimeout(loadDashboard, 300);
      document.querySelector("[data-refresh-teacher-dashboard]")?.addEventListener("click", loadDashboard);
      document.querySelector("[data-teacher-filter]")?.addEventListener("input", renderDashboard);
      document.querySelector("[data-teacher-cert-filter]")?.addEventListener("change", renderDashboard);
    }
  });
})();
