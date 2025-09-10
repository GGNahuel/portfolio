// Separar navbar de main zone
const navbar = document.querySelector(".projectsNavbar")
const mainZone = document.querySelector("main.notIndex")
mainZone.style.height = `calc(100dvh - ${navbar.scrollHeight}px)`

// ==========================================================
// Rellenar y agregar funcionalidad a los desplegables de los índices de contenidos
const indexUiComponents = document.querySelectorAll(".indexUI")
indexUiComponents.forEach(element => {
  const topPart = element.querySelector(".top")
  const stretchPart = element.querySelector(".stretch")
  const bottomPart = element.querySelector(".bottom")

  const stretchPartHeight = (element.offsetWidth - (element.offsetWidth * 0.06) - (element.offsetWidth * 0.07)) / 32

  topPart.innerHTML = `<svg class="indexUIsvg" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 60">
    <style>
      .s0 { stroke-width: 3 } 
    </style>
    <path fill-rule="evenodd" class="s0" d="m70.7 17.8l327.9 0.9"/>
    <path id="Capa 1" class="filled" d="m59 19l11.5-11.5h164.5l-7.3 5.8h70.3l-7.4 5.8z"/>
    <path id="Forma 8" class="filled" d="m415.2 16.8l-2.9 2.9h16.7l3.8-2.9z"/>
    <path id="Forma 8 copy" class="filled" d="m439.2 16.8l-2.9 2.9h16.7l3.8-2.9z"/>
    <path id="Forma 8 copy 2" class="filled" d="m463.2 16.8l-2.9 2.9h7.3l2.9-2.9z"/>
    <path id="Forma 1" class="filled" d="m309 13h88"/>
    <path id="Forma 2" class="filled" d="m390.1 17.2l8.9-10.2h79l-3.5 3.5h-67.5l-8 8.6z"/>
  </svg>`
  /* stretchPart.innerHTML = `<svg class="indexUIsvg" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 32">
    <style>
      .s0 { stroke-width: 3 } 
    </style>
    <path id="Forma 4" fill-rule="evenodd" class="s0" d="m60 0v32"/>
    <path id="Forma 4 copy" fill-rule="evenodd" class="s0" d="m480 0v32"/>
  </svg>` */
  bottomPart.innerHTML = `<svg class="indexUIsvg" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 72">
    <style>
      .s0 { stroke-width: 3 } 
      .s1 { stroke-linecap: round } 
      .s4 { stroke-width: 2 } 
    </style>
    <path fill-rule="evenodd" class="s0" d="m20 18c-3.9 0-7-3.1-7-7 0-3.9 3.1-7 7-7 3.9 0 7 3.1 7 7 0 3.9-3.1 7-7 7z"/>
    <path fill-rule="evenodd" class="s1" d="m18.8 11h40.1"/>
    <path fill-rule="evenodd" class="s0" d="m480 10.6v32.4l-13.7 13.9h-168.8l-0.3-3.9h-227.2l-10-10v-32.5"/>
    <path id="Forma 3" class="filled"  d="m59 17l-4.1 4.1v22.9 5l5.6 5.6h32.5l5.6-5.6h-32.6v-22l-6.1-6.1z"/>
    <path fill-rule="evenodd" class="s3" d="m120 53l-20 10 189 2 8.5-7.4 0.1-4.5"/>
    <path id="Forma 5" fill-rule="evenodd" class="s4" d="m68 66c-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3 0 1.7-1.3 3-3 3z"/>
    <path id="Forma 6" fill-rule="evenodd" class="s3" d="m102 63h-31"/>
    <path id="Forma 7" fill-rule="evenodd" class="filled" d="m20 13c-1.1 0-2-0.9-2-2 0-1.1 0.9-2 2-2 1.1 0 2 0.9 2 2 0 1.1-0.9 2-2 2z"/>
  </svg>`

  element.addEventListener("click", () => {
    const plegableContent = element.querySelector(".plegable")
    if (!element.classList.contains("active")) {
      element.classList.add("active")
      plegableContent.style.maxHeight = plegableContent.scrollHeight + "px"
    } else {
      element.classList.remove("active")
      plegableContent.style.maxHeight = "0"
    }
  })
})

const defineHeightOfStretchPart = () => {
  indexUiComponents.forEach(element => {
    const stretchablePart = element.querySelector(".stretch")
    stretchablePart.style.top = `${element.scrollWidth * 0.06}px`
    stretchablePart.style.bottom = `${element.scrollWidth * 0.07}px`
  })
}

window.addEventListener("load", defineHeightOfStretchPart)
window.addEventListener("resize", defineHeightOfStretchPart)

// =========================================
// Formatear elementos code
document.querySelectorAll(".code").forEach(el => {
  // saltos de linea; primero detecta si la primera linea está vacía, si es el caso la quita del array
  // para luego tomar los espacios en blancos y usar esa cantidad para saber la tabulación inicial
  const lines = el.textContent.split("\n").filter((line, i, a) => i == 0 || i == a.length-1 ? line.trim() != "" : true)
  const initialTab = lines[0].split(" ").filter(substring => substring == "").length
  
  const formattedLines = lines.map(line =>  line.substring(initialTab))

  el.innerHTML = ""
  formattedLines.forEach(line => {
    const lineEl = document.createElement("span")

    if (line.startsWith("  ")) {
      const paddingLeft = line.split(" ").filter(substring => substring == "").length * 8 + 10 // el "+ 10" es por el padding por default
      lineEl.style.paddingLeft = paddingLeft + "px"
    }

    lineEl.innerHTML = line
    el.appendChild(lineEl)
  })
})

// ========================================
// Código de carrusel
const carrouselContainer = document.querySelector('.carrouselContainer')
const images = carrouselContainer.querySelectorAll('.imageCarrouselContainer')
const selectButtonContainer = document.querySelector('.selectItemButtons')
const leftButton = document.querySelector('.carrouselButtons .left')
const rightButton = document.querySelector('.carrouselButtons .right')

const scrollAmount = carrouselContainer?.offsetWidth
let carrouselIndex = 0

const scrollCarrousel = (newIndex, isRelative = false) => {
  if (isRelative) {
    carrouselIndex += newIndex
    newIndex = carrouselIndex
  } else {
    carrouselIndex = newIndex
  }

  if (newIndex < 0) {
    carrouselIndex = images.length - 1
  }
  if (newIndex > images.length - 1) {
    carrouselIndex = 0
  }

  newIndex = carrouselIndex

  carrouselContainer?.scrollTo({
    left: scrollAmount * newIndex,
    behavior: 'smooth',
  })
}

const highlightItemSelector = () => {
  const itemSelectors = selectButtonContainer.querySelectorAll("& > span")
  itemSelectors.forEach((item, index) => {
    if (index == carrouselIndex) item.classList.toggle("active", true)
    else item.classList.toggle("active", false)
  })
}

// - Evento para desplazarse a la izquierda
leftButton?.addEventListener('click', () => {
  scrollCarrousel(-1, true)
  highlightItemSelector()
})

// - Evento para desplazarse a la derecha
rightButton?.addEventListener('click', () => {
  scrollCarrousel(1, true)
  highlightItemSelector()
})

// - Creación de botones de selección específicos
images.forEach((_, index) => {
  if (!selectButtonContainer) return

  const itemSelector = document.createElement("span")
  itemSelector.addEventListener('click', () => {
    scrollCarrousel(index)

    const othersItemSelectors = selectButtonContainer.querySelectorAll("&>span")
    othersItemSelectors.forEach(item => {
      item.classList.toggle("active", false)
    })
    itemSelector.classList.add("active")
  })
  if (index == 0) itemSelector.classList.add("active")
  selectButtonContainer.appendChild(itemSelector)
})