// Project Section
// definiendo clase de proyectos
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
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"><path fill="#ffffffff" fill-rule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z"></path></g>
      </svg></a>`,
      expandLink_element: this.expand_link ? 
        `<a class="pC_link" href="${this.expand_link}">
          ${lang == "spanish" ? "Saber más" : "See more info"}
        </a>`
      : "",
      features_section: `<div><p>${lang == "spanish" ? "Características" : "Features"}:</p><ul class="pC_features">${featuresList}</ul></div>`,
      link_element: this.link ? 
        `<a class="pC_link" href="${this.link}" target="_blank">
          ${lang == "spanish" ? "Enlace al sitio" : "Link to website"}
        </a>` 
      : "",
      repoLink_element: this.repositoryLink ? 
        `<a class="pC_link" href="${this.repositoryLink}">
          ${lang == "spanish" ? "Enlace al repositorio" : "Link to repository"}
        </a>`
      : "",
      demo_zone: this.videoSrc && `<div class="projectCard_demo">
        <div>
          <div class="background"></div>
          <video src=${this.videoSrc} autoplay preload="metadata" muted loop title="${selectedTranslationObj.videoTitle}"></video>
        </div>
      </div>`
    }

    const newDescription = () => {
      if (selectedTranslationObj.description instanceof Array) {
        let paragraphElements = ""
        selectedTranslationObj.description.forEach(paragraph => paragraphElements += `<p>${paragraph}</p>`)
  
        return paragraphElements
      } else return "<p>" + selectedTranslationObj.description + "</p>"
    }

    return `
      ${!this.isPortfolioCard && this.expand_link ? mainProjectsElements.expand_button : ""}
      <div class="projectCard_info">
        <header class="pC_header">
          <h3>${selectedTranslationObj.name}</h3>
        </header>
        <section class="pC_body">
          ${newDescription()}
          ${!this.isPortfolioCard ? 
            `${mainProjectsElements.features_section}
            <div class="linkZone">${mainProjectsElements.repoLink_element + mainProjectsElements.link_element + mainProjectsElements.expandLink_element}</div>`
          : ""}
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

// instanciando la clase según los proyectos realizados
const InventoryAPI = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Sistema de gestión de inventarios",
      description: [
        "Este sistema permite registrar usuarios para que estos puedan crear sus inventarios y llenarlos con los items que el usuario necesite.", 
        " Ellos pueden a su vez crear sub-usuarios en la misma cuenta, al cual se accede también con nombre y contraseña. Lo que les permitiría " +
        "asignar, a través de un sub-usuario admin, permisos que pueden variar para cada inventario creado en la misma cuenta."
      ],
      features: [
        "Base de datos SQL", "Arquitectura de Micro-servicios", 
        "Desarrollo de API REST y GraphQL", "Redirección a traves de una API Gateway",
        "Seguridad web", "Autenticación y autorización a traves de JWT", 
        "Sesiones de usuario y permisos", "Doble inicio de sesión",
        "Pruebas unitarias, de integración y EndToEnd",
        "Containerización y administración de los mismos con Docker"
      ],
      videoTitle: "Demostración en postman de algunas operaciones disponibles del sistema"
    },
    english: {
      name: "Inventory management system",
      description: [
        "This system allows the users to create inventories and fill them with the items they could require.", 
        "Also, these users can register sub-users in the same account, who can access with a username and a password too. " +
        "This allows to the admin sub-user assign different permissions to each of the inventories associated to the account."
      ],
      features: [
        "SQL database", "Microservices architecture",
        "REST and GraphQL APIs development", "Redirection through a Gateway API",
        "Web security", "Authentication and authorization by JWT",
        "User sessions and authorities", "Double login",
        "Unit, integration, and EndToEnd testing",
        "Containerization and management of them with Docker"
      ],
      videoTitle: "Some operations are being demonstrated in postman"
    }
  },
  repositoryLink: "https://github.com/GGNahuel/InventoryApp_API-with-microservices",
  expand_link: "InventoryManagementSystem.html",
  skillsList: ["Java", "Maven", "Spring boot", "Spring security", "Gateway API", "Rest API", "GraphQL API", "JWT", "MySQL", "Docker", "Postman"],
  videoSrc: "demos/InventoryManager/demo.webm"
})

const HealthCenterTurnAdministrator = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Administrador de turnos para centro de salud",
      description: ["Aplicación de interfaz sencilla pensada para poder gestionar datos en un centro de salud.", 
        "Cuenta con una base de datos relacional en donde  se registran los turnos, pacientes, profesionales de salud, " +
        "áreas de servicio, e incluso consultorios. Todas estas entidades se pueden crear, modificar o eliminar a traves de una interfaz simple y accesible. ",
        "Las acciones que se pueden realizar dependen del usuario que haya iniciado sesión y los permisos que éste tenga.","", 
        "Actualmente el proyecto se encuentra en actualización, por lo que la información mostrada en la página de este proyecto puede variar con la que se muestra en el repositorio."],
      features: ["Base de datos SQL", "Arquitectura cliente-servidor", "Desarrollo de API REST", "Seguridad web", "Sesiones de usuario y roles", "Búsquedas dinámicas"],
      videoTitle: "Demostración general del proyecto",
    },
    english: {
      name: "Health Center Administrator",
      description: ["This is an application with a simple interface designed to help managing data in a health center.",
        "It has a relational database to store information about turns, patients, health professionals, service areas, and even assigned rooms. " +
        "All of these entities can be created, modified or deleted through an easy-to-use interface.",
        "The available actions depends on the permissions of the logged user.", "",
        "At the moment the project is being updated. Meaning the information on this portfolio could be different from what is in the repository."
      ],
      features: ["Relational database", "Client-server architecture", "Rest API development", "Web security", "User session and roles", "Dynamic search"],
      videoTitle: "General demonstration of the project"
    }
  },
  repositoryLink: "https://github.com/GGNahuel/08-AdministracionTurnosClinica",
  skillsList: ["Java", "Maven", "Spring boot", "Spring Security", "Rest API", "MySQL", "TypeScript", "React", "React Router", "CSS", "HTML"],
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
        "Lanzamiento en enero 2025"
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
        "First upload on January 2025"
      ],
      features: ["Reusable components", "Responsive design"],
      videoTitle: "Website Tour"
    }
  },
  link: "https://masajistalucio.netlify.app/",
  skillsList: ["React", "TypeScript", "Material UI"],
  videoSrc: "demos/MassagistPage/demo.webm"
})

const projects = [InventoryAPI, HealthCenterTurnAdministrator, MassagistPage]

const Portfolio_project = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Acerca de esta página",
      description: `Debido a que es una página estática, decidí hacer mi portafolio usando solamente los 3 pilares para el desarrollo web front-end.
        ¡Todo lo que ves en esta página está hecho solamente con HTML, CSS y JavaScript!`,
      features: []
    },
    english: {
      name: "About this portfolio",
      description: `Because this is a static website, I decided to do my portfolio using only the 3 core technologies for frontend development.
        Everything you see here is done only with HTML, CSS and JavaScript!`,
      features: []
    }
  },
  skillsList: ["HTML", "CSS", "JavaScript"],
  isPortfolioCard: true
})

// agregar proyectos al html
const $projectsContainer = document.querySelector(".projectCards_container")
projects.forEach(project => {
  $projectsContainer.appendChild(project.createElement())
})

const $portfolioCard_zone = document.querySelector(".portfolioCard_zone")
$portfolioCard_zone.appendChild(Portfolio_project.createElement())

changeLanguageButton.addEventListener("change", () => {
  document.querySelectorAll(".projectCards_container > article.projectCard").forEach((element, index) => {
    element.innerHTML = projects[index].generateInnerHTML()
  })
  $portfolioCard_zone.querySelector("article.projectCard").innerHTML = Portfolio_project.generateInnerHTML()
})

// ---------------------------------
// Contact Section
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