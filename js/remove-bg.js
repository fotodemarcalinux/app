let selectedColor = '#C1FF72';

document.getElementById('color1').addEventListener('click', () => selectColor('#C1FF72', 'color1'));
document.getElementById('color2').addEventListener('click', () => selectColor('#D9D9D9', 'color2'));
document.getElementById('color3').addEventListener('click', () => selectColor('#C2B997', 'color3'));
document.getElementById('imageUpload').addEventListener('change', processImage);

function selectColor(color, id) {
    selectedColor = color;
    document.querySelectorAll('.color-circle').forEach(circle => {
        circle.classList.remove('selected');
    });
    document.getElementById(id).classList.add('selected');
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function processImage() {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput.files.length === 0) {
        alert("Por favor, selecione uma imagem primeiro.");
        return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(fileInput.files[0]);
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const colorsToRemove = ['#C1FF72', '#D9D9D9', '#C2B997'].map(hexToRgb);

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];

            if (colorsToRemove.some(color => color.r === r && color.g === g && color.b === b)) {
                data[i + 3] = 0; // Torna transparente
            }
        }

        ctx.putImageData(imageData, 0, 0);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
        resultDiv.appendChild(canvas);

        const downloadLink = document.createElement('a');
        const now = new Date();
        const timeStr = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
        downloadLink.href = canvas.toDataURL();
        downloadLink.download = `FestaNBrHMS_${timeStr}.png`;
        downloadLink.textContent = 'Download PNG';
        downloadLink.classList.add('download-link');

        resultDiv.appendChild(downloadLink);
    };
}
