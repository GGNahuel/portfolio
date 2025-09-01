const translation = {
  spanish: {
    title: "Administrador para centro de salud",
    presentation: `
      <p>El proyecto está pensado como una aplicación que <strong>permite crear y gestionar turnos. Además de manejar datos de, pacientes, 
        profesionales de salud y areas de servicio.</strong> Herramientas necesarias para cualquier centro de salud, dispuestas de una forma práctica y sencilla.</p>
      <p>Permite acceder a la información de forma sencilla a través de <strong>búsquedas personalizadas y visualizaciones en tablas.</strong> La información se registra
        mediante <strong>formularios claros</strong>, o herramientas prácticas como un calendario en donde se muestran los turnos ya ocupados según el día y horario.</p>
      <p>La página cuenta con varias opciones de seguridad. Una de ellas, de las más útiles en el uso diario que pueda tener, es la protección de datos
        utilizando la <strong>sesión del usuario</strong>. Es decir, según la cuenta que inicia sesión son los datos que se pueden agregar, modificar, o eliminar.</p>
    `,
    projectUses: {
      title: "Características generales",
      categories: [
        {
          title: "Acerca de los usuarios...",
          items:
            `<li>Hay 3 roles para los usuarios que se registren: Administrador, General y Profesional.</li>
            <li>El Administrador puede crear, modificar o dar de baja cualquier dato que este presente en la base de datos de la aplicación.</li>
            <li>El <strong>rol "General" es el que usaría quien este a cargo de registrar los turnos y pacientes</strong>, contando también con la posibilidad de modificarlos</li>
            <li>Los usuarios con <strong>rol "Profesional"</strong> están destinados a los profesionales de salud, <strong>permitiéndoles visualizar y manejar sus turnos de forma más 
              directa.</strong> Así como sus propios datos.</li>
            <li>Cualquier usuario, o incluso sin iniciar sesión, podrá visualizar los datos que quiera. Pero modificarlos, o crear nuevos, depende del rol.</li>
            <li>Para que la navegación sea más práctica, solo aparecerán los enlaces en el menú a los que el usuario en sesión puede acceder.</li>`
        },
        {
          title: "Acerca del manejo de datos...",
          items: `
            <li>La búsqueda de cada tipo de dato cuenta con filtros y búsquedas personalizadas para cada uno.</li>
            <li><strong>El registro o modificación de datos cuenta con verificaciones</strong> que comprueban que no se sobreponga con otros, entre otras <strong>validaciones</strong>. Mostrando mensajes de error si
              algún dato en específico causaría este problema.</li>
            <li><strong>En caso de que haya errores se mostrarán en pantalla.</strong></li>
            <li>Tanto la creación como la modificación de turnos muestra un calendario en el que puedes seleccionar el horario y la fecha de forma más sencilla. 
              A su vez que muestra los turnos ya ocupados para el área seleccionada y profesional.</li>
            <li>Si quien crea un turno es un profesional, solo podrá hacerlo para las áreas en las que él se encuentre registrado. Y en cuánto a la modificación, 
              solo aquellos turnos que ya tenga asignados, y también solo para las áreas mencionadas.</li>
            <li>Cuando se da de baja un area de servicio o profesional se puede elegir qué hacer con los turnos que estén asociados. Pudiendo darlos de baja también.</li>
          `
        },
        {
          title: "Acerca de los datos...",
          items: `
            <li>Los tipo de datos principales de la página son: pacientes, profesionales, areas de servicio, consultorios, y turnos. <strong>Estos se relacionan 
              según cómo está pensada la base de datos.</strong></li>
            <li>La sección principal muestra los turnos del día para cada área, o para las áreas en que un profesional esté registrado si el usuario en sesión
              tiene el rol "Profesional".</li>
            <li>Un profesional de salud puede estar registrado en más de un área de servicio si se requiere.</li>
            <li>Los consultorios solo pueden tener un profesional asignado.</li>
            <li>Entre los datos de pacientes está el de obra social. Este dato se incluye automáticamente cuando se asigna uno en un turno.</li>
            <li>Los turnos se pueden clasificar según su estado de abono, siendo: Pagado, Debe documentación, Debe, o A Reiterar.</li>
          `
        },
        {
          title: "Acerca de las vistas...",
          items: `
            <li>Cuenta con diseños que se adaptan al tema del navegador (tema oscuro o tema claro).</li>
            <li>El diseño cambia según el tamaño de pantalla del dispositivo</li>
          `
        }
      ]
    },
    carrouselTitles: ["Vista de la página principal", "Registro de usuario", "Vista del perfil de usuario, con edición exitosa de sus datos",
      "Mensaje de error cuando no se tienen los permisos requeridos para cierta acción", "Calendario para seleccionar horario y fecha al crear turno",
      "Registro de profesional médico con mensajes de error", "Lista de pacientes, con turnos desplegados",
      "Vista de búsqueda de turnos", "Búsqueda de turnos con filtros aplicados", "Vista de los consultorios registrados y ocupados"
    ],
    techFeatures: {
      title: "Características técnicas",
      features: [
        "Base de datos relacional SQL", "Desarrollo de una API REST",
        "Arquitectura cliente-servidor. Comunicación con la API a través de solicitudes HTTP",
        "Api con protección CORS específica", "Sesión de usuario, registro y roles con diferentes permisos. Tanto para la api como para la página",
        "Encriptado de contraseñas de usuario mediante el codificador BCrypt",
        "Generación y utilización de token CSRF para proteger ante posibles ataques de seguridad a la base de datos",
        "Verificaciones y validaciones tanto en el back como en el front",
        "Excepciones personalizadas y envío de DTOs para mejorar la comunicación de errores y manejarlos en el frontend",
        "Aplicación de principios SOLID", "Componentes reutilizables",
        "Visualizaciones en tablas, registros en formularios, y búsqueda dinámica de datos",
        "Diseño responsivo", "Desarrollo de pruebas unitarias"
      ],
      skillTitle: "Tecnologías aplicadas",
    },
    linksZone: {
      linkToRepository: "Ver repositorio",
      contact: "Pongámonos en contacto"
    },
    comments: {
      title: "Comentarios del proceso",
      text: `
        <p>
          Luego de completar un curso de desarrollo web de más de un año y medio, buscaba un proyecto donde pudiera aplicar de forma integral los conocimientos adquiridos. 
          Quería una aplicación completa, con base de datos, una interfaz intuitiva y una API que conectara todos los componentes de manera segura, escalable y práctica.
        </p>
        <p>
          Con esto en mente, me propuse diseñar una herramienta que facilite la programación de citas para pacientes, optimice la asignación de profesionales y consultorios, 
          y mejore la eficiencia en la gestión de una clínica o centro de salud.
        </p>
        <p>
          Sin embargo es importante aclarar que tuve que profundizar, estudiar y poner en práctica muchos conceptos que no había visto en el cursado.
          Por lo que tuve que poner empeño en buscar información, entender y aclarar mis dudas con compañeros o a través recursos de la web. Como 
          documentaciones oficiales, libros, foros, información multimedia e incluso tomar otros cursos. Por ejemplo, aunque tenía experiencia en JavaScript y Java, 
          este fue mi primer proyecto usando TypeScript. Lo mismo con la seguridad web con el uso de Spring Security, fue todo un desafío comprender y poder aplicar las medidas
          de seguridad que requería un proyecto con estas características, fue un reto que requería mucha más profundidad de la que había visto en mi cursado.
        </p>
        <p>
          Desde el principio busqué mantener el código lo más organizado posible, limpio y fácil de leer, ya que mi idea era incluirlo en mi portafolio. Aunque planeo 
          seguir puliendo detalles y sumando mejoras, me propuse publicar una versión estable que demuestre mis habilidades para así poder darle seguimiento a otros proyectos y priorizar
          mi perfil profesional y búsqueda laboral.
        </p>
      `
    }
  },

  english: {
    title: "Health center manager",
    presentation: `
      <p>It is designed as an application that <strong>allows users to create and manage appointments, as well as handle data 
        related to patients, healthcare professionals, and service areas</strong>. Essential tools for any healthcare center, 
        presented in a practical and user-friendly way.</p>
      <p>It enables easy access to information through <strong>customized searches and table views</strong>. 
        Information is recorded via <strong>clear forms</strong>, along with practical tools such as a calendar 
        displaying scheduled appointments by day and time.</p>
      <p>The page offers various security options. One of the most useful for daily use is data protection 
        through <strong>user session management</strong>. That is, the data that can be added, modified, or deleted depends 
        on the logged-in account.</p>
    `,
    projectUses: {
      title: "Features and use cases",
      categories: [
        {
          title: "About users...",
          items: 
            `<li>There are three roles for registered users: Administrator, General, and Professional.</li>
            <li>The Administrator can create, modify, or remove any data in the application database.</li>
            <li><strong>The "General" role is intended for the responsible for scheduling appointments and registering patients</strong>, with the option to modify them as well.</li>
            <li>Users with the <strong>"Professional" role</strong> are designated for healthcare professionals, <strong>allowing them to view and manage their appointments more directly</strong>, as well as their personal data.</li>
            <li>Any user, or even without logging in, can view the available data. However, modifying or creating new data depends on the role.</li>
            <li>To streamline navigation, only the links accessible to the logged-in user are shown in the menu.</li>`
        },
        {
          title: "About data handling...",
          items: 
            `<li>Each type of data search has filters and custom searches for each category.</li>
            <li><strong>The creation or modification of data includes validations</strong> to prevent conflicts with existing entries and <strong>other checks</strong>, displaying error messages if any specific data could cause an issue.</li>
            <li><strong>If there are errors, they will be displayed on the screen.</strong></li>
            <li>Both appointment creation and modification display a calendar where you can select the date and time more easily, showing already booked appointments for the selected area and professional.</li>
            <li>If an appointment is created by a professional, they can only schedule it for the areas in which they are registered. For modification, they can only adjust appointments assigned to them, and only for the mentioned areas.</li>
            <li>When a service area or professional is removed, you can choose what to do with the associated appointments, including removing them as well.</li>`
        },
        {
          title: "About the data...",
          items: 
            `<li>The main data types are patients, professionals, service areas, consultation rooms, and appointments. <strong>These are linked according to the database structure.</strong></li>
            <li>The main section displays the day's appointments for each area, or for the areas in which a professional is registered if the logged-in user has the "Professional" role.</li>
            <li>A healthcare professional can be registered in more than one service area if needed.</li>
            <li>Consultation rooms can only have one assigned professional.</li>
            <li>Patient data includes information on health insurance, which is automatically recorded when an insurance is assigned to an appointment.</li>
            <li>Appointments can be classified based on payment status as: Paid, Documentation Pending, Owed, or To Reschedule.</li>`
        },
        {
          title: "About views and pages...",
          items: 
            `<li>It has different color themes which is assigned by the user preference in the browser (light and dark themes).</li>
            <li>The structure and design of the pages are according to the screen size.</li>`
        }
      ]
    },
    carrouselTitles: [
      "Main page view", "User registration", "User profile view, with successful edition",
      "Error message when the logged user doesn't have the permission to do an specific action",
      "Calendar to assign time and date of an appointment in an easier way.", "Health professional registration, with an error message",
      "Patients list. It can also show the selected patient appointments", "View of the appointments search",
      "Appointment search with filters", "Consultation rooms"
    ],
    techFeatures: {
      title: "Technical features",
      features: [
        "SQL relational database",
        "Build of an Rest API",
        "Client-Server architecture. The communication with the API is by HTTP requests",
        "API with specific CORS protection",
        "User sessions, registration, and roles with different permissions for both the API and the webpage",
        "Encryption of user passwords by BCrypt password encoder",
        "Generation and use of CSRF tokens to protect against potential database security threats",
        "Validations on both backend and frontend",
        "Custom exceptions and DTOs for improved error handling and communication with the frontend",
        "SOLID principles applied",
        "Reusable components",
        "Table views, form registrations, and dynamic data searches",
        "Responsive design",
        "Development of unit tests"
      ],
      skillTitle: "Used technologies"
    },
    linksZone: {
      linkToRepository: "Go to repository",
      contact: "Let's talk"
    },
    comments: {
      title: "Comments about the developing process",
      text: `
        <p>After completing a year-and-a-half web development course, I sought a project where 
          I could fully apply the knowledge gained. I wanted a comprehensive application with a 
          database, an intuitive interface, and an API that connects all components in a secure, 
          scalable, and practical way.</p>
        <p>With this in mind, I set out to design a tool that facilitates appointment 
          scheduling for patients, optimizes professional and room assignments, and enhances 
          efficiency in managing a clinic or healthcare center.</p>
        <p>It's worth noting that I had to dive deeper into many concepts not covered in the 
          course. I invested time in researching, learning, and clearing up doubts through peers 
          or web resources like official documentation, books, forums, multimedia resources, and 
          even other courses.</p>
        <p>For example, although I had experience in JavaScript and Java, this was my first project 
          using TypeScript. Likewise, web security through Spring Security was challenging, 
          implementing the necessary security measures for this project required much more depth 
          than I had encountered in the course.</p>
        <p>From the start, I aimed to keep the code organized, clean, and readable, as I plan to 
          include it in my portfolio. While I intend to continue refining it and adding 
          improvements, I wanted to publish a stable version that demonstrates my skills, allowing 
          me to shift focus to other projects and prioritize my professional profile and job search.</p>
      `
    }
  }
}

let selectedTranslation = null

window.addEventListener("load", () => {
  selectedTranslation = translation[selectedLanguage || defaultLanguage]
  setPageTexts()
})

changeLanguageButton?.addEventListener("change", () => {
  selectedLanguage = localStorage.getItem("webLanguage") == "spanish" ? "english" : "spanish"
  localStorage.setItem("webLanguage", selectedLanguage)
  selectedTranslation = translation[selectedLanguage]
  setPageTexts()
})

//// General translations
const setGeneralTexts = () => {
  document.querySelector("h1").innerHTML = selectedTranslation.title
}

//// Presentation translations
const setPresentationSectionTexts = () => {
  document.querySelector("#projectPresentation > div > div > h4").innerHTML = selectedTranslation.presentation
}

//// Uses translations
const setUsesSectionTexts = () => {
  const $projectUsesSection = document.getElementById("projectUses")
  $projectUsesSection.querySelector("h2").innerHTML = selectedTranslation.projectUses.title
  let categoriesHTML = ""
  selectedTranslation.projectUses.categories.forEach(category => {
    categoriesHTML += `
      <div class="usesList">
        <h3>${category.title}</h3>
        <ul>${category.items}</ul>
      </div>
    `
  })
  $projectUsesSection.querySelector("& > div").innerHTML = categoriesHTML
}

//// Carrousel translations
const setCarrouselTexts = () => {
  document.querySelectorAll("#carrousel .imageCarrouselContainer").forEach((element, index) => {
    element.querySelector("span").innerHTML = selectedTranslation.carrouselTitles[index]
  })
}

//// Tech features translations
const setTechFeaturesTexts = () => {
  const $techFeaturesSection = document.getElementById("projectTechFeatures")
  $techFeaturesSection.querySelector("& > h2").innerHTML = selectedTranslation.techFeatures.title
  $techFeaturesSection.querySelector("ul.card").innerHTML = selectedTranslation.techFeatures.features.map(feature => 
    `<li>${feature}</li>`
  ).join("")
  $techFeaturesSection.querySelector("article.card > h3").innerHTML = selectedTranslation.techFeatures.skillTitle
}

//// Link zone translations
const setLinkZoneTexts = () => {
  const $linkZone = document.querySelector(".linksZone")
  $linkZone.querySelector("a:nth-child(1) > button > span").innerHTML = selectedTranslation.linksZone.linkToRepository
  $linkZone.querySelector("a:nth-child(2) > button.outstanding > span").innerHTML = selectedTranslation.linksZone.contact
}

//// Comments about project translations
const setCommentsSectionTexts = () => {
  document.querySelector("#projectComments > h2").innerHTML = selectedTranslation.comments.title
  document.querySelector("#projectComments > p").innerHTML = selectedTranslation.comments.text
}

const setPageTexts = () => {
  setGeneralTexts()
  setPresentationSectionTexts(),
  setUsesSectionTexts()
  setCarrouselTexts()
  setTechFeaturesTexts()
  setLinkZoneTexts()
  setCommentsSectionTexts()
}