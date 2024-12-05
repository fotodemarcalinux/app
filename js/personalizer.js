document.addEventListener("DOMContentLoaded", async () => {
    const imageInput = document.getElementById('images');
    const watermarkInput = document.getElementById('watermark');
    const progressView = document.getElementById('progressView');
    const imagesPreviewText = document.getElementById('imagesPreviewText');
    const watermarkPreviewText = document.getElementById('watermarkPreviewText');

    const nativeWatermarkPath = 'native_watermark.webp';
    let nativeWatermark;

    // Função para carregar imagens
    const loadImage = (url) => new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Erro ao carregar imagem: ${url}`));
        img.src = url;
    });

    // Pré-carregar a marca d'água nativa
    try {
        nativeWatermark = await loadImage(nativeWatermarkPath);
    } catch (error) {
        console.error(`Erro ao carregar a marca d'água nativa: ${error.message}`);
        progressView.innerHTML = `<p>Erro ao carregar a marca d'água nativa: ${error.message}</p>`;
        return;
    }

    // Atualizar o texto de pré-visualização
    const updatePreviewText = (input, previewText, type) => {
        const fileCount = input.files.length;
        previewText.textContent = fileCount > 0
            ? `${fileCount} ${type}(s) selecionada(s)`
            : `Nenhuma ${type} escolhida`;
    };

    // Processar imagem
    const processImage = (image, nativeWatermark, userWatermark) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const targetWidth = 1984;
        const targetHeight = 1100;
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const [newWidth, newHeight] = image.width / image.height > targetWidth / targetHeight
            ? [image.width / (image.height / targetHeight), targetHeight]
            : [targetWidth, image.height / (image.width / targetWidth)];
        const offsetX = (targetWidth - newWidth) / 2;
        const offsetY = (targetHeight - newHeight) / 2;

        ctx.drawImage(image, offsetX, offsetY, newWidth, newHeight);
        ctx.drawImage(userWatermark, (targetWidth - userWatermark.width) / 2, targetHeight - userWatermark.height);
        ctx.drawImage(nativeWatermark, (targetWidth - nativeWatermark.width) / 2, (targetHeight - nativeWatermark.height) / 2);

        return canvas;
    };

    // Mostrar pré-visualização das imagens
    const showImagePreviews = async () => {
        progressView.innerHTML = ''; // Limpa o conteúdo atual do `progressView`

        if (imageInput.files.length === 0 || watermarkInput.files.length === 0) {
            progressView.innerHTML = '<p>Selecione imagens e uma moldura para pré-visualização.</p>';
            return;
        }

        try {
            const imageFile = imageInput.files[0];
            const watermarkFile = watermarkInput.files[0];

            const image = await loadImage(URL.createObjectURL(imageFile));
            const userWatermark = await loadImage(URL.createObjectURL(watermarkFile));
            const previewCanvas = processImage(image, nativeWatermark, userWatermark);

            const imgElement = document.createElement('img');
            imgElement.src = previewCanvas.toDataURL('image/jpeg', 0.8);
            imgElement.style.maxWidth = '100%';
            imgElement.style.height = 'auto';
            imgElement.style.margin = '10px auto';
            imgElement.style.display = 'block';

            progressView.appendChild(imgElement);
        } catch (error) {
            console.error(`Erro ao gerar pré-visualização: ${error.message}`);
            progressView.innerHTML = `<p>Erro ao gerar pré-visualização: ${error.message}</p>`;
        }
    };

    // Atualizar texto ao selecionar imagens
    imageInput.addEventListener('change', () => {
        updatePreviewText(imageInput, imagesPreviewText, 'foto');
        showImagePreviews();
    });

    // Atualizar texto ao selecionar moldura
    watermarkInput.addEventListener('change', () => {
        updatePreviewText(watermarkInput, watermarkPreviewText, 'moldura');
        showImagePreviews();
    });

    // Processar e baixar imagens
    document.getElementById('convertButton').addEventListener('click', async () => {
        const images = imageInput.files;
        const watermarkFile = watermarkInput.files[0];

        if (images.length === 0 || !watermarkFile) {
            alert('Por favor, selecione fotos e uma moldura.');
            return;
        }

        try {
            const userWatermark = await loadImage(URL.createObjectURL(watermarkFile));

            for (const file of images) {
                const image = await loadImage(URL.createObjectURL(file));
                const processedCanvas = processImage(image, nativeWatermark, userWatermark);

                const link = document.createElement('a');
                link.href = processedCanvas.toDataURL('image/jpeg', 0.8);
                link.download = `Festa_Net_Brasil_${Date.now()}.jpg`;
                link.click();
            }

            // Exibe mensagem de conclusão no popup
            alert('Processamento e download finalizados!');
        } catch (error) {
            console.error(`Erro ao processar as imagens: ${error.message}`);
            alert(`Erro ao processar as imagens: ${error.message}`);
        }
    });
});
