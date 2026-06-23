(function () {
  const BADGES = [
    { certId: "engineering-safety", label: "Safety", icon: "✓", fullName: "Engineering Safety" },
    { certId: "technical-sketching", label: "Sketch", icon: "✎", fullName: "Technical Sketching" },
    { certId: "engineering-documentation", label: "Docs", icon: "D", fullName: "Engineering Documentation" },
    { certId: "fusion-cad-level-1", label: "CAD 1", icon: "1", fullName: "Fusion CAD Level 1" },
    { certId: "engineering-drawings", label: "Drawings", icon: "⌖", fullName: "Engineering Drawings" },
    { certId: "fusion-cad-level-2", label: "CAD 2", icon: "2", fullName: "Fusion CAD Level 2" },
    { certId: "design-review", label: "Review", icon: "R", fullName: "Design Review" },
    { certId: "3d-printing", label: "3D Print", icon: "3D", fullName: "3D Printing" },
    { certId: "laser-cutting", label: "Laser", icon: "L", fullName: "Laser Cutting" },
    { certId: "cnc", label: "CNC", icon: "C", fullName: "CNC Mill" },
    { certId: "drill-press", label: "Drill", icon: "⌀", fullName: "Drill Press" },
    { certId: "soldering", label: "Solder", icon: "S", fullName: "Soldering" },
    { certId: "hand-cutting-tools", label: "Cutting", icon: "H", fullName: "Hand & Cutting Tools" }
  ];

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[ch];
    });
  }

  async function fetchStatuses() {
    const auth = window.LockwoodCertAuth;
    const session = auth && auth.getSession ? auth.getSession() : null;

    if (!auth || !session || !session.token) {
      return {};
    }

    try {
      const result = await auth.request("getAllCertificationStatuses", {
        token: session.token
      });
      return result.statuses || {};
    } catch (err) {
      // Older backend fallback: only request the currently implemented Engineering Safety status.
      try {
        const safety = await auth.request("getCertificationStatus", {
          token: session.token,
          certId: "engineering-safety"
        });
        return { "engineering-safety": safety.status || {} };
      } catch (innerErr) {
        return {};
      }
    }
  }

  function badgeMarkup(badge, status, compact) {
    const earned = !!(status && (status.badgeEarned || (status.passed && !status.requiresHandsOn)));
    const score = status && status.bestPercent ? `${status.bestPercent}%` : "";
    const date = status && status.certifiedAt ? new Date(status.certifiedAt).toLocaleDateString() : "";
    const title = earned
      ? `${badge.fullName}: earned${score ? " • " + score : ""}${date ? " • " + date : ""}`
      : (status && status.onlinePassed ? `${badge.fullName}: online passed, hands-on pending` : `${badge.fullName}: locked`);

    return `
      <a class="micro-badge ${earned ? "earned" : "locked"} ${compact ? "compact" : ""}"
         href="${escapeHtml(badge.certId)}.html"
         title="${escapeHtml(title)}"
         aria-label="${escapeHtml(title)}">
        <span class="micro-badge-icon">${escapeHtml(badge.icon)}</span>
        <span class="micro-badge-label">${escapeHtml(badge.label)}</span>
        <span class="micro-badge-state">${earned ? "Earned" : "Locked"}</span>
      </a>
    `;
  }

  function renderTopBar(statuses) {
    const strip = document.querySelector("[data-microbadge-strip]");
    if (!strip) return;
    strip.innerHTML = BADGES.map((badge) => badgeMarkup(badge, statuses[badge.certId], true)).join("");
  }

  function renderAccountGrid(statuses) {
    const grid = document.querySelector("[data-microbadge-grid]");
    if (!grid) return;

    grid.innerHTML = BADGES.map((badge) => {
      const status = statuses[badge.certId] || {};
      const earned = !!(status.badgeEarned || (status.passed && !status.requiresHandsOn));
      return `
        <article class="micro-badge-card ${earned ? "earned" : "locked"}">
          ${badgeMarkup(badge, status, false)}
          <div class="micro-badge-details">
            <h3>${escapeHtml(badge.fullName)}</h3>
            <p>${earned ? "Earned" : "Locked"}</p>
            ${earned ? `<p><strong>Best score:</strong> ${escapeHtml(status.bestPercent || "")}%</p>` : `<p>Pass the online test and complete the teacher-approved hands-on portion to unlock this badge.</p>`}
            ${earned && status.certifiedAt ? `<p><strong>Certified:</strong> ${new Date(status.certifiedAt).toLocaleDateString()}</p>` : ""}
          </div>
        </article>
      `;
    }).join("");
  }

  async function refresh() {
    const statuses = await fetchStatuses();
    renderTopBar(statuses);
    renderAccountGrid(statuses);
  }

  window.LockwoodMicroBadges = {
    BADGES,
    refresh,
    renderTopBar,
    renderAccountGrid
  };

  document.addEventListener("DOMContentLoaded", () => {
    // Auth guard inserts the signed-in bar after validation, so wait briefly and retry.
    setTimeout(refresh, 250);
    setTimeout(refresh, 1000);
  });
})();
