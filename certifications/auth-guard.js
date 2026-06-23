document.addEventListener("DOMContentLoaded", async () => {
  const auth = window.LockwoodCertAuth;
  if (!auth) {
    document.documentElement.classList.remove("cert-auth-checking");
    return;
  }

  const configError = auth.getConfigError();
  if (configError) {
    localStorage.setItem("lockwoodstem_cert_setup_notice", configError);
    window.location.href = "login.html?setup=1";
    return;
  }

  const result = await auth.validateSession();
  document.documentElement.classList.remove("cert-auth-checking");

  if (!result.ok) {
    auth.redirectToLogin();
    return;
  }

  auth.renderAccountBar(result.user);
});
