document.addEventListener("DOMContentLoaded", async () => {
  const boxes = document.querySelectorAll("[data-cert-status]");
  if (!boxes.length) return;

  const auth = window.LockwoodCertAuth;
  const session = auth && auth.getSession ? auth.getSession() : null;
  if (!auth || !session || !session.token) return;

  for (const box of boxes) {
    const certId = box.dataset.certId;
    try {
      const result = await auth.request("getCertificationStatus", {
        token: session.token,
        certId
      });
      if (!result.status || (!result.status.hasAttempt && !result.status.handsOnComplete)) {
        box.innerHTML = `
          <p><strong>Status:</strong> Not certified yet</p>
          <p class="muted">Complete the final test with a score of 80% or higher.</p>
        `;
        continue;
      }

      const s = result.status;
      const badgeEarned = !!s.badgeEarned;
      const onlinePassed = !!s.onlinePassed || !!s.passed;
      box.innerHTML = `
        <div class="cert-status-panel ${badgeEarned ? "passed" : (onlinePassed ? "warning" : "failed")}">
          <h3>${badgeEarned ? "Badge earned" : (onlinePassed ? "Online test passed — hands-on pending" : "Attempt recorded")}</h3>
          <p><strong>Best score:</strong> ${s.bestPercent || 0}%</p>
          ${s.lastAttemptAt ? `<p><strong>Last attempt:</strong> ${new Date(s.lastAttemptAt).toLocaleString()}</p>` : ""}
          <p><strong>Attempts:</strong> ${s.attempts || 0}</p>
          <p><strong>Hands-on portion:</strong> ${s.handsOnComplete ? "Complete" : "Not complete"}</p>
          ${badgeEarned && s.certifiedAt ? `<p><strong>Badge earned on:</strong> ${new Date(s.certifiedAt).toLocaleDateString()}</p>` : `<p>Badge unlocks after both the online test and teacher-approved hands-on portion are complete.</p>`}
        </div>
      `;
    } catch (err) {
      box.innerHTML = `<p class="form-status error">Could not load certification status: ${auth.escapeHtml(err.message)}</p>`;
    }
  }
});
