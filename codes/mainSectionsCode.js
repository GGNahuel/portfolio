// Project Section
// definiendo clase de proyectos
class ProjectElement {
  constructor({ translationObject = {
      spanish: {name: "", description: "", features: [], videoTitle: "", note: ""},
      english: {name: "", description: "", features: [], videoTitle: "", note: ""},
    }, repositoryLink, link, skillsList = [], videoSrc, gifSrc = null, isPortfolioCard = false, expand_link=""
  }) {
    this.translationObject = translationObject
    this.link = link
    this.repositoryLink = repositoryLink
    this.skillsList = skillsList
    this.videoSrc = videoSrc
    this.isPortfolioCard = isPortfolioCard
    this.expand_link = expand_link
    this.gifSrc = gifSrc
  }

  generateInnerHTML() {
    const lang = localStorage.getItem("webLanguage") || "spanish"
    let selectedTranslationObj = this.translationObject[lang]

    const featuresList = selectedTranslationObj.features.map(feature => {
      return `<li>${feature}</li>`
    }).join("")

    const skillsWithoutLogo = ["jpa", "gateway", "mock"]
    const skills = this.skillsList.map(skill => {
      const lowerSkill = skill.toLowerCase();
      const firstWordSkill = lowerSkill.split(/[.\s]/)[0];
      console.log(firstWordSkill)
      const formattedSkill = skillsWithoutLogo.includes(firstWordSkill) ? "check" : firstWordSkill;

      return `<li class="skillLogo ${formattedSkill}">${skill}</li>`;
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
      demo_zone: (this.videoSrc || this.gifSrc) ? `<div class="projectCard_demo ${this.gifSrc ? "mobile" : ""}">
        <div>
          <div class="background"></div>
          ${this.gifSrc != null ?
            `<img src=${this.gifSrc} alt="Demonstration gif">` :
            `<video src=${this.videoSrc} autoplay preload="metadata" muted loop title="${selectedTranslationObj.videoTitle}"></video>`
          }
        </div>
      </div>` : "",
      note: this.translationObject[lang].note && this.translationObject[lang].note != "" ? `<blockquote><p>${this.translationObject[lang].note}</p></blockquote>` : ""
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
            ${mainProjectsElements.note}
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
const InternshipSwaplyAr = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Trabajo como desarrollador backend en SwaplyAr - medio tiempo",
      description: [
        "Enero 2026 - Abril 2026",
        "SwaplyAr es una empresa fintech en expansión. Que ofrece una solución que permite realizar transacciones entre distintas divisas y plataformas, " +
        "ya sean monedas nacionales o crypto-monedas, de manera sencilla.",
        "En esta experiencia me encargué de mejorar y/o adaptar la estructura, el funcionamiento y la mantenibilidad de módulos clave para el servicio que ellos ofrecen, " +
        "así como de implementar desde cero nuevas funcionalidades y utilidades para su funcionamiento y desarrollo."
      ],
      features: [
        "Trabajo colaborativo en equipo multidisciplinario. Tanto con los demás integrantes del equipo backend, como en conjunto con el equipo del frontend y líderes técnicos.",
        "Presentación de ideas técnicas y participación en diálogos para la búsqueda de soluciones.",
        "Identificación proactiva de mejoras técnicas y necesidades dentro del sistema."
      ],
      videoTitle: "Demostración del sitio web de SwaplyAr"
    },
    english: {
      name: "Work as a backend developer - SwaplyAr - part-time",
      description: [
        "January 2026 - April 2026",
        "SwaplyAr is an expanding fintech company. It brings a solution that allows transactions between different currencies and platforms, " +
        "whether national currencies or cryptocurrencies, in a simple way.",
        "In this experience I was responsible for improving and/or adapting the structure, functionality, and maintainability of key modules for the service they offer, " +
        "as well as implementing new features and utilities from scratch for its operation and development."
      ],
      features: [
        "Collaborative work in a multidisciplinary team. Both with other members of the backend team, as well as together with the frontend team and technical leaders.",
        "Presentation of technical ideas and participation in discussions in the search for solutions.",
        "Proactive identification of technical improvements and needs within the system."
      ],
      videoTitle: "SwaplyAr Website Demonstration"
    }
  },
  link: "https://www.swaplyar.com/",
  videoSrc: "demos/SwaplyArPartTime/swaplydemo.webm",
  skillsList: ["TypeScript", "Node.js", "Nest.js", "TypeORM", "PostgreSQL", "Jest", "Mock", "JWT", "Swagger", "Docker"]
})

const InventoryAPI = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Sistema de gestión de inventarios",
      description: [
        "Primer lanzamiento: Agosto 2025",
        "Este sistema permite registrar usuarios para que estos puedan crear sus inventarios y llenarlos con los items que el usuario necesite.", 
        " Ellos pueden a su vez crear sub-usuarios en la misma cuenta, al cual se accede también con nombre y contraseña. Lo que les permitiría " +
        "asignar, a través de un sub-usuario admin, permisos que pueden variar para cada inventario creado."
      ],
      features: [
        "Base de datos SQL", "Arquitectura de Micro-servicios", 
        "Desarrollo de API REST y GraphQL", "Redirección a traves de una API Gateway",
        "Seguridad web", "Autenticación y autorización a traves de JWT", 
        "Sesiones de usuario y permisos", "Manejo de sub-sesiones de usuario",
        "Pruebas unitarias, de integración y EndToEnd",
        "Containerización y administración de los mismos con Docker"
      ],
      videoTitle: "Demostración en postman de algunas operaciones disponibles del sistema"
    },
    english: {
      name: "Inventory management system",
      description: [
        "First release: August 2025",
        "This system allows the users to create inventories and fill them with the items they could require.", 
        "Also, these users can register sub-users in the same account, who can access with a username and a password too. " +
        "This allows to the admin sub-user assign different permissions to each of the inventories."
      ],
      features: [
        "SQL database", "Microservices architecture",
        "REST and GraphQL APIs development", "Redirection through a Gateway API",
        "Web security", "Authentication and authorization by JWT",
        "User sessions and authorities", "Management of sub-users sessions",
        "Unit, integration, and EndToEnd testing",
        "Containerization and management of them with Docker"
      ],
      videoTitle: "Some operations are being demonstrated in postman"
    }
  },
  repositoryLink: "https://github.com/GGNahuel/InventoryApp_API-with-microservices",
  expand_link: "InventoryManagementSystem.html",
  skillsList: ["Java", "Maven", "Spring boot", "Spring security", "Gateway API", "Rest API", "GraphQL API", "JWT", "MySQL", "JPA", "Hibernate", "JUnit", "Mock", "TestContainer", "Docker", "Postman"],
  videoSrc: "demos/InventoryManager/demo.webm"
})

const HealthCenterTurnAdministrator = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Administrador de turnos para centro de salud",
      description: [
        "Primer lanzamiento: Noviembre 2024",
        "Aplicación de interfaz sencilla pensada para poder gestionar datos en un centro de salud.", 
        "Cuenta con una base de datos relacional en donde  se registran los turnos, pacientes, profesionales de salud, " +
        "áreas de servicio, e incluso consultorios. Todas estas entidades se pueden crear, modificar o eliminar a traves de una interfaz simple y accesible. ",
        "Las acciones que se pueden realizar dependen del usuario que haya iniciado sesión y los permisos que éste tenga."
      ],
      features: ["Base de datos SQL", "Arquitectura cliente-servidor", "Desarrollo de API REST", "Seguridad web", "Sesiones de usuario y roles", "Búsquedas dinámicas"],
      videoTitle: "Demostración general del proyecto",
      note: "La demo de la aplicación está desplegada en Render, lo que significa que si el sitio quedó inactivo durante un tiempo la carga inicial puede demorarse unos minutos."
    },
    english: {
      name: "Health Center Administrator",
      description: [
        "First release: November 2024",
        "This is an application with a simple interface designed to help managing data in a health center.",
        "It has a relational database to store information about turns, patients, health professionals, service areas, and even assigned rooms. " +
        "All of these entities can be created, modified or deleted through an easy-to-use interface.",
        "The available actions depends on the permissions of the logged user."
      ],
      features: ["Relational database", "Client-server architecture", "Rest API development", "Web security", "User session and roles", "Dynamic search"],
      videoTitle: "General demonstration of the project",
      note: "The app demo is deployed on Render. Which means if this site was without activity in a while the initial load could take a few minutes."
    }
  },
  link: "https://administracionturnosclinica.onrender.com",
  repositoryLink: "https://github.com/GGNahuel/08-AdministracionTurnosClinica",
  expand_link: "HealthCenterManager.html",
  skillsList: ["Java", "Maven", "Spring boot", "Spring Security", "Rest API", "MySQL", "JPA", "Hibernate", "JUnit", "Mock", "TypeScript", "React", "React Router", "CSS", "HTML", "Docker", "Render"],
  videoSrc: "demos/HealthCenter/demoGeneral.webm",
})

const MassagistPage = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Sitio web para masajista",
      description: [
        "Primer lanzamiento: Enero 2025",
        "El sitio fue diseñado para un amigo que se formó como masajista profesional.",
        "Es una landing page sencilla en cuánto a aspectos técnicos, pero que le permite dar visibilidad al servicio que ofrece y permitir el contacto con clientes.",
        "La web se adapta tanto a pantallas grandes como a pequeñas."
      ],
      features: ["Componentes reutilizables", "Diseño responsivo"],
      videoTitle: "Recorrido por la web"
    },
    english: {
      name: "Website for a Massage Therapist",
      description: [
        "First release: January 2025",
        "The website was designed for a friend who trained as a professional massage therapist.",
        "It is a simple landing page in terms of technical aspects, but it allows him to showcase the services he offers and facilitate contact with clients.",
        "The website adapts to both large and small screens."
      ],
      features: ["Reusable components", "Responsive design"],
      videoTitle: "Website Tour"
    }
  },
  link: "https://masajistalucio.netlify.app/",
  skillsList: ["React", "TypeScript", "Material UI"],
  videoSrc: "demos/MassagistPage/demo.webm"
})

const ImposterGame = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Juego online del impostor",
      description: [
        "Primer Lanzamiento: Noviembre 2025",
        "La aplicación fue desarrollada inicialmente para su uso en un curso de inglés en 2025 y luego escalada al detectar interés por parte de la docente y los alumnos.",
        "Mediante Firebase se implementa una base de datos que al recibir cambios ésta manda una señal a la página, la cual al interceptarla refleja automáticamente aquellos cambios permitiendo así " +
        "la sincronización entre los dispositivos. También se implementa el uso de autenticaciones, anónimas para los jugadores de las salas, y mediante google para la creación y guardado de datos de " +
        "partidas.",
        "El sistema permite al anfitrión configurar las palabras utilizadas, habilitando la práctica de vocabulario de forma dinámica e interactiva."
      ],
      features: ["Sincronización a tiempo real entre dispositivos", "Backend as a Service (BaaS) con Firebase", "Autenticación con Google", "Componentes reutilizables", "Diseño multiplataforma"]
    }
  },
  link: "https://whoaretheimposters.netlify.app/",
  skillsList:["Firebase", "React", "TypeScript", "Material UI"],
  gifSrc: "demos/ImposterGame/demo.gif"
})

const projects = [InternshipSwaplyAr, InventoryAPI, HealthCenterTurnAdministrator, MassagistPage, ImposterGame]

const Portfolio_project = new ProjectElement({
  translationObject: {
    spanish: {
      name: "Acerca de esta página",
      description: `A modo de desafío y para mantener simpleza decidí hacer mi portafolio usando solamente los 3 pilares para el desarrollo web front-end.
        ¡Todo lo que ves en esta página está hecho solamente con HTML, CSS y JavaScript!`,
      features: []
    },
    english: {
      name: "About this portfolio",
      description: `Because I wanted to keep it simple, and also as a challenge, I decided to do my portfolio using only the 3 core technologies for frontend development.
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