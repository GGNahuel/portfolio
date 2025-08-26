const navbar = document.querySelector(".projectsNavbar")
const mainZone = document.querySelector("main.notIndex")
mainZone.style.height = `calc(100dvh - ${navbar.scrollHeight}px)`
// ____________________________
// Código del carrusel
const carrouselContainer = document.querySelector('.carrouselContainer')
const leftButton = document.querySelector('.carrouselButtons .left')
const rightButton = document.querySelector('.carrouselButtons .right')

const scrollAmount = carrouselContainer.offsetWidth;
const scrollCarrousel = (numberDirection) => {  
  carrouselContainer.scrollBy({
    left: scrollAmount * numberDirection,
    behavior: 'smooth',
  });
}

// Evento para desplazarse a la izquierda
leftButton.addEventListener('click', () => scrollCarrousel(-1));

// Evento para desplazarse a la derecha
rightButton.addEventListener('click', () => scrollCarrousel(1));

