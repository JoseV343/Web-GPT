const audio = document.getElementById("audio");
const letraSpans = document.querySelectorAll("#letra span");
const letraContainer = document.getElementById("letra");

let currentScrollIndex = 0;

audio.addEventListener("timeupdate", () => {
    let tiempoActual = audio.currentTime;

    // Reiniciamos todas las líneas
    letraSpans.forEach(span => span.classList.remove("active"));

    // Encontramos la línea que debe estar activa
    let activeIndex = -1;
    letraSpans.forEach((span, index) => {
        let inicio = parseFloat(span.getAttribute("data-inicio"));
        if (tiempoActual >= inicio) {
            activeIndex = index;
        }
    });

    // Si se ha encontrado una nueva sección de 3 líneas para hacer scroll
    if (activeIndex >= 0 && activeIndex >= currentScrollIndex + 3) {
        currentScrollIndex = Math.floor(activeIndex / 3) * 3;
        letraContainer.scrollTop = letraSpans[currentScrollIndex].offsetTop - letraContainer.offsetTop - 10; // Desplazamos hacia el bloque
    }

    // Activamos las líneas correspondientes
    letraSpans.forEach((span, index) => {
        if (index >= currentScrollIndex && index < currentScrollIndex + 3) {
            span.classList.add("active");
        }
    });
});

// Restablecer el scroll y las clases al final del audio
audio.addEventListener("ended", () => {
    currentScrollIndex = 0;
    letraContainer.scrollTop = 0; // Volver al principio
    letraSpans.forEach(span => span.classList.remove("active")); // Eliminar la clase 'active' de todas las líneas
});
