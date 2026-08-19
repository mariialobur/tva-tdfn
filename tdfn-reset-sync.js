if (typeof window !== 'undefined') {
  window.addEventListener('tdfn-reset-all', () => {
    setTimeout(() => window.location.reload(), 0);
  });
}
