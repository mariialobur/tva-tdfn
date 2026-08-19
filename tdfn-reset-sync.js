if (typeof window !== 'undefined') {
  const FINAL_KEY = 'tva_tdfn_final_evaluation_v4_blueprint';
  let hadFinalResult = Boolean(localStorage.getItem(FINAL_KEY));

  function patchReleaseMeta() {
    const meta = document.querySelector('.footer-meta-line span');
    if (meta) meta.textContent = 'Mise à jour : 19.08.2026 · v18.0.0 · Plan de spécialisation, QA renforcé et évaluation finale structurée 15 questions / seuil 12.';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', patchReleaseMeta, { once: true });
  else patchReleaseMeta();

  window.addEventListener('tdfn-reset-all', () => {
    setTimeout(() => window.location.reload(), 0);
  });

  setInterval(() => {
    const hasFinalResult = Boolean(localStorage.getItem(FINAL_KEY));
    if (hadFinalResult && !hasFinalResult) {
      window.location.reload();
      return;
    }
    hadFinalResult = hasFinalResult;
  }, 500);
}
