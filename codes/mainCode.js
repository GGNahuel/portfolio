const $loadingScreen = document.querySelector("#loadingScreen")
const $root = document.querySelector("#root")

const $header = document.querySelector("#mainHeader")
const $navItems_Container = $header?.querySelectorAll(".navItem_Container")

const $main = document.querySelector("#root main")
const $mainSections = document.querySelectorAll("main > section")

const minutesWithoutAnimationInMS = 5 * 60 * 1000

const ancho$scrollbar = '17px'
function ajustarAncho() {
  if (window.innerWidth > 719) {
    var tieneScroll = $root.scrollHeight > window.innerHeight
    $root.style.paddingRight = tieneScroll ? '0' : ancho$scrollbar
  } else {
    $root.style.paddingRight = 0
  }
}

document.addEventListener('DOMContentLoaded', () => {
  $loadingScreen.style.display = "flex"

  const lastVisit = localStorage.getItem('lastAnimationTime');
  const currentTime = Date.now();
  if (lastVisit && (currentTime - lastVisit) < minutesWithoutAnimationInMS) {
    $root.style.overflowY = "visible"
    $main.style.display = "flex"

    setTimeout(() => {
      const hash = window.location.hash.slice(1);
      const element = document.getElementById(hash);
      if (element) {
        console.log(element)
        element.scrollIntoView({behavior: "instant"});
      }
    }, 100)
  }
})
window.addEventListener('load', () => {
  ajustarAncho()
  $loadingScreen.style.display = "none"
  $root.style.display = "flex"
})
window.addEventListener('resize', ajustarAncho)

function truncWithDecimals(number = Number, decimals = 0) {
  return Math.trunc(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
}
