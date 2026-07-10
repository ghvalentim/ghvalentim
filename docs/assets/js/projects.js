/**
 * projects.js - Carrega e renderiza projetos a partir do JSON
 */
export async function loadProjects() {
  const container = document.querySelector('#projects-grid');
  
  try {
    const response = await fetch('config/projects.json');
    const projects = await response.json();
    
    container.innerHTML = projects
      .filter(p => p.featured) // Apenas destacados
      .map(project => `
        <article class="project-card">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <ul class="tech-tags">
            ${project.techStack.map(tech => `<li>${tech}</li>`).join('')}
          </ul>
          <div class="card-actions">
            <a href="${project.repoUrl}" target="_blank" rel="noopener">Código</a>
            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener">Demo</a>` : ''}
          </div>
        </article>
      `).join('');
      
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
  }
}