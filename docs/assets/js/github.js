/**
 * github.js - Gerencia a busca de repositórios
 */
export async function fetchGitHubProjects() {
  const GITHUB_USER = 'ghvalentim'; // Substitua pelo seu usuário
  const container = document.querySelector('#projects-grid');

  if (!container) return;

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json' // Garantia de estabilidade [cite: 31]
      }
    });

    if (!response.ok) throw new Error('Falha ao buscar repositórios');

    const repos = await response.json();
    renderProjects(repos, container);
  } catch (error) {
    console.error('GitHub API Error:', error);
    container.innerHTML = '<p>Erro ao carregar projetos. Visite meu GitHub.</p>';
  }
}

function renderProjects(repos, container) {
  // Limpa o container
  container.innerHTML = '';
  
  repos.forEach(repo => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || 'Sem descrição disponível.'}</p>
      <a href="${repo.html_url}" target="_blank" rel="noopener">Ver no GitHub</a>
    `;
    container.appendChild(card);
  });
}