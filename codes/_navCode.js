const $ring = document.querySelector("#mainHeader")
const $navItems_Container = $ring.querySelectorAll(".navItem_Container")

const $KEYFRAME_ring = [{
    transform: window.innerWidth > 719 ? "translateX(calc((100vw / -2) - 25%))" : "translateY(-100vh)",
    offset: 1
}]
const $KEYFRAME_ringItems = (angle) => [
    { transform: "rotate(270deg)", offset: 0.35 },
    { transform: `rotate(${angle}deg)`, offset: 1 }
]
const _ringAnimationProperties = { duration: 1500, delay: 1500,easing: "ease", fill: "forwards" }

const distribuirItemsEnAnillo = (anguloInicial, anguloRelativoFinal, multiplicador) => 
    (anguloInicial + multiplicador * (anguloRelativoFinal / ($navItems_Container.length -1)))

if (window.innerWidth > window.innerHeight) {
    $ring.style.height = "calc(100vh - 1rem)"
    $navItems_Container.forEach((element, index) => {
        element.style.transform = `rotate(${distribuirItemsEnAnillo(135, 90, index)}deg)`
        element.animate($KEYFRAME_ringItems(distribuirItemsEnAnillo(405, 135, index)), _ringAnimationProperties)
    })
}
else {
    $ring.style.width = "calc(100vw - 5rem)"
}

$ring.animate($KEYFRAME_ring, _ringAnimationProperties)
    .finished.then(() => { console.log("overflow del root scroll") })