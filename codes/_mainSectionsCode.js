class ProyectElement {
  constructor({ name, description, features = [], links = "", skillsList = [], videoSrc, isPortfolioCard = false }) {
    this.name = name
    this.description = description
    this.features = features
    this.links = links
    this.skillsList = skillsList
    this.videoSrc = videoSrc
    this.isPortfolioCard = isPortfolioCard
  }

  #createModal() {
    $root.innerHtml += ``
  }

  getElement() {
    const featuresList = this.features.map(feature => {
      return `<li>${feature}</li>`
    }).join("")
    const skills = this.skillsList.map(skill => {
      return `<li>${skill}</li>`
    }).join("")

    const notPortfolioProyectElements = {
      expand_button: `<span class="material-symbols-outlined pC_seeMore">expand_content</span>`,
      features_section: `<div><p>Características:</p><ul class="pC_features">${featuresList}</ul></div>`,
      link_element: `<a class="pC_link" href="${this.links}">(ENLACE)</a>`,
      demo_zone: `<div class="proyectCard_demo"><video src="demos/demo1EJ.mp4" autoplay muted loop title="Demo del sitio en video"></div>`
    }

    const element = document.createElement("article")
    element.classList.add("proyectCard")
    element.classList.add("card")
    element.id = this.isPortfolioCard ? 'portfolio_proyectCard' : ''

    element.innerHTML = `
      ${!this.isPortfolioCard ? notPortfolioProyectElements.expand_button : ""}
      <div class="proyectCard_info">
        <header class="pC_header">
          <h3>${this.name}</h3>
        </header>
        <section class="pC_body">
          <p>${this.description}</p>
          ${!this.isPortfolioCard ? notPortfolioProyectElements.features_section : ""}
          ${!this.isPortfolioCard ? notPortfolioProyectElements.link_element : ""}
        </section>
        <footer class="pC_footer">
          <ul class="pC_skillsList">
            ${skills}
          </ul>
        </footer>  
      </div>
      ${!this.isPortfolioCard ? notPortfolioProyectElements.demo_zone : ""}
    `
    return element
  }
}

const Eccomerce_proyect = new ProyectElement({
  name: "Eccomerce",
  description: "",
  features: ["a", "b", "c"],
  links: "",
  skillsList: ["react", "java", "js"],
  videoSrc: ""
})

const PokeApi_proyect = new ProyectElement({
  name: "Pokedex & team creator",
  description: `!Este no es cualquier proyecto con la pokeApi!. En él tendrás un sistema de búsqueda avanzado a tráves de 
  distintos filtros para que puedas encontrar justo al pokemon que estás buscando para tu equipo ... (continuar y reescribir xd)`,
  features: ["Trabajo con múltiples APIs", "Exposición de contenido", "Aplicación de búsqueda y múltiples filtros", "Guardado de favoritos", "(seguir)"],
  links: "",
  skillsList: ["React", "html", "css", "sass", "js"],
  videoSrc: "demos/demo1EJ.mp4"
})

const Colaborative_proyect = new ProyectElement({
  name: "Página con los panas de egg",
  description: "Trabajo en equipo desarrollado con colegas del bootcamp de egg",
  features: ["Trabajo cooperativo", "Organización de proyecto", "Presentación de ideas y toma de desiciones", "dasdas"],
  links: "",
  skillsList: ["Git", "github", "html", "..."],
  videoSrc: ""
})

const proyects = [Eccomerce_proyect, PokeApi_proyect, Colaborative_proyect]
const $proyectsContainer = document.querySelector(".proyectCards_container")
proyects.forEach(proyect => {
  $proyectsContainer.appendChild(proyect.getElement())
})

const Portfolio_proyect = new ProyectElement({
  name: "Acerca de esta página",
  description: `Tomé como desafío el hacer mi portafolio usando solamente las 3 herramientas básicas para el desarrollo web.
    ¡Todo lo que ves aquí está hecho con HTML, CSS y JavaScript puro!`,
  skillsList: ["HTML", "CSS", "JavaScript"],
  isPortfolioCard: true
})
const $portfolioCard_zone = document.querySelector(".portfolioCard_zone")
$portfolioCard_zone.appendChild(Portfolio_proyect.getElement())