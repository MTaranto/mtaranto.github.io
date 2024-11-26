
// Carregar dados do JSON
const loadData = async () => {
  try {
    const response = await fetch('./src/data/portfolio-data.json');
    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
};

// Função para popular tecnologias
const populateTechnologies = (technologies) => {
  const technologiesList = document.querySelector('.technologies__list');
  technologiesList.innerHTML = technologies.map(tech => `
    <li class="technologies__item">
      <img class="technologies__logo" src="${tech.logo}" alt="Logo ${tech.name}">
    </li>
  `).join('');
};

// Função para popular projetos
const populateProjects = (projects) => {
  const projectsContainer = document.querySelector('.projects__container');
  projectsContainer.innerHTML = projects.map((project, index) => `
    <div class="projects__card ${index % 2 === 1 ? 'card--reverse' : ''}">
      <img class="card__cover" src="${project.cover}" alt="Capa ${project.title}">
      <div class="card__body">
        <h3 class="card__title">${project.title}</h3>
        <p class="card__description">${project.description}</p>
        <ul class="card__list">
          ${project.features.map(feature => `<li class="card__item">${feature}</li>`).join('')}
        </ul>
        <div class="card__buttons">
          <a href="${project.livePreview}" target="_blank">
            <button class="btn btn--primary">
              <span>Prévia</span>
              <i class="bi bi-arrow-up-right"></i>
            </button>
          </a>
          <a href="${project.repository}" target="_blank">
            <button class="btn btn--secondary">
              <span>Repositório</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  `).join('');
};

// Função para popular seção "Sobre"
const populateAboutSection = (personalInfo) => {
  const aboutDescription = document.querySelector('.about__description');
  aboutDescription.innerHTML = `
    <h2>Sobre mim</h2>
    <p>${personalInfo.about}</p>
    <div class="about__icons">
      <i class="bi bi-translate"></i>
      <span>${personalInfo.languages.map(lang => `${lang.name}: ${lang.level}`).join(' | ')}</span>
    </div>
    <div class="description__buttons">
      <a href="https://www.linkedin.com/in/mtaranto/" target="_blank">
        <button class="btn btn--primary">
          <span>Conecte-se Comigo</span>
          <i class="bi bi-arrow-up-right"></i>
        </button>
      </a>
      <a href="./src/data/cv.pdf" target="_blank">
        <button class="btn btn--secondary">
          <span>Currículo</span>
        </button>
      </a>
    </div>
  `;
};

// Função para popular cursos (accordion)
const populateCourses = (courses) => {
  const accordion = document.getElementById('accordion');
  accordion.innerHTML = courses.map((course, index) => `
    <div class="accordion__item ${index === 0 ? 'active' : ''}">
      <button class="accordion__header ${index === 0 ? 'start' : ''} ${index === courses.length - 1 ? 'end' : ''}">
        <span>${course.title}</span>
        <i class="bi bi-caret-down-fill"></i>
      </button>
      <div class="accordion__body ${index === courses.length - 1 ? 'end' : ''}">
        <p>${course.provider}. ${course.date}. ${course.duration}.</p>
        <p class="card__item">${course.description}</p>
        <p class="accordion--diploma">
          <a href="${course.link}" target="_blank">
            Certificado
          </a>
        </p>
      </div>
    </div>
  `).join('');
};

// Função principal para inicializar o site
const initializeSite = async () => {
  const data = await loadData();

  // Popular seções
  populateTechnologies(data.technologies);
  populateProjects(data.projects);
  populateAboutSection(data.personalInfo);
  populateCourses(data.courses);

  // Manter funções de tema e navegação existentes
  const toggleTheme = document.getElementById('toggleTheme')
  const rootHtml = document.documentElement
  // Carrega o tema salvo ou define o padrão como dark
  rootHtml.setAttribute('data-theme', localStorage.getItem('theme') || 'dark')
  toggleTheme.addEventListener("click", () => {
    const newTheme = rootHtml.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    rootHtml.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    toggleTheme.classList.toggle("bi-sun")
    toggleTheme.classList.toggle("bi-moon-stars")
  })

  const accordionHeaders = document.querySelectorAll('.accordion__header')
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement
      accordionItem.classList.contains('active')
      ? accordionItem.classList.remove('active')
      : (accordionHeaders.forEach(h => h.parentElement.classList.remove('active')),
        accordionItem.classList.add('active'))
    })
  })

  const menuLinks = document.querySelectorAll('.menu__link')
  menuLinks.forEach(item => {
    item.addEventListener('click', () => {
      menuLinks.forEach(i => i.classList.remove('active'))
      item.classList.add('active')
    })
  })
};

// Iniciar o site quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeSite);