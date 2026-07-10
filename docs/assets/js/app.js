import { loadLanguage } from './i18n.js';
import { initTheme } from './theme.js';
import { fetchGitHubProjects } from './github.js';

document.addEventListener('DOMContentLoaded', () => {
  const preferredLang = localStorage.getItem('lang') || 
                        navigator.language.split('-')[0] || 'en';
  
  loadLanguage(preferredLang);
  initTheme();
  fetchGitHubProjects();
});