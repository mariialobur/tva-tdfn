if (typeof window !== 'undefined') {
  const FINAL_KEY = 'tva_tdfn_final_evaluation_v4_blueprint';
  let hadFinalResult = Boolean(localStorage.getItem(FINAL_KEY));

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
