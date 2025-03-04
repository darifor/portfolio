import '../sass/style.scss'

// Efecto presentación hero

const texts = [
  "Desarrollador Front-End...",
  "Desarrollador Back-End...",
  "¡Desarrollador Full-Stack!",
];
const typingSpeed = 100; // Velocidad de escritura (ms)
const erasingSpeed = 50; // Velocidad de borrado (ms)
const delayBetweenTexts = 1500; // Pausa entre textos (ms)

let currentTextIndex = 0; // Índice del texto actual
let charIndex = 0; // Índice del carácter actual
const textElement = document.getElementById("text");

function typeText() {
  if (charIndex < texts[currentTextIndex].length) {
    // Añade una letra al texto
    textElement.textContent += texts[currentTextIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed); // Llama a la función nuevamente
  } else {
    // Pausa antes de borrar
    setTimeout(eraseText, delayBetweenTexts);
  }
}

function eraseText() {
  if (charIndex > 0) {
    // Elimina una letra del texto
    textElement.textContent = texts[currentTextIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(eraseText, erasingSpeed); // Llama a la función nuevamente
  } else {
    // Cambia al siguiente texto
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    setTimeout(typeText, typingSpeed);
  }
}

// Inicia la animación
typeText();

// Menú responsive
let menuIcon = document.getElementById("responsive");
let xmark = document.getElementById("xmark");
let bars = document.getElementById("bars");
let enlaces = document.getElementById("full-menu");

if (menuIcon && enlaces && xmark && bars) {
  menuIcon.addEventListener('click', () => {
    enlaces.classList.toggle('show');
    xmark.classList.toggle('show');
    bars.classList.toggle('hidden');
  });
} else {
  console.error("No se encontraron los elementos con IDs 'responsive' o 'main-menu'");
}

// Formulario
let formulario = document.forms[0];

formulario.addEventListener("submit", (event) => {
  // Mostrar un mensaje de confirmación
  alert('Gracias por tu mensaje. Contactaré contigo a la mayor brevedad posible.');
})

// Traducción sitio
let enlacesEn = document.getElementsByClassName("enlace-en");
let enlacesES = document.getElementsByClassName("enlace-es");
let elementosTraducibles = document.querySelectorAll("[data-en]");
let contenidoOriginal = new Map();

for (let elemento of elementosTraducibles) {
  contenidoOriginal.set(elemento, elemento.innerHTML);
  if (elemento.tagName === "INPUT" && elemento.type === "submit") {
    contenidoOriginal.set(elemento, elemento.value);
  }
  if (elemento.tagName === "INPUT" && elemento.name === "name") {
    contenidoOriginal.set(elemento, elemento.placeholder);
  }
  if (elemento.tagName === "TEXTAREA") {
    contenidoOriginal.set(elemento, elemento.placeholder);
  }

}

for (let enlace of enlacesEn) {
  enlace.addEventListener("click", (event) => {
    event.preventDefault();
    for (let item of elementosTraducibles) {
      const traduccion = item.dataset.en;
      item.innerHTML = traduccion;
      if (item.tagName === "INPUT" && item.type === "submit") {
        item.value = item.dataset.en;
      }
      if (item.tagName === "INPUT" && item.name === "name") {
        item.placeholder = item.dataset.en;
      }
      if (item.tagName === "TEXTAREA") {
        item.placeholder = item.dataset.en;
      }
    }
  });
}

for (let enlace of enlacesES) {
  enlace.addEventListener("click", (event) => {
    event.preventDefault();
    for (let elemento of elementosTraducibles) {
      const original = contenidoOriginal.get(elemento);
      elemento.innerHTML = original;
      if (elemento.tagName === "INPUT" && elemento.type === "submit") {
        elemento.value = original;
      }
      if (elemento.tagName === "INPUT" && elemento.name === "name") {
        elemento.placeholder = original;
      }
      if (elemento.tagName === "TEXTAREA") {
        elemento.placeholder = original;
      }
    }
  })
}
