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
      if (!result.status || !result.status.hasAttempt) {
        box.innerHTML = `
          <p><strong>Status:</strong> Not certified yet</p>
          <p class="muted">Complete the final test with a score of 80% or higher.</p>
        `;
        continue;
      }

      const s = result.status;
      box.innerHTML = `
        <div class="cert-status-panel ${s.passed ? "passed" : "failed"}">
          <h3>${s.passed ? "Certified" : "Attempt recorded"}</h3>
          <p><strong>Best score:</strong> ${s.bestPercent}%</p>
          <p><strong>Last attempt:</strong> ${new Date(s.lastAttemptAt).toLocaleString()}</p>
          <p><strong>Attempts:</strong> ${s.attempts}</p>
          ${s.passed ? `<p><strong>Certified on:</strong> ${new Date(s.certifiedAt).toLocaleDateString()}</p>` : `<p>Review the study guide and retake the final test when ready.</p>`}
        </div>
      `;
    } catch (err) {
      box.innerHTML = `<p class="form-status error">Could not load certification status: ${auth.escapeHtml(err.message)}</p>`;
    }
  }
});
