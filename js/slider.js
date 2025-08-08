const slideContainer = document.getElementById('slide-container');
const indicators = document.querySelectorAll('.indicators button');

let currentIndex = 0;
const slideCount = indicators.length;
const slideInterval = 4000; // Tempo de transição (em milissegundos)

// Atualiza a posição do slide e os indicadores
function updateSlidePosition() {
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Avança para o próximo slide automaticamente
function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlidePosition();
}

// Configura os eventos para os indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateSlidePosition();
        resetAutoSlide();
    });
});

// Controle automático
let autoSlide = setInterval(nextSlide, slideInterval);

// Reinicia o controle automático ao interagir com os indicadores
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, slideInterval);
}