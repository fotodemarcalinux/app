document.addEventListener("DOMContentLoaded", () => {
    const qrTextInput = document.getElementById("qr-text");
    const generateButton = document.getElementById("generate-qr");
    const qrCodeDisplay = document.getElementById("qr-code-display");
    const downloadButton = document.getElementById("download-qr");

    generateButton.addEventListener("click", () => {
        const text = qrTextInput.value.trim();

        // Limpar QR Code anterior
        qrCodeDisplay.innerHTML = "";
        downloadButton.style.display = "none";

        if (!text) {
            alert("Por favor, insira um texto ou link para gerar o QR Code.");
            return;
        }

        // Gerar QR Code
        const tempDiv = document.createElement("div");
        const qrCode = new QRCode(tempDiv, {
            text: text,
            width: 300,
            height: 300,
            correctLevel: QRCode.CorrectLevel.H,
        });

        // Adicionar delay para capturar o QR Code gerado
        setTimeout(() => {
            const canvas = tempDiv.querySelector("canvas");

            if (canvas) {
                const withBorderCanvas = addBorderToQRCode(canvas, 20);

                qrCodeDisplay.appendChild(withBorderCanvas);
                downloadButton.style.display = "inline-block";

                downloadButton.addEventListener("click", () => {
                    const dataURL = withBorderCanvas.toDataURL("image/png");

                    const link = document.createElement("a");
                    link.href = dataURL;
                    link.download = `qrcode_${Date.now()}.png`;
                    link.click();
                });
            }
        }, 500);
    });

    // Função para adicionar borda branca ao QR Code
    function addBorderToQRCode(qrCanvas, borderSize) {
        const originalSize = qrCanvas.width;
        const newSize = originalSize + 2 * borderSize;

        const borderedCanvas = document.createElement("canvas");
        const ctx = borderedCanvas.getContext("2d");

        borderedCanvas.width = newSize;
        borderedCanvas.height = newSize;

        // Preenche o fundo com branco
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, newSize, newSize);

        // Desenha o QR Code original no centro
        ctx.drawImage(qrCanvas, borderSize, borderSize);

        return borderedCanvas;
    }
});
