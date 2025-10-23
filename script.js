







//the year function on footer

const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

// ...existing code...

const carouselTrack = document.querySelector('.carouselTrack');
const cards = document.querySelectorAll('.cards');
const visibleCards = 4;
let currentIndex = 0;
const cardWidth = cards[0].offsetWidth; // card width

function slideCarousel() {
    carouselTrack.style.transition = 'transform 3s ease';
    carouselTrack.style.transform = `translateX(-${cardWidth}px)`;
    currentIndex++;
}

function resetCarousel() {
    carouselTrack.style.transition = 'none';
    carouselTrack.style.transform = 'translateX(0)';
    carouselTrack.appendChild(carouselTrack.firstElementChild);
    currentIndex = 0;
}

setInterval(() => {
    slideCarousel();
    setTimeout(resetCarousel, 3000); // match transition duration
}, 5000);

// ...existing code...      