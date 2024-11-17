class ProjectElement {
  constructor({ name, description, features = [], links = "", skillsList = [], videoSrc, videoTitle = "", isPortfolioCard = false, expand_link }) {
    this.name = name
    this.description = description
    this.features = features
    this.links = links
    this.skillsList = skillsList
    this.videoSrc = videoSrc
    this.isPortfolioCard = isPortfolioCard,
    this.expand_link = expand_link,
    this.videoTitle = videoTitle
  }

  #createModal() {
    $root.innerHtml += ``
  }

  getElement() {
    const featuresList = this.features.map(feature => {
      return `<li>${feature}</li>`
    }).join("")
    const skills = this.skillsList.map(skill => {
      return `<li class="skillLogo ${skill.toLowerCase()}">${skill}</li>`
    }).join("")

    const mainProjectsElements = {
      expand_button: `<a class="seeMore" href="HealthCenterManager.html" target="_blank"><svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" mirror-in-rtl="true"` +
      `fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>` + 
      `<g id="SVGRepo_iconCarrier"><path fill="#000000" d="M12.1.6a.944.944 0 0 0 .2 1.04l1.352 1.353L10.28 6.37a.956.956 0 0 0 1.35 1.35l3.382-3.38 1.352 1.352a.944.944 0 0 0 1.04.2.958.958 0 0 0 .596-.875V.96a.964.964 0 0 0-.96-.96h-4.057a.958.958 0 0 0-.883.6z"></path> <path fill="#000000" d="M14 11v5a2.006 2.006 0 0 1-2 2H2a2.006 2.006 0 0 1-2-2V6a2.006 2.006 0 0 1 2-2h5a1 1 0 0 1 0 2H2v10h10v-5a1 1 0 0 1 2 0z"></path> </g></svg></a>`,
      features_section: `<div><p>Características:</p><ul class="pC_features">${featuresList}</ul></div>`,
      link_element: `<a class="pC_link" href="${this.links}">(ENLACE)</a>`,
      demo_zone: this.videoSrc && `<div class="projectCard_demo"><video src=${this.videoSrc} autoplay muted loop title="${this.videoTitle}"></div>`
    }

    const element = document.createElement("article")
    element.classList.add("projectCard")
    element.classList.add("card")
    element.id = this.isPortfolioCard ? 'portfolio_projectCard' : ''

    element.innerHTML = `
      ${!this.isPortfolioCard ? mainProjectsElements.expand_button : ""}
      <div class="projectCard_info">
        <header class="pC_header">
          <h3>${this.name}</h3>
        </header>
        <section class="pC_body">
          <p>${this.description}</p>
          ${!this.isPortfolioCard ? mainProjectsElements.features_section : ""}
          ${!this.isPortfolioCard ? mainProjectsElements.link_element : ""}
        </section>
        <footer class="pC_footer">
          <ul class="pC_skillsList">
            ${skills}
          </ul>
        </footer>  
      </div>
      ${!this.isPortfolioCard ? mainProjectsElements.demo_zone : ""}
    `
    return element
  }
}

const HealthCenterTurnAdministrator = new ProjectElement({
  name: "Administrador de turnos para centro de salud",
  description: "Aplicación de interfaz sencilla pensada para poder gestionar datos en un centro de salud." + 
    "\nCuenta con una base de datos en donde los turnos se relacionan con los datos de pacientes, profesionales de salud, " +
    "áreas de servicio e incluso consultorios. Todas estas entidades se pueden crear, modificar o eliminar a traves de una interfaz simple y accesible. " +
    "Las acciones que se pueden realizar dependen del usuario que haya iniciado sesión y los permisos que éste tenga.",
  features: ["Base de datos relacional", "Desarrollo back-end y front-end", "Seguridad web", "Sesiones de usuario y roles", "Búsquedas dinámicas"],
  links: "https://github.com/GGNahuel/08-AdministracionTurnosClinica",
  skillsList: ["Java", "TypeScript", "Spring boot", "Spring boot Security", "React", "CSS", "HTML"],
  videoSrc: "demos/HealthCenter/demoGeneral.mp4",
  videoTitle: "Demostración de la vista principal"
})

const projects = [HealthCenterTurnAdministrator]
const $projectsContainer = document.querySelector(".projectCards_container")
projects.forEach(project => {
  $projectsContainer.appendChild(project.getElement())
})

const Portfolio_project = new ProjectElement({
  name: "Acerca de esta página",
  description: `Tomé como desafío el hacer mi portafolio usando solamente los 3 pilares para el desarrollo web.
    ¡Todo lo que ves en esta página está hecho solamente con HTML, CSS y JavaScript!`,
  skillsList: ["HTML", "CSS", "JavaScript"],
  isPortfolioCard: true
})
const $portfolioCard_zone = document.querySelector(".portfolioCard_zone")
$portfolioCard_zone.appendChild(Portfolio_project.getElement())
