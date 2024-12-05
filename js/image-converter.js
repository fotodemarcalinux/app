document.getElementById('upload').addEventListener('change', function (event) {
    const files = event.target.files;
    if (files.length === 0) return;

    const status = document.getElementById('status');
    status.textContent = 'Convertendo arquivos...';

    Array.from(files).forEach(file => {
        if (file.type !== 'image/png') {
            status.textContent = 'Por favor, selecione apenas arquivos PNG.';
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Gerar nome único baseado no horário
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
                const filename = `fa_${hours}${minutes}${seconds}${milliseconds}.webp`;

                canvas.toBlob(function (blob) {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = filename;
                    link.click();
                }, 'image/webp', 0.8);  // Compressão com qualidade de 80%
            };
        };
        reader.readAsDataURL(file);
    });

    status.textContent = 'Conversão concluída!';
});