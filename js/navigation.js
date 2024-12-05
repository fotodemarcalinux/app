document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuLinks = document.querySelector('.menu-links');

    // Adiciona evento de clique para o botão hamburguer
    menuToggle.addEventListener('click', () => {
        menuLinks.classList.toggle('active'); // Alterna visibilidade do menu
    });

    // Fecha o menu ao clicar em um link (opcional)
    menuLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('active');
        });
    });
});
