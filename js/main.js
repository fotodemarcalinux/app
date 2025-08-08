document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById('images');
    const progressView = document.getElementById('progressView');

    // Exibe pré-visualização assim que o usuário seleciona uma imagem
    imageInput.addEventListener('change', async function() {
        const images = imageInput.files;

        if (images.length > 0) {
            const previewText = document.getElementById('imagesPreviewText');
            previewText.textContent = `${images.length} foto(s) selecionada(s)`;

            const userWatermark = await loadImage(userWatermarkUrl);
            const nativeWatermark = await loadImage(nativeWatermarkUrl);

            progressView.innerHTML = '';  // Limpar visualização anterior

            // Processar e exibir apenas a primeira imagem selecionada
            const imageUrl = URL.createObjectURL(images[0]);
            const image = await loadImage(imageUrl);

            const previewCanvas = processImage(image, nativeWatermark, userWatermark);

            const imgElement = document.createElement('img');
            imgElement.src = previewCanvas.toDataURL('image/jpeg', 0.8);
            imgElement.style.maxWidth = '100%';
            imgElement.style.height = 'auto';
            imgElement.style.display = 'block';
            imgElement.style.margin = '0 auto';
            progressView.appendChild(imgElement);

            URL.revokeObjectURL(imageUrl);
        } else {
            progressView.innerHTML = '<p>Nenhuma foto selecionada.</p>';
        }
    });

    // Listener para o botão de conversão
    document.getElementById('convertButton').addEventListener('click', async () => {
        const images = imageInput.files;

        if (images.length === 0) {
            alert('Por favor, selecione fotos.');
            return;
        }

        const userWatermark = await loadImage(userWatermarkUrl);
        const nativeWatermark = await loadImage(nativeWatermarkUrl);
        progressView.innerHTML = '';  // Limpar visualização anterior

        // Itera sobre as imagens para download, mas exibe apenas a primeira no `progressView`
        for (let i = 0; i < images.length; i++) {
            const imageFile = images[i];
            const imageUrl = URL.createObjectURL(imageFile);
            const image = await loadImage(imageUrl);

            const processedImage = processImage(image, nativeWatermark, userWatermark);

            const currentTime = new Date();
            const timeString = `${currentTime.getHours()}${currentTime.getMinutes()}${currentTime.getSeconds()}${currentTime.getMilliseconds()}`;
            const link = document.createElement('a');
            link.href = processedImage.toDataURL('image/jpeg', 0.8);
            link.download = `Festa_Net_Brasil_${timeString}.jpg`;
            link.click();

            // Exibir apenas a primeira imagem processada no `progressView`
            if (i === 0) {
                const imgElement = document.createElement('img');
                imgElement.src = link.href;
                imgElement.style.maxWidth = '100%';
                imgElement.style.height = 'auto';
                imgElement.style.display = 'block';
                imgElement.style.margin = '0 auto';
                progressView.appendChild(imgElement);
            }

            URL.revokeObjectURL(imageUrl);
        }
    });

    // Função para carregar imagens
    function loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    // Função para processar a imagem e aplicar as molduras
    function processImage(image, nativeWatermark, userWatermark) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const targetWidth = 1984;
        const targetHeight = 1100;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const originalAspect = image.width / image.height;
        const targetAspect = targetWidth / targetHeight;
        let newWidth, newHeight;

        if (originalAspect > targetAspect) {
            newHeight = targetHeight;
            newWidth = image.width / (image.height / targetHeight);
        } else {
            newWidth = targetWidth;
            newHeight = image.height / (image.width / targetWidth);
        }

        const offsetX = (targetWidth - newWidth) / 2;
        const offsetY = (targetHeight - newHeight) / 2;

        ctx.drawImage(image, offsetX, offsetY, newWidth, newHeight);

        const userWatermarkX = (targetWidth - userWatermark.width) / 2;
        const userWatermarkY = targetHeight - userWatermark.height;
        ctx.drawImage(userWatermark, userWatermarkX, userWatermarkY);

        const nativeWatermarkX = (targetWidth - nativeWatermark.width) / 2;
        const nativeWatermarkY = (targetHeight - nativeWatermark.height) / 2;
        ctx.drawImage(nativeWatermark, nativeWatermarkX, nativeWatermarkY);

        return canvas;
    }

    // Função para copiar a mensagem de compartilhamento
    const copyButton = document.getElementById("copyMessageButton");
    const shareMessageContainer = document.querySelector(".share-message");

    if (copyButton) {
        copyButton.addEventListener("click", function() {
            // Seleciona apenas o texto dos parágrafos específicos e ignora o botão de cópia
            const paragraphs = shareMessageContainer.querySelectorAll("p");
            const shareText = Array.from(paragraphs)
                .map(p => p.innerText)
                .join("\n"); // Coleta e junta o texto dos parágrafos desejados

            navigator.clipboard.writeText(shareText)
                .then(() => {
                    alert("Mensagem copiada para a área de transferência!");
                })
                .catch(err => {
                    console.error("Erro ao copiar mensagem: ", err);
                });
        });
    }

    // Listener para o botão de publicação (se o link for configurado)
    const publishButton = document.querySelector(".btn-publicar");
    if (publishButton) {
        publishButton.addEventListener("click", () => {
            alert("Você será redirecionado para publicar no Festa Net Brasil!");
        });
    }
});
