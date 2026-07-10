import { loadLanguage } from './i18n.js';
import { initTheme } from './theme.js';
import { fetchGitHubProjects } from './github.js';
import { loadProjects } from './projects.js';
import { loadSkills } from './skills.js';
import { initMeta } from './utils/config-loader.js';

// Inicialização centralizada
document.addEventListener('DOMContentLoaded', () => {
  const preferredLanguage = localStorage.getItem('lang') || navigator.language.split('-')[0] || 'en';
  loadLanguage(preferredLanguage);
  fetchGitHubProjects();
  loadSkills();
  loadProjects();
  initTheme();
  initMeta();
  
});