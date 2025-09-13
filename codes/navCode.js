// ----------
/* Definición de recursos */
const $firstRing = $header.querySelector(".firstRing")
const $secondRing = $header.querySelector(".secondRing")

const finalHeaderPosition = () => window.innerWidth > 719 ? "calc((100vw / -2) - 25%)" : "0 -100vh"

// propiedades para las animaciones de aparición (pre-desplazamiento del header)
const $KEYFRAME_opening = {
  header: [
    { offset: 0, opacity: 0}, {offset: 1, opacity: 1 }
  ],
  logo: [
    // también se debería agregar, y sacar al terminar, la clase active así se puede animar el clip-path
    { offset: 0, opacity: 0 },
    { offset: 0.4, opacity: 0.9 },
    { offset: 0.5, opacity: 0.2 },
    { offset: 0.7, opacity: 0.7 },
    { offset: 0.8, opacity: 0.6 },
    { offset: 1, opacity: 1 }
  ],
  logoClose: [
    { offset: 0, opacity: 0.7}, {offset: 1, opacity: 0 }
  ],
  firstRing: [
    { offset: 0, rotate: "0deg" }, { offset: 0.3, rotate: "270deg" }, { offset: 1, rotate: "360deg" }
  ],
  secondRing: [
    { offset: 0, rotate: "0deg" } , { offset: 0.3, rotate: "210deg" }, { offset: 1, rotate: "360deg" }
  ],
  navItems: [
    { offset: 0, scale: "0" }, { offset: 0.8, scale: "1.5" }, { offset: 1, scale: "1" }
  ]
}
const _openingAnimationProps = ({duration, delay = 0}) => (
  { duration, delay, easing: "ease" }
)

// propiedades para las animaciones durante el desplazamiento del header completo
const $KEYFRAME_headerTransition = {
  header: [
    { offset: 1, translate: finalHeaderPosition() }
  ],
  navItem: (angle) => [
    { offset: 0.35, rotate: "270deg" },
    { offset: 1, rotate: `${angle}deg` }
  ],
  firstRing: [
    { offset: 1, rotate: "-360deg" }
  ],
  secondRing: [
    { offset: 1, rotate: "360deg" }
  ]
}
const _headerTransitionAnimationProps = { duration: 1500, delay: 2500, easing: "ease" }

// parámetros de tiempo para las animaciones del logo pre-desplazamiento
const propForLogoAnimations = {
  openingDuration: _headerTransitionAnimationProps.delay * 0.4,
  endingDelay: _headerTransitionAnimationProps.delay * 0.6
}

// propiedades para la animación en loop de los anillos
const $KEYFRAME_ringsLoopAnimation = {
  firstRing: [
    { offset: 0, rotate: "0deg" }, { offset: 1, rotate: "-360deg" }
  ],
  secondRing: [
    { offset: 0, rotate: "0deg" }, { offset: 1, rotate: "360deg" }
  ]
}
const _ringsLoopAnimationProps = { duration: 20000, iterations: Infinity, easing: "linear" }

// utilidades para trabajar con los ángulos de los items de la nav
function calcularAnguloSegunItem (anguloInicial, anguloDeDistribucion, multiplicador) {
  return (
    anguloInicial + multiplicador * (anguloDeDistribucion / ($navItems_Container.length -1))
  )
}
function devolverAnguloActual (prop) {
  return Number (prop.match(/(\d*\.?\d{0,3})/)[0])
}
const defaultAngles = []

// estilos iniciales, pre-animación de aparición
function definirStylesSegunVWPreAnimation () {
  if (window.innerWidth > 719) {
    $header.style.width = "calc(100vh - 1rem)"
    $header.style.top = "0.5rem"

    const headerWidth = $header.offsetWidth
    $main.style.alignItems = window.innerWidth < 1380 ? 'flex-start' : 'center'
    $main.style.marginLeft = window.innerWidth < 1380 ? `${headerWidth * 0.25}px` : "0"
    $main.style.width = `calc(100vw - ${headerWidth * 0.25}px - ${ancho$scrollbar})`
  }
  else {
    $header.style.width = "calc(100vw - 2rem)"
    // $header.style.left = "1rem"
    $main.style.marginLeft = "0"
    $main.style.width = "100%"
  }
}

let startAnimationFinished = false

const finalAnimationStyles = {
  header_root: () => {
    const $nav = $header.querySelector("nav")

    // estilos para pantallas chicas
    if (window.innerWidth < 720) {
      Object.assign($root.style, {
        flexDirection: "column",
        justifyContent: "flex-start"
      })
      Object.assign($header.style, {
        position: "sticky",
        top: 0,
        borderRadius: 0,
        border: 0,
        width: "100%",
        aspectRatio: "inherit",
        backgroundColor: "var(--bg-contrast-color)",
        padding: "8px",
        translate: "0 0"
      })
      Object.assign($nav.style, {
        display: "grid"
      })
      Object.assign($firstRing.style, {
        display: "none"
      })
      Object.assign($secondRing.style, {
        display: "none"
      })
    } 
    // estilos para pantallas grandes
    else {
      Object.assign($root.style, {
        flexDirection: "row",
        justifyContent: "center"
      })
      Object.assign($header.style, {
        position: "fixed",
        aspectRatio: "1",
        backgroundColor: "initial",
        padding: 0,
        translate: finalHeaderPosition()
      })
      Object.assign($nav.style, {
        display: "flex"
      })
      Object.assign($firstRing.style, {
        display: "block"
      })
      Object.assign($secondRing.style, {
        display: "block"
      })
    }
    $root.style.overflowY = "visible"
    $main.style.display = "flex"
    window.setTimeout(() => {
      $main.style.opacity = 1
      startAnimationFinished = true
    }, 100)
    ajustarAncho()
  },
  logo: () => {
    $logoInRing.style.opacity = 0
    $logoInRing.style.display = "none"
  },
  navItems: ($element, index) => ({
    button: () => {
      const $navItem_button = $element.querySelector(".navItem")
      $navItem_button.classList.add("enabled")
    },
    item: (isResizingWindow = false) => {
      if (!isResizingWindow) defaultAngles.push(calcularAnguloSegunItem(405, 135, index))

      const $navItem_button = $element.querySelector(".navItem")
      $navItem_button.style.opacity = "0.6"
      const $title = $element.querySelector(".title")
      $element.style.transition = "rotate 0ms"

      // estilos para pantallas angostas
      if (window.innerWidth < 720) {
        Object.assign($element.style, {
          rotate: "0deg",
          position: "static",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px"
        })
        $navItem_button.style.width = "min-content"
        $navItem_button.style.padding = "8px"
        $title.style.display = "block"
      } 
      // estilos para pantallas grandes según el alto
      else if (window.innerHeight < 720) {
        const angulo = calcularAnguloSegunItem(405, 90, index) // angulo en el que se ven todos los items
        $navItem_button.style.width = "min-content"
        $navItem_button.style.padding = "8px"
        $element.style.rotate = `${angulo}deg`
        $element.style.display = "block"
        $element.style.position = "absolute"
        $title.style.display = "none"
      } else {
        $title.style.display = "none"
        if (isResizingWindow) {
          $element.style.position = "absolute"
          $element.style.rotate = `${
            calcularAnguloSegunItem(405, 135, index) + ($root.scrollTop * 135 / $root.scrollHeight * -1)
          }deg`
          $navItem_button.style.padding = 0
          $navItem_button.style.width = "4rem"
        } else { 
          const anguloFinal = calcularAnguloSegunItem(405, 135, index)
          $element.style.rotate = `${anguloFinal}deg`
        }
      }
    }
  })
}

// --------------------------------------
/* Setear animaciones y estilos al cargar la página o al cambiar el tamaño de la pantalla */
const $logoInRing = $header.querySelector("#logoInRing")

window.addEventListener("load", () => {
  definirStylesSegunVWPreAnimation()

  const lastVisit = localStorage.getItem('lastAnimationTime');
  const currentTime = Date.now();

  // chequea si ya hubo animación recientemente y la hace si no es el caso
  if (!lastVisit || currentTime - lastVisit > minutesWithoutAnimationInMS) {
    localStorage.setItem('lastAnimationTime', currentTime);
    
    $header.animate($KEYFRAME_opening.header, _openingAnimationProps({duration: 600})).ready.then(() => {
      $header.animate($KEYFRAME_headerTransition.header, _headerTransitionAnimationProps).finished.then(() => {
        finalAnimationStyles.header_root()
      })
    })

    $firstRing.animate($KEYFRAME_opening.firstRing, _openingAnimationProps({duration: 1200})).ready.then(() => {
      $firstRing.animate($KEYFRAME_headerTransition.firstRing, _headerTransitionAnimationProps).finished.then(() => {
        window.setTimeout(() => {
          $firstRing.animate($KEYFRAME_ringsLoopAnimation.firstRing, _ringsLoopAnimationProps)
        }, 300)
      })
    })

    $secondRing.animate($KEYFRAME_opening.secondRing, _openingAnimationProps({duration: 1200})).ready.then(() => {
      $secondRing.animate($KEYFRAME_headerTransition.secondRing, _headerTransitionAnimationProps).finished.then(() => {
        window.setTimeout(() => {
          $secondRing.animate($KEYFRAME_ringsLoopAnimation.secondRing, _ringsLoopAnimationProps)
        }, 300)
      })
    })
    
    const logoAnimation = $logoInRing.animate($KEYFRAME_opening.logo, _openingAnimationProps({duration: propForLogoAnimations.openingDuration}))
    logoAnimation.ready.then(() => {
      $logoInRing.classList.add("active")
    })
    logoAnimation.finished.then(() => {
      $logoInRing.style.opacity = 1
      // 
      window.setTimeout(() => {
        $logoInRing.classList.remove("active")
        $logoInRing.animate(
          $KEYFRAME_opening.logoClose,
          _openingAnimationProps({duration: 300})
        ).finished.then(() => {
          finalAnimationStyles.logo()
        })
      }, propForLogoAnimations.endingDelay)
    })
    
    $navItems_Container.forEach(($element, index) => {
      const $navItem_button = $element.querySelector(".navItem")
      $element.style.rotate = `${calcularAnguloSegunItem(135, 90, index)}deg`
      const anguloFinal = calcularAnguloSegunItem(405, 135, index)
      
      $navItem_button.animate(
        $KEYFRAME_opening.navItems, 
        _openingAnimationProps({duration: 500, delay: 250 * index})
      ).finished.then(() => {
        finalAnimationStyles.navItems($element, index).button()
      })
      $element.animate($KEYFRAME_headerTransition.navItem(anguloFinal), _headerTransitionAnimationProps).finished.then(() => {
        finalAnimationStyles.navItems($element, index).item()
        if (index == 0) $navItems_Container[0].classList.add("current")
      })
    })
  } else {
    finalAnimationStyles.header_root()
    finalAnimationStyles.logo()
    $navItems_Container[0].classList.add("current")
    $navItems_Container.forEach(($element, index) => {
      finalAnimationStyles.navItems($element, index).button()
      finalAnimationStyles.navItems($element, index).item()
    })
    $firstRing.animate($KEYFRAME_ringsLoopAnimation.firstRing, _ringsLoopAnimationProps)
    $secondRing.animate($KEYFRAME_ringsLoopAnimation.secondRing, _ringsLoopAnimationProps)
  }
})

window.addEventListener("resize", () => {
  definirStylesSegunVWPreAnimation()
  if (startAnimationFinished) { 
    finalAnimationStyles.header_root()
    $navItems_Container.forEach(($element, index) => {finalAnimationStyles.navItems($element, index).item(true)})
  } 
})

// ----------------------------------
/* Evento de scroll, "gira" de los navItems e indicación del que está activo */

let pixelsForScroll = 0
let lastScrollTopPosition = 0
let anglesBackup = []
let isRingHovered = false
$root.addEventListener("scroll", () => {
  pixelsForScroll = $root.scrollTop - lastScrollTopPosition
  lastScrollTopPosition = $root.scrollTop

  // si al total del largo de la pantalla le corresponden 135°, cuántos le corresponden al pixelsForScroll
  // 135°(angulo de distribución) ___ $root.offsetHeight
  // newAngle_Relative ___ pixelsForScroll
  
  const newAngle_Relative = pixelsForScroll * 135 / $root.scrollHeight * -1
  
  let actualSectionInScreenIndex = 0
  let temp_actualAngles = anglesBackup

  for (let index = 0; index < $mainSections.length; index++) {
    const $section = $mainSections[index]
    const $navItem = $navItems_Container[index]

    $navItem.style.transition = "initial"

    if (window.innerWidth > 719 && window.innerHeight > 719) {
      const actualAngle = devolverAnguloActual($navItem.style.rotate)
      const newAngle_Final = (!isRingHovered ? actualAngle : temp_actualAngles[index]) + newAngle_Relative
  
      if (!isRingHovered) {
        $navItem.style.rotate = `${lastScrollTopPosition !== 0 ? newAngle_Final : defaultAngles[index]}deg`
      }
      else {
        if (index === 0) anglesBackup = []
        anglesBackup.push(newAngle_Final)
      }
    }

    const eqSectionProps = (section = $section) => ({
      yPosStart: section.offsetTop,
      yPosFinish: section.offsetTop + section.offsetHeight,
      yPosPrevious: section.offsetTop - document.documentElement.clientHeight / 2
    })

    const isSectionInScreen = lastScrollTopPosition >= eqSectionProps.yPosStart && lastScrollTopPosition < eqSectionProps.yPosFinish
    if (index < $navItems_Container.length - 1 && lastScrollTopPosition >= eqSectionProps($mainSections[index + 1]).yPosPrevious) {
      actualSectionInScreenIndex = index + 1
    } 
    else if (isSectionInScreen) {
      actualSectionInScreenIndex = index
    }
    if (actualSectionInScreenIndex == index) {
      $navItem.classList.toggle("current", true)
    }
    else $navItem.classList.toggle("current", false)
  }
})

// --------------------------------------
/* Animación del hover en la nav */

$header.addEventListener("mouseenter", () => {
  if (!startAnimationFinished || window.innerWidth < 720) return

  isRingHovered = true
  anglesBackup = []
  $navItems_Container.forEach(($navItem, index) => {
    anglesBackup.push(devolverAnguloActual($navItem.style.rotate))
    const angulo = calcularAnguloSegunItem(405, 90, index)
    $navItem.style.transition = "rotate 400ms ease"
    $navItem.style.rotate = `${angulo}deg`
  })
})
$header.addEventListener("mouseleave", () => {
  if (window.innerHeight < 720 || window.innerWidth < 720) return
  
  isRingHovered = false
  $navItems_Container.forEach(($navItem, index) => {
    $navItem.style.rotate = `${anglesBackup[index]}deg`
    $navItem.style.transition = "rotate 200ms ease"
  })
})