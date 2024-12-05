document.addEventListener("DOMContentLoaded", () => {
    // Inputs do Título
    const titleFontSizeInput = document.getElementById("title-font-size");
    const titleInput = document.getElementById("event-title");
    const dynamicTitle = document.getElementById("dynamic-title");
    const titleFontSelector = document.getElementById("title-font-selector");
    const titleFontColorPicker = document.getElementById("title-font-color");
    const titleFontColorPreview = document.getElementById("title-font-color-preview");

    // Inputs do Subtítulo
    const subtitleFontSizeInput = document.getElementById("subtitle-font-size");
    const subtitleInput = document.getElementById("event-subtitle");
    const dynamicSubtitle = document.getElementById("dynamic-subtitle");
    const subtitleFontSelector = document.getElementById("subtitle-font-selector");
    const subtitleFontColorPicker = document.getElementById("subtitle-font-color");
    const subtitleFontColorPreview = document.getElementById("subtitle-font-color-preview");

    // Inputs da Data
    const dateFontSizeInput = document.getElementById("date-font-size");
    const dateInput = document.getElementById("event-date");
    const toggleDateCheckbox = document.getElementById("toggle-date");
    const dynamicDate = document.getElementById("dynamic-date");
    const dateFontSelector = document.getElementById("date-font-selector");
    const dateFontColorPicker = document.getElementById("date-font-color");
    const dateFontColorPreview = document.getElementById("date-font-color-preview");

    // Atualizar Título
    titleInput.addEventListener("input", () => {
        if (titleInput.value.trim() === "") {
            dynamicTitle.style.display = "none"; // Esconde o título
        } else {
            dynamicTitle.style.display = "block"; // Mostra o título
            dynamicTitle.textContent = titleInput.value;
        }
    });
    titleFontSizeInput.addEventListener("input", () => {
        dynamicTitle.style.fontSize = `${titleFontSizeInput.value}px`;
    });
    titleFontSelector.addEventListener("change", () => {
        dynamicTitle.style.fontFamily = titleFontSelector.value;
    });
    titleFontColorPicker.addEventListener("input", () => {
        const selectedColor = titleFontColorPicker.value;
        dynamicTitle.style.color = selectedColor;
        titleFontColorPreview.style.backgroundColor = selectedColor;
    });
    titleFontColorPreview.addEventListener("click", () => {
        titleFontColorPicker.click();
    });

    // Atualizar Subtítulo
    subtitleInput.addEventListener("input", () => {
        if (subtitleInput.value.trim() === "") {
            dynamicSubtitle.style.display = "none"; // Esconde o subtítulo
        } else {
            dynamicSubtitle.style.display = "block"; // Mostra o subtítulo
            dynamicSubtitle.textContent = subtitleInput.value;
        }
    });
    subtitleFontSizeInput.addEventListener("input", () => {
        dynamicSubtitle.style.fontSize = `${subtitleFontSizeInput.value}px`;
    });
    subtitleFontSelector.addEventListener("change", () => {
        dynamicSubtitle.style.fontFamily = subtitleFontSelector.value;
    });
    subtitleFontColorPicker.addEventListener("input", () => {
        const selectedColor = subtitleFontColorPicker.value;
        dynamicSubtitle.style.color = selectedColor;
        subtitleFontColorPreview.style.backgroundColor = selectedColor;
    });
    subtitleFontColorPreview.addEventListener("click", () => {
        subtitleFontColorPicker.click();
    });

    // Atualizar Data
    dateInput.addEventListener("change", () => {
        if (dateInput.value.trim() === "" || !toggleDateCheckbox.checked) {
            dynamicDate.style.display = "none"; // Esconde a data
        } else {
            dynamicDate.style.display = "block"; // Mostra a data
            const dateParts = dateInput.value.split("-");
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1;
            const day = parseInt(dateParts[2], 10);
            const dateValue = new Date(year, month, day);
            const formattedDate = dateValue.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
            dynamicDate.textContent = formattedDate;
        }
    });
    // Controle para Exibir/Ocultar Data
    toggleDateCheckbox.addEventListener("change", () => {
        if (toggleDateCheckbox.checked && dateInput.value.trim() !== "") {
            dynamicDate.style.display = "block"; // Mostra a data
        } else {
            dynamicDate.style.display = "none"; // Esconde a data
        }
    });   
    dateFontSizeInput.addEventListener("input", () => {
        dynamicDate.style.fontSize = `${dateFontSizeInput.value}px`;
    });
    dateFontSelector.addEventListener("change", () => {
        dynamicDate.style.fontFamily = dateFontSelector.value;
    });
    dateFontColorPicker.addEventListener("input", () => {
        const selectedColor = dateFontColorPicker.value;
        dynamicDate.style.color = selectedColor;
        dateFontColorPreview.style.backgroundColor = selectedColor;
    });
    dateFontColorPreview.addEventListener("click", () => {
        dateFontColorPicker.click();
    });

    // Inicialização com valores padrão
    dynamicTitle.style.fontSize = `${titleFontSizeInput.value}px`;
    dynamicTitle.style.fontFamily = titleFontSelector.value;
    dynamicTitle.style.color = titleFontColorPicker.value;
    titleFontColorPreview.style.backgroundColor = titleFontColorPicker.value;

    dynamicSubtitle.style.fontSize = `${subtitleFontSizeInput.value}px`;
    dynamicSubtitle.style.fontFamily = subtitleFontSelector.value;
    dynamicSubtitle.style.color = subtitleFontColorPicker.value;
    subtitleFontColorPreview.style.backgroundColor = subtitleFontColorPicker.value;

    dynamicDate.style.fontSize = `${dateFontSizeInput.value}px`;
    dynamicDate.style.fontFamily = dateFontSelector.value;
    dynamicDate.style.color = dateFontColorPicker.value;
    dateFontColorPreview.style.backgroundColor = dateFontColorPicker.value;

    dynamicTitle.textContent = titleInput.value;
    dynamicSubtitle.textContent = subtitleInput.value;
    dynamicDate.style.display =
        dateInput.value.trim() === "" || !toggleDateCheckbox.checked ? "none" : "block";
});
