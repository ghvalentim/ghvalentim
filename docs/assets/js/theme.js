/**
 * theme.js - Gerencia o Dark/Light Mode
 */
export function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const docElement = document.documentElement;
  
  const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    docElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Inicialização
  setTheme(getPreferredTheme());

  // Evento de clique
  toggleBtn?.addEventListener('click', () => {
    const currentTheme = docElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}