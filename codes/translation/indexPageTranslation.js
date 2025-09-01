// Primero se definen los textos en cada idioma siguiendo la misma estructura en un objeto,
//  luego se hace la selección de los elementos y se altera su texto según el objeto

// Definición del objeto de traducciones
const translation = {
  spanish: {
    navbar: ["Presentación", "Tecnologías", "Proyectos", "Estudios", "Contacto"],
    title: "Construyendo aplicaciones que den vida y <span class='important'>potencien grandes ideas</span>",
    buttons: {
      resume: "Curriculum",
      toContact: "Hablemos de lo que necesita",
      certificates: "Puede ver más sobre mis certificados aquí"
    },
    presentationSection: {
      profileCard: {
        role: "Desarrollador web Backend",
        text: "Dispuesto a dar el 101% de mis capacidades en lo que hago. Siempre atento a ese extra que pueda aportar a hacer un trabajo de muy buena calidad."
      },
      features: [
        "Cooperación", "Prolijidad", "Principios SOLID",
        "Bases de datos SQL y NoSQL",
        "POO",
        "Arquitectura de software y patrones de diseño",
        "Seguridad web", "JWT",
        "Diseño de APIs Rest y GraphQL",
        "API Gateway",
        "Tests unitarios y de integración",
        "Containerización de aplicaciones con Docker",
        "Diseño para múltiples dispositivos",
        "UX/UI"
      ],
      aboutMe: {
        title: "¡Hola!. Aquí podrás conocer más de mí.",
        formattedText: `Actualmente tengo 25 años y vivo en Argentina, más específicamente en la provincia de Santa Fe, lugar donde nací.</p>
          <br><p>Disfruto de actividades como leer, disfrutar del aire libre y salidas con amigos. Mis hobbies son el tiro con arco y la fotografía.
            Actividades a las que me gusta ponerle esfuerzo e ir mejorando con el tiempo.
          </p>
          <br><p>Mi recorrido en la programación empezó de adolescente cuando de curiosidad investigué sobre el proceso de creación de videojuegos. 
            Más tarde opté por estudiar más al respecto, y, al encontrar gusto y pasión en esto, decidí empezar a formarme profesionalmente en esta área.
          </p>
          <p>Personalmente me gusta este ámbito debido a que siempre hay espacio para ir mejorando las habilidades o conocimientos que uno ya tiene.
            Me gusta enfrentarme a los distintos retos que surgen y buscar la mejor solución posible para que algo funcione como se espera.
        </p>`
      }
    },
    skillsSection: {
      title: "Resumen de tecnologías y conocimientos técnicos",
      categories: [
        "Lenguajes de programación",
        "Frameworks y librerías",
        "Bases de datos",
        "Desarrollo de APIs",
        "Seguridad web",
        "Herramientas de marcado,estilos y plantillas",
        "Otras herramientas de desarrollo"
      ]
    },
    projectsSection: {
      title: "Proyectos"
    },
    studiesSection: {
      title: "Formación",
      // innerHTML de los div.text que hay en cada article del html en esta sección
      microservicesBootcamp: `
        <h4>Bootcamp sobre Arquitectura de microservicios con práctica en Java</h4>
        <p>Marzo - junio 2025. <a href="https://codigofacilito.com/">Código facilito</a></p>
        <p class="comment">Formación teórica y práctica acerca de arquitectura de microservicios en Java. Con expansión de contenido a aspectos relacionados 
          a ellos. Por ejemplo: manejo y creación de contenedores con Docker y docker-compose, distintos tipos de API: REST y GraphQL, seguridad en microservicios,
          testing, herramientas de monitores y observabilidad, y una aproximación teórica a Kubernetes y también a herramientas de CI/CD.
        </p>
        <p class="comment">Destaco que en este bootcamp los profesores ayudaban mucho enseñando y acompañando de cerca desde su experiencia profesional, 
          dando un seguimiento que honestamente no tuve en ninguno de mis otros lugares donde me fui formando. Aproveché al máximo las clases para aclarar
          dudas, aprender buenas prácticas, corregir otras que ya tenía incorporadas, además de todo el conocimiento teórico y práctico que brindaron.
        </p>`,
      codigoFacilitoCourses: `
        <h4>Cursos y capacitaciones</h4>
        <p>Mayo 2024. <a href="https://codigofacilito.com/" target="_blank">Código facilito</a></p>
        <p class="comment">Feria de cursos gratuitos que dió Código Facilito, oportunidad para expandir mis conocimientos en ese tiempo</p>
        <ul>
          <li>Curso de fundamentos de <strong>arquitectura de software</strong></li>
          <li>Capacitación sobre testing en Java</li>
          <li>Curso de Git</li>
          <li>Curso de Github</li>
          <li>Curso Profesional de deploy en servidores</li>
        </ul>`,
      fullStackBootcamp: `
        <h4>Bootcamp sobre desarrollo Full Stack</h4>
        <p>Marzo 2023 - junio 2024. <a href="https://egg.live/es/home" target="_blank">EggCooperation</a></p>
        <p class="comment">En este bootcamp además de aprender y formarme sobre programación, también tuve la oportunidad
          de desarrollar e ir mejorando <strong>habilidades blandas</strong> a traves del trabajo en equipo y la cooperación que en el mismo se requiere.
          Por ejemplo: el explicar y preguntar sobre aspectos técnicos; la toma de decisiones; y el presentar, escuchar y poner en 
          común ideas o posibles soluciones a los distintos retos que se nos iban presentando. 
        </p>
        <p class="comment">La modalidad de este cursado fue a traves de clases en vivo y trabajos grupales. El cuál finalizó con un
          trabajo final en un grupo de 4 integrantes en el que nos tocó desarrollar una web completa.
        </p>
        <p class="comment">Este se desarrolló usando <strong>metodologías ágiles</strong>, y si bien estuve principalmente como desarrollador backend,
          también me tocó desempeñar el rol de <strong>líder técnico</strong>. Administrando el repositorio remoto de github y manejando cuestiones de git.
        </p>
        <p class="comment"><a href="https://github.com/GrupoEgg-ProyectoFinal/WebApp_Servicios" target="_blank">Link al repositorio del proyecto final</a></p>`,
      firstStepsFront: `
        <h4>Curso "Primeros pasos del desarrollo frontEnd"</h4>
        <p>Enero - marzo 2023. Argentina programa 4.0</p>`,
      unl: `
        <h4>Tecnicatura en informática de gestión.</h4>
        <p>Febrero 2019 - diciembre 2022. Facultad de Ingenierías y Ciencias Hídricas - Universidad Nacional del litoral. Estudios incompletos</p>
        <p>En el último año que cursé (2022), la carrera iba a cambiar su plan de estudios. Es decir, algunas materias se removerían, otras se incorporarían, 
        e incluso algunas se combinarían. Para poder seguir con el plan que tenía, debía tener un mínimo de ellas rendidas y aprobadas, que eran 
        más del 50% de las totales aproximadamente. Sin embargo por tener algunas materias que no podía rendir debido a las condiciones de correlación, no he
        podido llegar a ese mínimo de materias por unas pocas, necesarias para permanecer en el plan de estudios en el que ya estaba. Por lo que tenía que empezar el 2023 con 
        el nuevo plan académico.</p>
        <p>Las materias que ya había cursado, rendido, y aprobado me permitían hacer equivalencias con las del nuevo plan. Pero aún así esas equivalencias eran 
        casi como empezar la carrera desde 0, quedándome más de la mitad por realizar cuando antes ya me quedaba muy poco, rendir algunas materias que ya había 
        cursado, luego cursar y rendir aproximadamente 4 materias y el proyecto final.</p>
        <p>En ese momento tras analizar la situación decidí continuar con mis estudios pero por otro lado. Decidí tomar 
        varios cursos, profundizar en teoría, lenguajes, y metodologías, adquirir más experiencia práctica a través de proyectos y demás.</p>`,
      english: `
        <h4>Formación en lengua extranjera: Inglés (B1)</h4>
        <p>Marzo - junio 2025. Estudios retomados y finalizados en "Escuela de Idiomas - Liceo municipal Antonio Fuentes del Arco”</p>
        <p>2013 - 2016. Formación en el Instituto de Inglés San Roque. Estudios no finalizados</p>`,
      others: `
        <h4>Extras</h4>
        <p class="comment">
          Además de lo mencionado anteriormente quisiera no dejar de lado que también profundicé y amplié mis conocimientos de forma autodidacta.
          A traves de documentaciones oficiales, foros, medios audiovisuales, y también de colegas y profesionales de los que tuve la oportunidad de 
          comunicarme y aprender de ellos.
        </p>`
    },
    contactSection: {
      title: "Formulario de contacto",
      formLabels: {
        data: ["Ingrese su nombre", "Ingrese su email"],
        questions: [
          "¿A qué sector o área de trabajo pertenece su empresa?",
          "¿Qué tipo de proyectos o colaboración están buscando desarrollar?",
          "¿Qué expectativas tienen respecto a mi participación y aporte en su equipo?"
        ],
        message: "¿Desea agregar algún detalle adicional o comentario?"
      },
      aboutQuestions: "La respuestas a esas preguntas me permitirán entender mejor sus necesidades y alinearme más a sus objetivos.",
      button: "Contactarse",
      alsoMessage: `También puede buscarme en <a href="https://www.linkedin.com/in/nahuel-gomez-gahn/" target="_blank">LinkedIn</a> o escribiéndome al e-mail nahuelg8799@gmail.com`
    }
  },

  english: {
    navbar: ["About Me", "Skills", "Projects", "Studies", "Contact me"],
    title: "Building applications <span class='important'>that enhance and bring to life big ideas</span>",
    buttons: {
      resume: "Resume",
      toContact: "Let's talk about what you need",
      certificates: "You can see more about my certificates here"
    },
    presentationSection: {
      profileCard: {
        role: "Backend Developer",
        text: "Ready to give 101% to my work. Always looking for that 1% extra to help projects achieve the best quality."
      },
      features: [
        "Cooperative", "Attention to detail", "SOLID principles",
        "Database development, SQL and NoSQL",
        "OOP",
        "Software architecture and design patterns",
        "Web security", "JWT",
        "Rest and GraphQL API development",
        "Gateway API",
        "Unit and integration tests",
        "Application containerization with Docker",
        "Multi-platform design",
        "UX/UI"
      ],
      aboutMe: {
        title: "Hello!. Here you can know more about me.",
        formattedText: `I'm 25 years old and live in Argentina at the moment, to be more specific in the province of Santa Fe, place where I was born.</p>
          <br><p>I enjoy activities like reading books, spending time outdoors and hanging out with my friends. My hobbies are archery and photography.
            Activities I like to dedicate time and continually improve.
          </p>
          <br><p>My journey in programming begun when I was a teenager and wanted to know more about the process of making video-games. 
            Later I chose to study more of this area, and after finding enjoyment and passion for it, I decided to train professionally as a developer.
          </p>
          <p>I like this activity because there is always room to improve the skills or knowledge someone already have. 
            I feel motivated when I try to find the best possible solution to the different upcoming challenges.
        </p>`
      }
    },
    skillsSection: {
      title: "Technical skills and technologies used",
      categories: [
        "Programming languages",
        "Frameworks and libraries",
        "Databases",
        "API development",
        "Web security",
        "Markup, styles and templating tools",
        "Other development tools"
      ]
    },
    projectsSection: {
      title: "Projects"
    },
    studiesSection: {
      title: "Studies",
      microservicesBootcamp: `
        <h4>Bootcamp about microservices architecture with hands-on Java practice</h4>
        <p>March - june 2025. <a href="https://codigofacilito.com/">Código facilito</a></p>
        <p class="comment">Theoretical and practical training about microservice architecture in Java. With content expanded to related knowledge to it,
          For example: building and management of containers with Docker and docker-compose, different types of API: REST and GraphQL, microservices security,
          testing, monitoring and observability tools, and a theoretical approach to Kubernetes and CI/CD tools."
        </p>
        <p class="comment"I appreciated how the instructors in this bootcamp supported us closely, sharing their professional experience and providing 
          guidance, which honestly, I had not received elsewhere. I made the most of the classes to ask questions, improve my practices, and deepen both my 
          theoretical and practical knowledge
        </p>`,
      codigoFacilitoCourses: `
        <h4>Short courses and training</h4>
        <p>May 2024. <a href="https://codigofacilito.com/" target="_blank">Código facilito</a>.</p>
        <p class="comment">Fair of free courses, chance to expand my knowledge I had at that time</p>
        <ul>
          <li>Course about basics of <strong>software architecture</strong></li>
          <li>Training about Java testing</li>
          <li>Git course</li>
          <li>GitHub course</li>
          <li>Course about deploy</li>
        </ul>`,
      fullStackBootcamp: `
        <h4>Bootcamp about fullstack web development</h4>
        <p>March 2023 - june 2024. <a href="https://egg.live/es/home" target="_blank">EggCooperation</a></p>
        <p class="comment">In this bootcamp, in addition to learning about programming technologies, I had the opportunity
          to develop and improve my <strong>soft skills</strong> by teamwork and cooperation. For example: 
          explaining and asking about technical aspects; the decision-making process; and give, listen and pool ideas
          or possible solutions to the different upcoming challenges.
        </p>
        <p class="comment">The work in this bootcamp was by online classes and group activities. It finished with a final project, in a group 
          of 4 study partners, we had to develop a full-stack web application.
        </p>
        <p class="comment">This project was using <strong>agile methodologies</strong>, and in this case I was not only
          in the backend team, but also I was designated as a <strong>tech leader</strong>. Managing the remote repository in github and git issues.
        </p>
        <p class="comment"><a href="https://github.com/GrupoEgg-ProyectoFinal/WebApp_Servicios" target="_blank">Link to the final project repository</a></p>`,
      firstStepsFront: `
        <h4>First steps in frontend development course</h4>
        <p>January - March 2023. Argentina Programa 4.0 initiative</p>`,
      unl: `
        <h4>Technician in computer sciences with a management focus</h4>
        <p>February 2019 - December 2022. Universidad Nacional del Litoral (UNL - FICH). Incomplete studies</p>
        <p>In the last year I studied (2022), the degree program was going to change its curriculum. Some subjects would be removed, others would be added, 
        and even some would be combined. In order to continue with the plan I was already in, I needed to have a minimum number of subjects taken and passed, 
        which was more than 50% of the total approximately. However, since I had some of them I couldn't take the exam due to prerequisite conditions, I didn't 
        reach that minimum number of required courses to remain in the curriculum I was in, so I had to start 2023 with the new academic plan.</p>
        <p>The subjects I had already attended, taken, and passed allowed me to validate them against the ones in the new plan. But even so, those equivalences were 
        almost like starting the course all over again. Remaining more than the 50% of the course, when I already almost finishing it, the only things left to do 
        were pass the exams of some subjects, take approximately other 4 and the final project.</p> 
        <p>At that moment, after analyzing the situation, I decided to continue with my studies but from another angle. I decided to take several small or 
        medium courses, go deeper into theory, languages, and methodologies, and gain more practical experience through projects and more.</p>`,
      english: `
        <h4>English studies (B1)</h4>
        <p>March - june 2025. Continued and finished studies in "Liceo municipal Antonio Fuentes del Arco" language school</p>
        <p>2013 - 2016. Course in english institute San Roque. Not finished studies</p>`,
      others: `
        <h4>Extras</h4>
        <p class="comment">Also, I don't want to ignore that I learned more independently and self-taught. By official documentations, forums, audiovisual media, and 
          partners and professionals who I had the chance to talk and learn from them.</p>`
    },
    contactSection: {
      title: "Contact form",
      formLabels: {
        data: ["Name", "Email"],
        questions: [
          "Which area of expertise is your company or team in?",
          "What type of project or collaboration are you looking to develop?",
          "What expectations you have about my participation in your team?",
        ],
        message: "Is there another detail or comment you would like to add?"
      },
      aboutQuestions: "The answers to this questions allow me to a better understanding of your needs and so I can align myself with your goals.",
      button: "Send",
      alsoMessage: `Also, you can contact me in <a href="https://www.linkedin.com/in/nahuel-gomez-gahn/" target="_blank">Linkedin</a> or sending an email to nahuelg8799@gmail.com`
    }
  }
}

// --------------------------------
// Seleccionando y traduciendo elementos del DOM
let selectedTranslation = null

window.addEventListener("load", () => {
  selectedTranslation = translation[selectedLanguage || defaultLanguage]
  setPageTexts()
})

changeLanguageButton.addEventListener("change", () => {
  selectedLanguage = localStorage.getItem("webLanguage") == "spanish" ? "english" : "spanish"
  localStorage.setItem("webLanguage", selectedLanguage)
  selectedTranslation = translation[selectedLanguage]
  setPageTexts()
})

// Definiendo las traducciones según elementos
const setPageTexts = () => {
  setNavbarTexts()
  setPresentationSectionTexts()
  setSkillsSectionTexts()
  setProjectSectionTexts()
  setStudiesSectionTexts()
  setContactSectionTexts()
}

//// Navbar
const setNavbarTexts = () => {
  document.querySelectorAll("div.navItem_Container").forEach((element, index) => {
    element.querySelector(".navItem").setAttribute("title", selectedTranslation.navbar[index])
    element.querySelector("span.title").innerHTML = selectedTranslation.navbar[index]
  })
}

//// Presentation section
const setPresentationSectionTexts = () => {
  const presentationSection = document.getElementById("presentation_section")
  presentationSection.querySelector("h1").innerHTML = selectedTranslation.title

  presentationSection.querySelector(".profileInfo_container h3").innerHTML = selectedTranslation.presentationSection.profileCard.role
  presentationSection.querySelector(".profileInfo_container > p").innerHTML = selectedTranslation.presentationSection.profileCard.text
  presentationSection.querySelector(".buttonZone > a > button").innerHTML = selectedTranslation.buttons.resume

  presentationSection.querySelectorAll(".features > li").forEach((element, index) => {
    element.innerHTML = selectedTranslation.presentationSection.features[index]
  })

  presentationSection.querySelector(".aboutMe h3").innerHTML = selectedTranslation.presentationSection.aboutMe.title
  presentationSection.querySelector(".aboutMe p").innerHTML = selectedTranslation.presentationSection.aboutMe.formattedText
}

//// Skills section
const setSkillsSectionTexts = () => {
  const skillsSection = document.getElementById("skills_section")
  skillsSection.querySelector("& > h2").innerHTML = selectedTranslation.skillsSection.title
  skillsSection.querySelectorAll(".card.skillCard > h3").forEach((element, index) => {
    element.innerHTML = selectedTranslation.skillsSection.categories[index]
  })
}

//// Project section
const setProjectSectionTexts = () => {
  const projectSection = document.getElementById("projects_section")
  projectSection.querySelector("& > h2").innerHTML = selectedTranslation.projectsSection.title
  projectSection.querySelector("a > button.outstanding > text").innerHTML = selectedTranslation.buttons.toContact
}

//// Studies section
const setStudiesSectionTexts = () => {
  const studiesSection = document.getElementById("expAndFormation_section")
  studiesSection.querySelector("& > h2").innerHTML = selectedTranslation.studiesSection.title
  studiesSection.querySelector(".microservices > div.text").innerHTML = selectedTranslation.studiesSection.microservicesBootcamp
  studiesSection.querySelector(".courses > div.text").innerHTML = selectedTranslation.studiesSection.codigoFacilitoCourses
  studiesSection.querySelector(".bootcamp > div.text").innerHTML = selectedTranslation.studiesSection.fullStackBootcamp
  studiesSection.querySelector(".firstSteps > div.text").innerHTML = selectedTranslation.studiesSection.firstStepsFront
  studiesSection.querySelector(".unl > div.text").innerHTML = selectedTranslation.studiesSection.unl
  studiesSection.querySelector(".english > div.text").innerHTML = selectedTranslation.studiesSection.english
  studiesSection.querySelector(".others > div.text").innerHTML = selectedTranslation.studiesSection.others

  studiesSection.querySelector("& > a > button").innerHTML = selectedTranslation.buttons.certificates
}

//// Contact section
const setContactSectionTexts = () => {
  const contactSection = document.getElementById("contact_section")
  contactSection.querySelector("& > h2").innerHTML = selectedTranslation.contactSection.title

  contactSection.querySelectorAll(".subForm:nth-child(1) > label").forEach((element, index) => {
    element.querySelector("text").innerHTML = selectedTranslation.contactSection.formLabels.data[index]
  })
  contactSection.querySelectorAll(".subForm:nth-child(2) > label").forEach((element, index) => {
    element.querySelector("text").innerHTML = selectedTranslation.contactSection.formLabels.questions[index]
  })
  contactSection.querySelector("#contact_form > p").innerHTML = selectedTranslation.contactSection.aboutQuestions
  contactSection.querySelector(".subForm:nth-child(3) > label text").innerHTML = selectedTranslation.contactSection.formLabels.message

  contactSection.querySelector("button.outstanding").innerHTML = selectedTranslation.contactSection.button
  contactSection.querySelector("& > div > h4").innerHTML = selectedTranslation.contactSection.alsoMessage
}
