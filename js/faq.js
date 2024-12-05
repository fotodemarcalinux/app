// Script para alternar a exibição de respostas na seção FAQ
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-item h3').forEach((item) => {
        item.addEventListener('click', () => {
            const parent = item.parentNode;
            parent.classList.toggle('active'); // Alterna a classe 'active'

            // Fecha outros itens abertos
            document.querySelectorAll('.faq-item').forEach((faq) => {
                if (faq !== parent) {
                    faq.classList.remove('active');
                }
            });
        });
    });
});
