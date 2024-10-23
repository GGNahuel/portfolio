class ProyectElement {
  constructor({ name, description, features = [], links = "", skillsList = [], videoSrc, isPortfolioCard = false, expand_link }) {
    this.name = name
    this.description = description
    this.features = features
    this.links = links
    this.skillsList = skillsList
    this.videoSrc = videoSrc
    this.isPortfolioCard = isPortfolioCard,
    this.expand_link = expand_link
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

    const mainProyectsElements = {
      expand_button: `<a class="material-symbols-outlined seeMore" href="HealthCenterManager.html" >expand_content</a>`,
      features_section: `<div><p>Características:</p><ul class="pC_features">${featuresList}</ul></div>`,
      link_element: `<a class="pC_link" href="${this.links}">(ENLACE)</a>`,
      demo_zone: `<div class="proyectCard_demo"><video src="demos/demo1EJ.mp4" autoplay muted loop title="Demo del sitio en video"></div>`
    }

    const element = document.createElement("article")
    element.classList.add("proyectCard")
    element.classList.add("card")
    element.id = this.isPortfolioCard ? 'portfolio_proyectCard' : ''

    element.innerHTML = `
      ${!this.isPortfolioCard ? mainProyectsElements.expand_button : ""}
      <div class="proyectCard_info">
        <header class="pC_header">
          <h3>${this.name}</h3>
        </header>
        <section class="pC_body">
          <p>${this.description}</p>
          ${!this.isPortfolioCard ? mainProyectsElements.features_section : ""}
          ${!this.isPortfolioCard ? mainProyectsElements.link_element : ""}
        </section>
        <footer class="pC_footer">
          <ul class="pC_skillsList">
            ${skills}
          </ul>
        </footer>  
      </div>
      ${!this.isPortfolioCard ? mainProyectsElements.demo_zone : ""}
    `
    return element
  }
}

const HealthCenterTurnAdministrator = new ProyectElement({
  name: "Administrador de turnos para centro de salud",
  description: "Aplicación de interfaz sencilla pensada para poder gestionar datos en un centro de salud." + 
    "\nCuenta con una base de datos en donde los turnos se relacionan con los datos de pacientes, profesionales de salud, " +
    "áreas de servicio e incluso consultorios. Todas estas entidades se pueden crear, modificar o eliminar a traves de una interfaz simple y accesible. " +
    "Las acciones que se pueden realizar dependen del usuario que haya iniciado sesión y los permisos que éste tenga.",
  features: ["Base de datos relacional", "Desarrollo back-end y front-end", "Seguridad web", "Sesiones de usuario y roles", "Búsquedas dinámicas"],
  links: "https://github.com/GGNahuel/08-AdministracionTurnosClinica",
  skillsList: ["Java", "TypeScript", "Spring boot", "Spring boot Security", "React", "CSS", "HTML"],
  videoSrc: ""
})

const Eccomerce_proyect = new ProyectElement({
  name: "Eccomerce",
  description: "",
  features: ["a", "b", "c"],
  links: "",
  skillsList: ["react", "java", "JavaScript"],
  videoSrc: ""
})

const PokeApi_proyect = new ProyectElement({
  name: "Pokedex & team creator",
  description: `!Este no es cualquier proyecto con la pokeApi!. En él tendrás un sistema de búsqueda avanzado a tráves de 
  distintos filtros para que puedas encontrar justo al pokemon que estás buscando para tu equipo ... (continuar y reescribir xd)`,
  features: ["Trabajo con múltiples APIs", "Exposición de contenido", "Aplicación de búsqueda y múltiples filtros", "Guardado de favoritos", "(seguir)"],
  links: "",
  skillsList: ["React", "HTML", "CSS", "sass", "JavaScript"],
  videoSrc: "demos/demo1EJ.mp4"
})

const Colaborative_proyect = new ProyectElement({
  name: "Página con los panas de egg",
  description: "Trabajo en equipo desarrollado con colegas del bootcamp de egg",
  features: ["Trabajo cooperativo", "Organización de proyecto", "Presentación de ideas y toma de desiciones", "dasdas"],
  links: "",
  skillsList: ["Git", "github", "HTML", "..."],
  videoSrc: ""
})

const AppMiembrosActivos_proyect = new ProyectElement({
  name: "App de gestión",
  description: "asdasdsa",
  features: ["Gestión de cuotas de miembros", "Inventario de grupo", "Datos de miembros"],
  skillsList: ["Figma", "HTML", "React", "Bootstrap", "Java", "MySQL", "Spring"],
  videoSrc: ""
})

const proyects = [HealthCenterTurnAdministrator, Eccomerce_proyect, PokeApi_proyect, Colaborative_proyect, AppMiembrosActivos_proyect]
const $proyectsContainer = document.querySelector(".proyectCards_container")
proyects.forEach(proyect => {
  $proyectsContainer.appendChild(proyect.getElement())
})

const Portfolio_proyect = new ProyectElement({
  name: "Acerca de esta página",
  description: `Tomé como desafío el hacer mi portafolio usando solamente los 3 pilares para el desarrollo web.
    ¡Todo lo que ves en esta página está hecho solamente con HTML, CSS y JavaScript!`,
  skillsList: ["HTML", "CSS", "JavaScript"],
  isPortfolioCard: true
})
const $portfolioCard_zone = document.querySelector(".portfolioCard_zone")
$portfolioCard_zone.appendChild(Portfolio_proyect.getElement())
