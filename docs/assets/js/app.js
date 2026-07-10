const SUPABASE_URL = 'https://wrkleduxetuncjxcfjkf.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indya2xlZHV4ZXR1bmNqeGNmamtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MDI4NTEsImV4cCI6MjA5OTI3ODg1MX0.N6wAKNUQuat0kkFXcpfU0UnSIQ1kggCJA0nqJmVOYOE';
        
        // Dicionário de Tradução (I18N)
        const translations = {
            pt: {
                skipLink: "Pular para o conteúdo principal",
                heroBadge: "Disponível para novos desafios",
                heroTitle: "Gabriel Valentim<br><span class='text-muted'>Full Stack Developer</span>",
                heroDesc: "Construindo software com simplicidade, performance e propósito. Especialista em arquiteturas front-end robustas e APIs escaláveis.",
                btnProjects: "Ver Projetos",
                btnGithub: "GitHub",
                skillsTitle: "Stack Técnica",
                projectsTitle: "Projetos em Destaque",
                footerText: "Todos os direitos reservados.",
                langToggleBtn: "EN"
            },
            en: {
                skipLink: "Skip to main content",
                heroBadge: "Available for new opportunities",
                heroTitle: "Gabriel Valentim<br><span class='text-muted'>Full Stack Developer</span>",
                heroDesc: "Building software with simplicity, performance and purpose. Specialist in robust front-end architectures and scalable APIs.",
                btnProjects: "View Projects",
                btnGithub: "GitHub",
                skillsTitle: "Technical Stack",
                projectsTitle: "Featured Projects",
                footerText: "All rights reserved.",
                langToggleBtn: "PT"
            }
        };

        // Fallback Data (Caso o Supabase falhe ou não esteja configurado)
        const fallbackData = {
            skills: [
                { category_pt: "Linguagens", category_en: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SQL"] },
                { category_pt: "Frameworks & Libs", category_en: "Frameworks & Libs", items: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"] },
                { category_pt: "Ferramentas & Infra", category_en: "Tools & Infra", items: ["Git", "GitHub Actions", "Supabase", "Vercel", "Figma"] }
            ],
            projects: [
                { 
                    title: "E-Commerce API", 
                    desc_pt: "API RESTful construída com Node.js e PostgreSQL, lidando com pagamentos via Stripe.", 
                    desc_en: "RESTful API built with Node.js and PostgreSQL, handling payments via Stripe.",
                    tech: ["Node.js", "Express", "PostgreSQL", "Stripe"],
                    url: "#"
                },
                { 
                    title: "Dashboard Analítico", 
                    desc_pt: "Painel de controle em tempo real utilizando WebSockets para monitoramento financeiro.", 
                    desc_en: "Real-time dashboard using WebSockets for financial monitoring.",
                    tech: ["React", "TypeScript", "Tailwind", "Socket.io"],
                    url: "#"
                },
                { 
                    title: "ghvalentim.dev", 
                    desc_pt: "Portfólio minimalista, zero-framework, com nota 100 no Lighthouse e integração Supabase.", 
                    desc_en: "Minimalist zero-framework portfolio, Lighthouse score 100, and Supabase integration.",
                    tech: ["HTML5", "CSS3", "Vanilla JS", "Supabase"],
                    url: "https://github.com/ghvalentim"
                }
            ]
        };


        // ----------------------------------------------------
        // 2. LÓGICA DE ESTADO (TEMA E IDIOMA)
        // ----------------------------------------------------
        let currentLang = localStorage.getItem('appLang') || (navigator.language.startsWith('pt') ? 'pt' : 'en');
        let currentTheme = localStorage.getItem('appTheme');
        
        // Se não tem tema salvo, usa a preferência do sistema
        if (!currentTheme) {
            currentTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }

        const applyTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            const iconPath = theme === 'dark' 
                ? 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' // Moon
                : 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'; // Sun
            
            document.getElementById('themeIcon').innerHTML = `<path d="${iconPath}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>`;
            localStorage.setItem('appTheme', theme);
        };

        const toggleTheme = () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
        };

        const applyTranslations = (lang) => {
            const texts = translations[lang];
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (texts[key]) {
                    // Usamos innerHTML apenas onde estritamente necessário (como títulos com <br>)
                    el.innerHTML = texts[key]; 
                }
            });
            
            document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
            document.getElementById('langToggle').textContent = texts.langToggleBtn;
            localStorage.setItem('appLang', lang);

            // Re-renderiza dados dinâmicos para refletir novo idioma
            renderUI(); 
        };

        const toggleLanguage = () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            applyTranslations(currentLang);
        };


        // ----------------------------------------------------
        // 3. INTEGRAÇÃO SUPABASE E RENDERIZAÇÃO
        // ----------------------------------------------------
        
        // Cache de dados para evitar múltiplas chamadas à API
        let appData = { skills: null, projects: null };

        const fetchSupabaseData = async (table) => {
            if (SUPABASE_URL.includes('YOUR_PROJECT_ID')) {
                console.info(`[Staff Engineer Note]: Usando Fallback Data para '${table}'. Chaves Supabase não configuradas.`);
                return fallbackData[table];
            }

            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) throw new Error('Falha na API Supabase');
                const data = await response.json();
                
                // Se a tabela estiver vazia, retorna fallback para garantir visual profissional
                return data.length > 0 ? data : fallbackData[table];
            } catch (error) {
                console.error(`Erro ao buscar ${table}:`, error);
                return fallbackData[table]; // Graceful degradation
            }
        };

        const loadData = async () => {
            // Carrega ambos em paralelo para otimizar TBT
            const [skillsData, projectsData] = await Promise.all([
                fetchSupabaseData('skills'),
                fetchSupabaseData('projects')
            ]);
            
            appData.skills = skillsData;
            appData.projects = projectsData;
            renderUI();
        };

        const renderUI = () => {
            if (appData.skills) renderSkills(appData.skills);
            if (appData.projects) renderProjects(appData.projects);
        };

        const renderSkills = (skillsArray) => {
            const container = document.getElementById('skills-container');
            if (!container) return;

            container.innerHTML = skillsArray.map(group => {
                const title = currentLang === 'pt' ? (group.category_pt || group.category) : (group.category_en || group.category);
                
                // Trata strings convertendo de JSON ou Arrays puros
                let items = [];
                if (Array.isArray(group.items)) items = group.items;
                else if (typeof group.items === 'string') items = group.items.split(',').map(s => s.trim());

                return `
                    <div class="skill-group">
                        <h3>${title}</h3>
                        <div class="skill-list">
                            ${items.map(item => `<span class="skill-badge">${item}</span>`).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        };

        const renderProjects = (projectsArray) => {
            const grid = document.getElementById('projects-grid');
            if (!grid) return;

            grid.innerHTML = projectsArray.map(proj => {
                const desc = currentLang === 'pt' ? (proj.desc_pt || proj.description) : (proj.desc_en || proj.description);
                
                let techList = [];
                if (Array.isArray(proj.tech)) techList = proj.tech;
                else if (typeof proj.tech === 'string') techList = proj.tech.split(',').map(s => s.trim());

                return `
                    <a href="${proj.url}" class="card" target="_blank" rel="noopener noreferrer">
                        <h3>${proj.title}</h3>
                        <p>${desc}</p>
                        <div class="tech-stack">
                            ${techList.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </a>
                `;
            }).join('');
        };


        // ----------------------------------------------------
        // 4. INICIALIZAÇÃO (ENTRY POINT)
        // ----------------------------------------------------
        document.addEventListener('DOMContentLoaded', () => {
            // Setup Inicial
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            
            // Listeners
            document.getElementById('themeToggle').addEventListener('click', toggleTheme);
            document.getElementById('langToggle').addEventListener('click', toggleLanguage);
            
            // Aplica estado persistido
            applyTheme(currentTheme);
            applyTranslations(currentLang);
            
            // Busca dados da API / Fallback
            loadData();
        });