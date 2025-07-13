// _________________________
// Project Section
//
class ProjectElement {
  constructor({ translationObject = {
      spanish: {name: "", description: "", features: [], videoTitle: ""},
      english: {name: "", description: "", features: [], videoTitle: ""},
    }, repositoryLink, link, skillsList = [], videoSrc, isPortfolioCard = false, expand_link=""
  }) {
    this.translationObject = translationObject
    this.link = link
    this.repositoryLink = repositoryLink
    this.skillsList = skillsList
    this.videoSrc = videoSrc
    this.isPortfolioCard = isPortfolioCard
    this.expand_link = expand_link
  }

  generateInnerHTML() {
    const lang = localStorage.getItem("webLanguage") || "spanish"
    let selectedTranslationObj = this.translationObject[lang]

    const featuresList = selectedTranslationObj.features.map(feature => {
      return `<li>${feature}</li>`
    }).join("")
    const skills = this.skillsList.map(skill => {
      return `<li class="skillLogo ${skill.toLowerCase()}">${skill}</li>`
    }).join("")

    const mainProjectsElements = {
      expand_button: `<a class="seeMore" href="${this.expand_link}"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
      <path fill="#ffffffff" fill-rule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z"></path>
      </g></svg></a>`,
      features_section: `<div><p>${lang == "spanish" ? "Características" : "Features"}:</p><ul class="pC_features">${featuresList}</ul></div>`,
      link_element: this.link ? `<a class="pC_link" href="${this.link}" target="_blank">${lang == "spanish" ? "Enlace al sitio" : "Link to website"}</a>` : "",
      repoLink_element: this.repositoryLink ? `<a class="pC_link" href="${this.repositoryLink}">${lang == "spanish" ? "Enlace al repositorio" : "Link to repository"}</a>` : "",
      demo_zone: this.videoSrc && `<div class="projectCard_demo"><video src=${this.videoSrc} autoplay preload="metadata" muted loop title="${selectedTranslationObj.videoTitle}"></div>`
    }

    const newDescription = () => {
      if (selectedTranslationObj.description instanceof Array) {
        let paragraphElements = ""
        selectedTranslationObj.description.forEach(paragraph => paragraphElements += `<p>${paragraph}</p>`)
  
        return paragraphElements
      } else return selectedTranslationObj.description
    }

    return `
      ${!this.isPortfolioCard ? mainProjectsElements.expand_button : ""}
      <div class="projectCard_info">
        <header class="pC_header">
          <h3>${selectedTranslationObj.name}</h3>
        </header>
        <section class="pC_body">
          ${newDescription()}
          ${!this.isPortfolioCard ? mainProjectsElements.features_section : ""}
          ${!this.isPortfolioCard ? mainProjectsElements.repoLink_element : ""}
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
  }

  createElement() {
    const element = document.createElement("article")
    element.classList.add("projectCard")
    element.classList.add("card")
    element.id = this.isPortfolioCard ? 'portfolio_projectCard' : ''

    element.innerHTML = this.generateInnerHTML()
    return element
  }
}

const HealthCenterTurnAdministrator = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Administrador de turnos para centro de salud",
      description: ["Aplicación de interfaz sencilla pensada para poder gestionar datos en un centro de salud.", 
        "Cuenta con una base de datos relacional en donde  se registran los turnos, pacientes, profesionales de salud, " +
        "áreas de servicio, e incluso consultorios. Todas estas entidades se pueden crear, modificar o eliminar a traves de una interfaz simple y accesible. ",
        "Las acciones que se pueden realizar dependen del usuario que haya iniciado sesión y los permisos que éste tenga."],
      features: ["Base de datos relacional", "Arquitectura cliente-servidor", "Desarrollo de API", "Seguridad web", "Sesiones de usuario y roles", "Búsquedas dinámicas"],
      videoTitle: "Demostración general del proyecto",
    },
    english: {
      name: "Health Center Administrator",
      description: ["This is an application with a simple interface designed to help managing data in a health center.",
        "It has a relational database to store information about turns, patients, health professionals, service areas, and even assigned rooms. " +
        "All of these entities can be created, modified or deleted through an easy-to-use interface.",
        "The available actions depends on the permissions of the logged user."
      ],
      features: ["Relational database", "Client-server architecture", "Rest API development", "Web security", "User session and roles", "Dynamic search"],
      videoTitle: "General demonstration of the project"
    }
  },
  repositoryLink: "https://github.com/GGNahuel/08-AdministracionTurnosClinica",
  skillsList: ["Java", "TypeScript", "Spring boot", "Spring Security", "React", "React Router", "CSS", "HTML"],
  videoSrc: "demos/HealthCenter/demoGeneral.webm",
  expand_link: "HealthCenterManager.html"
})

const MassagistPage = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Sitio web para masajista",
      description: ["El sitio fue diseñado para un amigo que se formó como masajista profesional.",
        "Es una landing page sencilla en cuánto a aspectos técnicos, pero que le permite dar visibilidad al servicio que ofrece y permitir el contacto con clientes.",
        "La web se adapta tanto a pantallas grandes como a pequeñas.",
        "En proceso se encuentra el armado de un panel de control, que le sirva al propietario para cambiar textos, imágenes, o agregar tarjetas de servicios en un futuro, entre otras cosas. " +
        "Esto se logrará mediante una conexión a una base de datos MongoDB."
      ],
      features: ["Componentes reutilizables", "Diseño responsivo"],
      videoTitle: "Recorrido por la web"
    },
    english: {
      name: "Website for a Massage Therapist",
      description: [
        "The website was designed for a friend who trained as a professional massage therapist.",
        "It is a simple landing page in terms of technical aspects, but it allows him to showcase the services he offers and facilitate contact with clients.",
        "The website adapts to both large and small screens.",
        "A control panel is currently in development, which will allow the owner to modify texts, images, or add service cards in the future, among other features. " +
        "This will be achieved through a connection to a MongoDB database."
      ],
      features: ["Reusable components", "Responsive design"],
      videoTitle: "Website Tour"
    }
  },
  link: "https://masajistalucio.netlify.app/",
  skillsList: ["React", "TypeScript", "Material UI"],
  videoSrc: "demos/MassagistPage/demo.webm"
})

const projects = [HealthCenterTurnAdministrator, MassagistPage]
const $projectsContainer = document.querySelector(".projectCards_container")
projects.forEach(project => {
  $projectsContainer.appendChild(project.createElement())
})

const Portfolio_project = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Acerca de esta página",
      description: `Decidí hacer mi portafolio usando solamente los 3 pilares para el desarrollo web front-end.
        ¡Todo lo que ves en esta página está hecho solamente con HTML, CSS y JavaScript!`,
      features: []
    },
    english: {
      name: "About this portfolio",
      description: "I decided to do my personal page using only the 3 core technologies for frontend development as a challenge." +
        " Everything you see here is done with HTML, CSS and JavaScript!",
      features: []
    }
  },
  skillsList: ["HTML", "CSS", "JavaScript"],
  isPortfolioCard: true
})
const $portfolioCard_zone = document.querySelector(".portfolioCard_zone")
$portfolioCard_zone.appendChild(Portfolio_project.createElement())

changeLanguageButton.addEventListener("change", () => {
  document.querySelectorAll(".projectCards_container > article.projectCard").forEach((element, index) => {
    element.innerHTML = projects[index].generateInnerHTML()
  })
  $portfolioCard_zone.querySelector("article.projectCard").innerHTML = Portfolio_project.generateInnerHTML()
})

// _________________
// Contact Section
//
const $contactForm = document.getElementById("contact_form")
const setLoading = (value = false) => {
  $contactForm.querySelector("& > svg").style.display = value ? "inline-block" : "none"
}
$contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  setLoading(true)

  const dataToApi = {
    name: $contactForm.name.value,
    email: $contactForm.email.value,
    _subject: "Nuevo contacto desde portafolio",
    _template: "table",
    message: 
      `${$contactForm.prs_about.value != "" ? "Se dedica a: " + $contactForm.prs_about.value : ""}.` +
      `${$contactForm.prs_service.value != "" ? "\nRequiere: " + $contactForm.prs_service.value : ""}.` +
      `${$contactForm.prs_expected.value != "" ? "\nEspera que: " + $contactForm.prs_service.value : ""}.` +
      "\n" + $contactForm.message.value
  }
  console.log(dataToApi)

  fetch("https://formsubmit.co/ajax/673c0ae6dba1f926ce72b1c3aa010c4a", { 
    method: "POST", 
    headers: { "Content-Type": "application/json", "Accept": "application/json" }, 
    body: JSON.stringify(dataToApi) 
  }) 
  .then(response => response.json()) 
  .then(data => { 
    setLoading(false)
    if (data.success === "true") { 
    alert("Se ha enviado un mail con los campos del formulario. ¡Muchas gracias por contactarse! 😄")
    } else { 
      alert("Hubo un problema al enviar el formulario.")
    } 
  }) 
  .catch(error => { 
    alert("Error: " + error.message)
  })
})