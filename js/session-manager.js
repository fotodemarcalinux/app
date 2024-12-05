document.addEventListener("DOMContentLoaded", () => {
    const dynamicMoldura = document.getElementById("dynamic-moldura");
    const downloadBtn = document.getElementById("download-btn");

    // Função para configurar o download da moldura
    function downloadMoldura() {
        const container = dynamicMoldura.cloneNode(true);

        // Define o tamanho fixo para o clone
        container.style.width = "1984px";
        container.style.height = "130px";
        container.style.margin = "0";
        container.style.position = "absolute";
        container.style.left = "-9999px";
        document.body.appendChild(container);

        // Renderiza o canvas com alta escala
        html2canvas(container, {
            width: 1984,
            height: 130,
            scale: 2, // Aumenta a escala para mais qualidade
            useCORS: true,
        }).then((canvas) => {
            // Cria um novo canvas para redimensionar
            const resizedCanvas = document.createElement("canvas");
            resizedCanvas.width = 1984; // Largura final
            resizedCanvas.height = 130; // Altura final
            const context = resizedCanvas.getContext("2d");

            // Redimensiona a imagem original para o tamanho final
            context.drawImage(canvas, 0, 0, 1984, 130);

            // Converte o canvas redimensionado em imagem e inicia o download
            const link = document.createElement("a");
            link.download = "moldura.png";
            link.href = resizedCanvas.toDataURL("image/png");
            link.click();

            // Remove o clone do DOM
            document.body.removeChild(container);
        });
    }

    // Evento de download
    downloadBtn.addEventListener("click", downloadMoldura);
});
