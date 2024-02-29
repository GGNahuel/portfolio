/* Definición de recursos */

const finalRingPosition = () => window.innerWidth > 719 ? "calc((100vw / -2) - 25%)" : "0 -100vh"

const $KEYFRAME_opening = ({ destinationObject }) => {
  return destinationObject == "ring" ? [
  {offset: 0, borderWidth: "0px"}, {offset: 1, borderWidth: "64px"}
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

function calcularAnguloSegunItem (anguloInicial, anguloRelativoFinal, multiplicador) {
  return (
    anguloInicial + multiplicador * (anguloRelativoFinal / ($navItems_Container.length -1))
  )
}

function devolverAnguloActual (prop) {
  return Number (prop.match(/(\d*\.?\d{0,3})/)[0])
}

function definirStylesSegunVW () {
  if (window.innerWidth > 719) {
    $ring.style.width = "calc(100vh - 1rem)"
    $ring.style.top = "0.5rem"

    const ringWidth = $ring.offsetWidth
    $main.style.marginLeft = `${ringWidth * 0.25}px`
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

// -----------------------------------------------------------------------------------------
/* Setear animaciones y estilos al cargar la página o al cambiar el tamaño de la pantalla */
const $logoInRing = $ring.querySelector("#logoInRing")

window.addEventListener("load", () => {
  let anguloDistribucionItems = window.innerWidth > 719 ? 135 : 0

  definirStylesSegunVW()

  $ring.animate($KEYFRAME_opening({destinationObject: "ring"}), _openingAnimationProps({duration: 600})).ready.then(() => {
    $ring.animate($KEYFRAME_moveRing, _ringMoveAnimationProps)
    .finished.then(() => {
      $ring.style.translate = finalRingPosition()
      $navItems_Container[0].classList.add("current")
      $root.style.overflowY = "visible"
      $main.style.display = "flex"
      startAnimationFinished = true
      ajustarAncho()
    })
  })

  $logoInRing.animate($KEYFRAME_opening({destinationObject: "logo"}), _openingAnimationProps({duration: 600})).finished.then(() => {
    $logoInRing.style.opacity = 1
    $logoInRing.animate($KEYFRAME_opening({destinationObject: "logo"}), _openingAnimationProps({duration: 300, delay: 1400, direction:"reverse"}))
    .finished.then(() => {
      $logoInRing.style.opacity = 0
    })
  })

  $navItems_Container.forEach(($element, index) => {
    const $navItem_button = $element.querySelector(".navItem")
    $element.style.rotate = `${calcularAnguloSegunItem(135, 90, index)}deg`
    const anguloFinal = calcularAnguloSegunItem(405, anguloDistribucionItems, index)

    $navItem_button.animate(
      $KEYFRAME_opening({destinationObject: "navItems"}), 
      _openingAnimationProps({duration: 500, delay: 250 * index, fill: "forwards"})
    )
    $navItem_button.addEventListener("animationend", () => {
      $navItem_button.classList.add("enabled")
    })
    $element.animate($KEYFRAME_moveRingItems(anguloFinal), _ringMoveAnimationProps).finished.then(() => {
      $element.style.rotate = `${anguloFinal}deg`
      defaultAngles.push(calcularAnguloSegunItem(405, 135, index))
    })
  })
})

window.addEventListener("resize", () => {
  if (startAnimationFinished) {
    $ring.style.translate = finalRingPosition()
    let anguloDistribucionItems = window.innerWidth > 719 ? 135 : 0
    $navItems_Container.forEach(($element, index) => {
      $element.style.rotate = `${calcularAnguloSegunItem(405, anguloDistribucionItems, index)}deg`
      // sumar la cantidad de lo que seria el newAngle_relative segun lo que se desplazaría con el scroll
    })
  }
  definirStylesSegunVW()
})


/* Evento de scroll, "gira" de los navItems e indicación del que está activo */

let pixelsForScroll = 0
let lastScrollTopPosition = 0
let anglesBackup = []
let isRingHovered = false
$root.addEventListener("scroll", () => {
  pixelsForScroll = $root.scrollTop - lastScrollTopPosition
  lastScrollTopPosition = $root.scrollTop

  // si al total del largo de la pantala le corresponen 135°, cuántos le corresponden al pixelsForScroll
  // 135°(angulo de distribución) ___ $root.offsetHeight
  // newAngle_Relative ___ pixelsForScroll

  const newAngle_Relative = pixelsForScroll * 135 / $root.scrollHeight * -1

  let actualSectionInScreenIndex = -1
  let temp_actualAngles = anglesBackup
  for (let index = 0; index < $mainSections.length; index++) {
    const $section = $mainSections[index]
    const $navItem = $navItems_Container[index]

    $navItem.style.transition = "initial"

    const actualAngle = devolverAnguloActual($navItem.style.rotate)
    const newAngle_Final = (!isRingHovered ? actualAngle : temp_actualAngles[index]) + newAngle_Relative

    if (!isRingHovered) {
      $navItem.style.rotate = `${lastScrollTopPosition !== 0 ? newAngle_Final : defaultAngles[index]}deg`
    }
    else {
      if (index === 0) anglesBackup = []
      anglesBackup.push(newAngle_Final)
    }

    const eqSectionProps = {
      posYstart: $section.offsetTop,
      posYfinish: $section.offsetTop + $section.offsetHeight,
      posYhalf: $section.offsetTop + $section.offsetHeight / 2
    }
    const isSectionInScreen = lastScrollTopPosition >= eqSectionProps.posYstart && lastScrollTopPosition < eqSectionProps.posYfinish
    if (isSectionInScreen) {
      actualSectionInScreenIndex = index
    }
    if (lastScrollTopPosition >= eqSectionProps.posYhalf && index < $navItems_Container.length - 1) {
      actualSectionInScreenIndex = index + 1
    }
    if (actualSectionInScreenIndex == index) {
      $navItem.classList.toggle("current", true)
    }
    else $navItem.classList.toggle("current", false)
  }
})

/* Animación del hover en la nav */

$ring.addEventListener("mouseenter", () => {
  if (!startAnimationFinished) return
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
  isRingHovered = false
  $navItems_Container.forEach(($navItem, index) => {
    $navItem.style.rotate = `${anglesBackup[index]}deg`
    $navItem.style.transition = "rotate 200ms ease"
  })
})