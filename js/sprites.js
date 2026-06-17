// --- CONFIGURACIÓN ---
const canvasIzq = document.getElementById('canvas-izquierdo');
const canvasDer = document.getElementById('canvas-derecho');
const titulo = document.getElementById('main-title');
const ctxIzq = canvasIzq.getContext('2d');
const ctxDer = canvasDer.getContext('2d');

const totalSprites = 165;
const spriteArray = [];
let currentFrame = 0;
const fps = 30;

ctxIzq.imageSmoothingEnabled = false;
ctxDer.imageSmoothingEnabled = false;

// --- 1. PRECARGA ---
async function preloadSprites() {
    for (let i = 1; i <= totalSprites; i++) {
        const num = i.toString().padStart(4, '0');
        const img = new Image();
        img.src = `assets/sprites/heros/snake/${num}.png`;
        spriteArray.push(img);
    }
    await Promise.all(spriteArray.map(img => new Promise(r => img.onload = r)));
    requestAnimationFrame(animate);
}

// --- 2. BUCLE ANIMACIÓN ---
function animate() {
    ctxIzq.clearRect(0, 0, canvasIzq.width, canvasIzq.height);
    ctxDer.clearRect(0, 0, canvasDer.width, canvasDer.height);

    const img = spriteArray[currentFrame];
    if (img && img.complete) {
        ctxIzq.drawImage(img, 0, 0, 1024, 1024);
        ctxDer.drawImage(img, 0, 0, 1024, 1024);
    }

    currentFrame = (currentFrame + 1) % totalSprites;
    setTimeout(() => requestAnimationFrame(animate), 1000 / fps);
}

// --- 3. LÓGICA DE SCROLL ---
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Ajusta este límite según cuánto quieras que tarde la animación (en px)
    const scrollLimit = 1200; 
    const progress = Math.min(scrollY / scrollLimit, 1);

    // MOVIMIENTO CANVAS
    const targetY = (window.innerHeight / 2) - 250;
    
    // Izquierdo: Baja al centro-izquierdo
    const izqY = progress * targetY;
    canvasIzq.style.transform = `translate(0px, ${izqY}px)`;
    
    // Derecho: Sube al centro-derecho
    const startRightY = window.innerHeight - 500;
    const derY = startRightY - (progress * (startRightY - targetY));
    canvasDer.style.transform = `translate(0px, ${derY}px)`;

    // DESVANECIMIENTOS (Escalonados)
    // Canvas desaparecen entre el 70% y 90% del scroll
    const canvasOpacity = progress > 0.7 ? Math.max(0, 1 - (progress - 0.7) / 0.2) : 1;
    canvasIzq.style.opacity = canvasOpacity;
    canvasDer.style.opacity = canvasOpacity;

    // Título desaparece al final (del 80% al 100%)
    const titleOpacity = progress > 0.8 ? Math.max(0, 1 - (progress - 0.8) / 0.2) : 1;
    titulo.style.opacity = titleOpacity;
    
    // Cambiar fondo cuando el título se desvanece
    if (titleOpacity <= 0) {
        document.body.style.backgroundColor = "#000";
    } else {
        document.body.style.backgroundColor = "#0a0a0c"; // Tu color original
    }
});

preloadSprites();