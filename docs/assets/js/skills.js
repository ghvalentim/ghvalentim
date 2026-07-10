export async function loadSkills() {
  const section = document.querySelector('#skills-section');
  
  try {
    const response = await fetch('config/skills.json');
    const skills = await response.json();
    
    section.innerHTML = Object.entries(skills).map(([category, items]) => `
      <div class="skill-category">
        <h4>${category}</h4>
        <ul class="skill-list">
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    
  } catch (err) {
    console.error('Falha ao carregar skills:', err);
  }
}