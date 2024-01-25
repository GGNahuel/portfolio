const $ring = document.querySelector("#mainHeader>nav")
const $navItems_Container = $ring.querySelectorAll(".navItem_Container")
// const $navItems = $ring.querySelectorAll(".navItem")

const $KEYFRAME_ring = [{
    transform: window.innerWidth > 719 ? "translateX(calc((100vw / -2) - 25%))" : "translateY(-100vh)",
    offset: 1
}]
const $KEYFRAME_ringItems = (angle) => [
    { transform: "rotate(270deg)", offset: 0.35 },
    { transform: "rotate(360deg)", offset: 0.75 },
    { transform: `rotate(${angle}deg)`, offset: 1 }
]
const _ringAnimationProperties = { duration: 1500, delay: 1000,easing: "ease", fill: "forwards" }

if (window.innerWidth > window.innerHeight) {
    $ring.style.height = "calc(100vh - 1rem)"
    $navItems_Container.forEach((element, index) => {
        element.style.transform = `rotate(${180 + 15 * index}deg)`
        element.animate($KEYFRAME_ringItems(450 + index * (180 / ($navItems_Container.length + 2))), _ringAnimationProperties)
    })
}
else {
    $ring.style.width = "calc(100vw - 5rem)"
}

$ring.animate($KEYFRAME_ring, _ringAnimationProperties)