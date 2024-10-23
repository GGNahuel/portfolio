const $loadingScreen = document.querySelector("#loadingScreen")
const $root = document.querySelector("#root")

const $ring = document.querySelector("#mainHeader")
const $navItems_Container = $ring?.querySelectorAll(".navItem_Container")

const $main = document.querySelector("#root main")
const $mainSections = document.querySelectorAll("main > section")


const ancho$scrollbar = '17px'
function ajustarAncho() {
  var tieneScroll = $root.scrollHeight > window.innerHeight
  $root.style.paddingRight = tieneScroll ? '0' : ancho$scrollbar
}

document.addEventListener('DOMContentLoaded', () => {
  $loadingScreen.style.display = "flex"
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
