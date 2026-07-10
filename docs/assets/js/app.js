import { loadLanguage } from './i18n.js';
import { initTheme } from './theme.js';
import { fetchGitHubProjects } from './github.js';

// Inicialização centralizada
document.addEventListener('DOMContentLoaded', () => {
  // O código aqui orquestra a chamada de cada módulo
  // sem precisar de múltiplas tags script no HTML
  const preferredLanguage = localStorage.getItem('lang') || navigator.language.split('-')[0] || 'en';
  initTheme();
  loadLanguage(preferredLanguage);
  fetchGitHubProjects();
});