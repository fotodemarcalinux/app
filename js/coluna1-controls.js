document.addEventListener("DOMContentLoaded", () => {
    // Inputs de controle de fundo
    const solidColorInput = document.getElementById("solid-color");
    const gradientStartInput = document.getElementById("gradient-start");
    const gradientEndInput = document.getElementById("gradient-end");
    const uploadImageInput = document.getElementById("upload-image");
    const uploadNativeImageInput = document.getElementById("upload-native-image"); // Novo input para imagem da moldura

    // Previews de cores e imagens
    const solidColorPreview = document.getElementById("solid-color-preview");
    const gradientStartPreview = document.getElementById("gradient-start-preview");
    const gradientEndPreview = document.getElementById("gradient-end-preview");
    const imagePreview = document.getElementById("image-preview");
    const nativeImagePreview = document.getElementById("native-image-preview"); // Novo preview para a moldura dinâmica

    // Elementos dinâmicos
    const dynamicMoldura = document.getElementById("dynamic-moldura");
    const nativeImageElement = document.getElementById("native-image"); // Elemento da imagem da moldura
    const nativeImageContainer = document.querySelector(".native-image-container"); // Container da imagem da moldura
    const toggleNativeImageCheckbox = document.getElementById("toggle-native-image"); // Checkbox para alternar visibilidade

    // Ativar seleção de cor sólida ao clicar no preview
    solidColorPreview.addEventListener("click", () => {
        solidColorInput.click();
    });

    // Atualizar cor sólida ao selecionar uma nova cor
    solidColorInput.addEventListener("input", () => {
        solidColorPreview.style.backgroundColor = solidColorInput.value;
        dynamicMoldura.style.background = solidColorInput.value;
    });

    // Ativar seleção de gradiente início ao clicar no preview
    gradientStartPreview.addEventListener("click", () => {
        gradientStartInput.click();
    });

    // Atualizar gradiente início
    gradientStartInput.addEventListener("input", () => {
        gradientStartPreview.style.backgroundColor = gradientStartInput.value;
        updateGradient();
    });

    // Ativar seleção de gradiente fim ao clicar no preview
    gradientEndPreview.addEventListener("click", () => {
        gradientEndInput.click();
    });

    // Atualizar gradiente fim
    gradientEndInput.addEventListener("input", () => {
        gradientEndPreview.style.backgroundColor = gradientEndInput.value;
        updateGradient();
    });

    // Atualizar gradiente na moldura
    function updateGradient() {
        dynamicMoldura.style.background = `linear-gradient(90deg, ${gradientStartInput.value}, ${gradientEndInput.value})`;
    }

    // Ativar upload de imagem ao clicar no preview
    imagePreview.addEventListener("click", () => {
        uploadImageInput.click();
    });

    // Aplicar imagem ao fundo
    uploadImageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                dynamicMoldura.style.background = `url(${e.target.result}) center/cover no-repeat`;
                imagePreview.style.background = `url(${e.target.result}) center/cover no-repeat`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Ativar upload de imagem da moldura ao clicar no preview
    nativeImagePreview.addEventListener("click", () => {
        uploadNativeImageInput.click();
    });

    // Substituir imagem da moldura
    uploadNativeImageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImageSrc = e.target.result;
                nativeImageElement.src = newImageSrc; // Atualiza a imagem da moldura
                nativeImagePreview.style.backgroundImage = `url(${e.target.result})`; // Atualiza o preview
            };
            reader.readAsDataURL(file);
        }
    });

    // Alternar visibilidade da imagem da moldura
    toggleNativeImageCheckbox.addEventListener("change", () => {
        if (toggleNativeImageCheckbox.checked) {
            nativeImageContainer.classList.remove("hidden");
        } else {
            nativeImageContainer.classList.add("hidden");
        }
    });

    // Inicialização com valores padrão
    solidColorPreview.style.backgroundColor = solidColorInput.value;
    gradientStartPreview.style.backgroundColor = gradientStartInput.value;
    gradientEndPreview.style.backgroundColor = gradientEndInput.value;
    dynamicMoldura.style.background = `linear-gradient(90deg, ${gradientStartInput.value}, ${gradientEndInput.value})`; // Inicializa com gradiente padrão
    nativeImagePreview.style.backgroundImage = `url('moldura.webp')`; // Inicializa com a imagem padrão
    nativeImageContainer.classList.remove("hidden"); // Garante que a imagem está visível por padrão
});