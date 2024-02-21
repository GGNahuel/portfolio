const finalRingPosition = window.innerWidth > 719 ? "calc((100vw / -2) - 25%)" : "0 -100vh"

const $KEYFRAME_ring = [{
  translate: finalRingPosition,
  offset: 1
}]
const $KEYFRAME_ringItems = (angle) => [
  { rotate: "270deg", offset: 0.35 },
  { rotate: `${angle}deg`, offset: 1 }
]
const _ringAnimationProperties = { duration: 1500, delay: 1500,easing: "ease"}

function calcularAnguloSegunItem (anguloInicial, anguloRelativoFinal, multiplicador) {
  return (
    anguloInicial + multiplicador * (anguloRelativoFinal / ($navItems_Container.length -1))
  )
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

window.addEventListener("load", () => {
  let anguloDistribucionItems = window.innerWidth > 719 ? 135 : 0

  definirStylesSegunVW()

  $ring.animate($KEYFRAME_ring, _ringAnimationProperties)
  .finished.then(() => {
    $ring.style.translate = finalRingPosition
    $navItems_Container[0].classList.add("current")
    $root.style.overflowY = "visible"
    $main.style.display = "flex"
    startAnimationFinished = true
    ajustarAncho()
  })

  $navItems_Container.forEach(($element, index) => {
    $element.style.rotate = `${calcularAnguloSegunItem(135, 90, index)}deg`

    const anguloFinal = calcularAnguloSegunItem(405, anguloDistribucionItems, index)
    $element.animate($KEYFRAME_ringItems(anguloFinal), _ringAnimationProperties).finished.then(() => {
      $element.style.rotate = `${anguloFinal}deg`
      defaultAngles.push(calcularAnguloSegunItem(405, 135, index))
    })
  })
})
window.addEventListener("resize", () => {
  const newFinalRingPosition = window.innerWidth > 719 ? "calc((100vw / -2) - 25%)" : "0 -100vh"
  if (startAnimationFinished) {
    $ring.style.translate = newFinalRingPosition
    let anguloDistribucionItems = window.innerWidth > 719 ? 135 : 0
    $navItems_Container.forEach(($element, index) => {
      $element.style.rotate = `${calcularAnguloSegunItem(405, anguloDistribucionItems, index)}deg`
    })
  }
  definirStylesSegunVW()
})

let pixelsForScroll = 0
let lastScrollTopPosition = 0
$root.addEventListener("scroll", () => {
  pixelsForScroll = $root.scrollTop - lastScrollTopPosition
  lastScrollTopPosition = $root.scrollTop

  const ringRadius = $ring.offsetHeight / 2
  const newAngle = truncWithDecimals(((pixelsForScroll / ringRadius) * (180 / Math.PI)), 3) * 90 / 360 * -1

  let actualSectionInScreenIndex = -1
  for (let index = 0; index < $mainSections.length; index++) {
    const $section = $mainSections[index]
    const $navItem = $navItems_Container[index]

    const actualAngle = Number (window.getComputedStyle($navItem).rotate.match(/(\d*\.?\d{0,3})/)[0])
    $navItem.style.rotate = `${lastScrollTopPosition !== 0 ? actualAngle + newAngle : defaultAngles[index]}deg`

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
