/* Definición de recursos */

const finalRingPosition = () => window.innerWidth > 719 ? "calc((100vw / -2) - 25%)" : "0 -100vh"

const $KEYFRAME_opening = ({ destinationObject }) => {
  return destinationObject == "ring" ? [
  {offset: 0, borderWidth: "0px"}, {offset: 1, borderWidth: "56px"}
  ] :
    destinationObject == "logo" ? [
      {offset: 0, opacity: 0}, {offset: 1, opacity: 1}
    ] :
      destinationObject == "navItems" ? [
        {offset: 0, scale: "0"}, {offset: 0.8, scale: "1.5"}, {offset: 1, scale: "1"}
      ] : null
}
const _openingAnimationProps = ({duration, delay = 0, direction = "normal", fill = "none"}) => (
  { duration, delay, easing: "ease", direction, fill }
  )

const $KEYFRAME_moveRing = [{
  translate: finalRingPosition(),
  offset: 1
}]
const $KEYFRAME_moveRingItems = (angle) => [
  { rotate: "270deg", offset: 0.35 },
  { rotate: `${angle}deg`, offset: 1 }
]
const _ringMoveAnimationProps = { duration: 1500, delay: 2000,easing: "ease"}

function calcularAnguloSegunItem (anguloInicial, anguloDeDistribucion, multiplicador) {
  return (
    anguloInicial + multiplicador * (anguloDeDistribucion / ($navItems_Container.length -1))
  )
}

function devolverAnguloActual (prop) {
  return Number (prop.match(/(\d*\.?\d{0,3})/)[0])
}

function definirStylesSegunVWPreAnimation () {
  if (window.innerWidth > 719) {
    $ring.style.width = "calc(100vh - 1rem)"
    $ring.style.top = "0.5rem"

    const ringWidth = $ring.offsetWidth
    $main.style.alignItems = window.innerWidth < 1280 ? 'flex-start' : 'center'
    $main.style.marginLeft = window.innerWidth < 1280 ? `${ringWidth * 0.25}px` : "0"
    $main.style.width = `calc(100vw - ${ringWidth * 0.25}px - ${ancho$scrollbar})`
  }
  else {
    $ring.style.width = "calc(100vw - 2rem)"
    // $ring.style.left = "1rem"
    $main.style.marginLeft = "0"
    $main.style.width = "100%"
  }
}

const defaultAngles = []
let startAnimationFinished = false

const finalAnimationStyles = {
  ring_root: () => {
    const $nav = $ring.querySelector("nav")
    if (window.innerWidth < 720) {
      Object.assign($root.style, {
        flexDirection: "column",
        justifyContent: "flex-start"
      })
      Object.assign($ring.style, {
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
    } else {
      Object.assign($root.style, {
        flexDirection: "row",
        justifyContent: "center"
      })
      Object.assign($ring.style, {
        position: "fixed",
        borderRadius: "100%",
        border: "56px solid var(--bg-contrast-color)",
        aspectRatio: "1",
        backgroundColor: "initial",
        padding: 0,
        translate: finalRingPosition()
      })
      Object.assign($nav.style, {
        display: "flex"
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
      const $title = $element.querySelector(".title")
      $element.style.transition = "rotate 0ms"

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
      } else 
      if (window.innerHeight < 720) {
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

// -----------------------------------------------------------------------------------------
/* Setear animaciones y estilos al cargar la página o al cambiar el tamaño de la pantalla */
const $logoInRing = $ring.querySelector("#logoInRing")

window.addEventListener("load", () => {
  definirStylesSegunVWPreAnimation()

  const lastVisit = localStorage.getItem('lastAnimationTime');
  const currentTime = Date.now();

  if (!lastVisit || currentTime - lastVisit > minutesWithoutAnimationInMS) {
    localStorage.setItem('lastAnimationTime', currentTime);
    
    $ring.animate($KEYFRAME_opening({destinationObject: "ring"}), _openingAnimationProps({duration: 600})).ready.then(() => {
      $ring.animate($KEYFRAME_moveRing, _ringMoveAnimationProps)
      .finished.then(() => {
        finalAnimationStyles.ring_root()
      })
    })
    
    $logoInRing.animate($KEYFRAME_opening({destinationObject: "logo"}), _openingAnimationProps({duration: 600})).finished.then(() => {
      $logoInRing.style.opacity = 1
      $logoInRing.animate($KEYFRAME_opening({destinationObject: "logo"}), _openingAnimationProps({duration: 300, delay: 1400, direction:"reverse"}))
      .finished.then(() => {
        finalAnimationStyles.logo()
      })
    })
    
    $navItems_Container.forEach(($element, index) => {
      const $navItem_button = $element.querySelector(".navItem")
      $element.style.rotate = `${calcularAnguloSegunItem(135, 90, index)}deg`
      const anguloFinal = calcularAnguloSegunItem(405, 135, index)
      
      $navItem_button.animate(
        $KEYFRAME_opening({destinationObject: "navItems"}), 
        _openingAnimationProps({duration: 500, delay: 250 * index})
      ).finished.then(() => {
        finalAnimationStyles.navItems($element, index).button()
      })
      $element.animate($KEYFRAME_moveRingItems(anguloFinal), _ringMoveAnimationProps).finished.then(() => {
        finalAnimationStyles.navItems($element, index).item()
        $navItems_Container[0].classList.add("current")
      })
    })
  } else {
    finalAnimationStyles.ring_root()
    finalAnimationStyles.logo()
    $navItems_Container[0].classList.add("current")
    $navItems_Container.forEach(($element, index) => {
      finalAnimationStyles.navItems($element, index).button()
      finalAnimationStyles.navItems($element, index).item()
    })
  }
})

window.addEventListener("resize", () => {
  definirStylesSegunVWPreAnimation()
  if (startAnimationFinished) { 
    finalAnimationStyles.ring_root()
    $navItems_Container.forEach(($element, index) => {finalAnimationStyles.navItems($element, index).item(true)})
  } 
})


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

/* Animación del hover en la nav */

$ring.addEventListener("mouseenter", () => {
  if (!startAnimationFinished || window.innerWidth < 720) return

  isRingHovered = true
  anglesBackup = []
  $navItems_Container.forEach(($navItem, index) => {
    anglesBackup.push(devolverAnguloActual($navItem.style.rotate))
    const angulo = calcularAnguloSegunItem(405, 90, index)
    $navItem.style.transition = "rotate 500ms ease"
    $navItem.style.rotate = `${angulo}deg`
  })
})
$ring.addEventListener("mouseleave", () => {
  if (window.innerHeight < 720 || window.innerWidth < 720) return

  isRingHovered = false
  $navItems_Container.forEach(($navItem, index) => {
    $navItem.style.rotate = `${anglesBackup[index]}deg`
    $navItem.style.transition = "rotate 200ms ease"
  })
})