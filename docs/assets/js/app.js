import { loadLanguage } from './i18n.js';
import { initTheme } from './theme.js';
import { fetchGitHubProjects } from './github.js';

// Inicialização centralizada
document.addEventListener('DOMContentLoaded', () => {
  const preferredLanguage = localStorage.getItem('lang') || navigator.language.split('-')[0] || 'en';
  loadLanguage(preferredLanguage);
  initTheme();
  fetchGitHubProjects();
});