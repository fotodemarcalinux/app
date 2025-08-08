// Decodifica o nome da marca d'água em Base64
const watermarkText = atob("Rm90byBkZSBNYXJjYQ==");

function updateFileCount() {
    const fileInput = document.getElementById('upload');
    const fileCount = document.getElementById('fileCount');
    fileCount.textContent = `${fileInput.files.length} arquivos selecionados`;
}

function previewFirstImage() {
    const fileInput = document.getElementById('upload');
    const previewImage = document.getElementById('previewImage');

    if (fileInput.files.length > 0) {
        const firstFile = fileInput.files[0];
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Redimensiona a imagem para 900x900 mantendo a proporção
            const maxSize = 900;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                height = (height * maxSize) / width;
                width = maxSize;
            } else {
                width = (width * maxSize) / height;
                height = maxSize;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Adiciona a marca d'água com 35% de opacidade
            ctx.font = "23px Arial";
            ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const watermarkSpacing = 150;
            for (let y = -50; y < height + 50; y += watermarkSpacing) {
                for (let x = -50; x < width + 50; x += watermarkSpacing) {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(-Math.PI / 4);
                    ctx.fillText(watermarkText, 0, 0);
                    ctx.restore();
                }
            }

            const fileName = firstFile.name.replace(/.[^/.]+$/, "");
            ctx.font = "24px Arial";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";

            ctx.strokeText(fileName, width - 10, height - 10);
            ctx.fillText(fileName, width - 10, height - 10);

            previewImage.src = canvas.toDataURL("image/jpeg", 0.95);
            previewImage.style.display = "block";
        };

        img.src = URL.createObjectURL(firstFile);
    }
}

function processImages() {
    const fileInput = document.getElementById('upload');

    if (fileInput.files.length === 0) {
        alert("Por favor, selecione pelo menos uma imagem.");
        return;
    }

    const files = Array.from(fileInput.files);
    files.forEach((file) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const maxSize = 900;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                height = (height * maxSize) / width;
                width = maxSize;
            } else {
                width = (width * maxSize) / height;
                height = maxSize;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            ctx.font = "23px Arial";
            ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const watermarkSpacing = 150;
            for (let y = -50; y < height + 50; y += watermarkSpacing) {
                for (let x = -50; x < width + 50; x += watermarkSpacing) {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(-Math.PI / 4);
                    ctx.fillText(watermarkText, 0, 0);
                    ctx.restore();
                }
            }

            const fileName = file.name.replace(/.[^/.]+$/, "");
            ctx.font = "24px Arial";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";

            ctx.strokeText(fileName, width - 10, height - 10);
            ctx.fillText(fileName, width - 10, height - 10);

            const outputDataUrl = canvas.toDataURL("image/jpeg", 0.95);

            const link = document.createElement('a');
            link.href = outputDataUrl;
            link.download = file.name;
            link.click();
        };

        img.src = URL.createObjectURL(file);
    });
}
