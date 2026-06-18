const characters = {
    iceboss: {
        name: "Kyros",
        title: "Guardián de los Páramos Helados",
        desc: "Es una aberración de cuatro brazos tallada en la roca viva del Colmillo, el pico más inclemente y helado del mundo conocido. Su trágica condena comenzó cuando, cegado por el fanatismo, obligó a todos sus devotos seguidores a emprender una peregrinación mortal hacia la cumbre en busca de una falsa salvación. Todos perecieron en la nieve. Como castigo por su herejía y la sangre derramada en el hielo, la antigua y oscura entidad conocida como la Raíz del Hielo lo reclamó. Su humanidad fue despojada y su cuerpo, deformado y corrompido, se convirtió en el recipiente viviente de esta magia glacial. Ahora es un coloso implacable de fuerza monstruosa; se dice que su sola presencia emite un frío tan sepulcral que es capaz de congelar la sangre en las venas de los guerreros más valientes antes de que siquiera puedan desenvainar sus espadas.",
        hasSprite: true,
        spriteFolder: "assets/sprites/ICEBOSS/",
        frameCount: 100 
    },
    flowergirl: {
        name: "Fiora",
        title: "Espinas del Jardín Corrupto",
        desc: "Convertida en una heroína de la naturaleza, empuña la Guadaña del Letargo, un arma formidable forjada de enredaderas irrompibles y hojas cortantes como el acero. En el fragor de la batalla, su danza es un milagro y una condena: con cada barrido de su arma, esparce esporas luminosas que tejen magia curativa sobre sus aliados caídos. Pero para sus enemigos, el filo de su guadaña libera un denso y místico polen que nubla los sentidos, sumiendo a las bestias en un sueño antinatural y profundo del que rara vez despiertan.",
        hasSprite: true,
        spriteFolder: "assets/sprites/flowerGirl/",
        frameCount: 165
    },
    icegirl: {
        name: "Maeve",
        title: "Tempestad Inmisericorde",
        desc: "Fue la esposa de Kyros, el hombre que condenó a su pueblo antes de convertirse en el monstruoso Tirano de Escarcha. Cuando Kyros sucumbió ante la voluntad de la Raíz del Hielo, una violenta ráfaga de magia residual golpeó a Isolde, dejándola moribunda. Sin embargo, su agonía no fue provocada por el frío, sino por la traición y la pérdida. En lugar de matarla, los fragmentos corruptos de ese poder glacial se enraizaron en su corazón roto, alimentándose de su dolor. Ahora, con el alma congelada y los ojos vueltos del color del hielo antiguo, Isolde camina por las tierras baldías del norte con un único propósito. Ha aprendido a dominar los retazos de la magia de su exesposo, manifestando una ventisca implacable que obedece a su voluntad. No busca la salvación ni el perdón; ha jurado ante los antiguos dioses que utilizará la misma fuerza maldita que destruyó a su hombre para dar caza y ejecutar a la abominación en la que se ha convertido.",
        hasSprite: true,
        spriteFolder: "assets/sprites/iceGirl/", 
        frameCount: 165
    },
    snakeboy: {
        name: "Viper",
        title: "El Colmillo Sombrío",
        desc: "El día que la Gran Víbora de las Ciénagas —la encarnación viviente de la Raíz del Veneno— le hundió los colmillos en el cuello. Lo que debió ser una muerte lenta y agónica se convirtió en una transformación atroz. El veneno que recorrió sus venas no lo mató; en su lugar, se fundió con su esencia, otorgándole una inmunidad antinatural a cualquier toxina conocida y la capacidad de secretar veneno letal desde sus propios poros",
        hasSprite: true,
        spriteFolder: "assets/sprites/snakeBoy/", 
        frameCount: 165
    },
    desconocido1: {
        name: "Entidad Desconocida I",
        title: "Ecos del Abismo",
        desc: "Los registros de este campeón aún no han sido descifrados. La energía latente sugiere una llegada inminente.",
        hasSprite: false
    },
    desconocido2: {
        name: "Entidad Desconocida II",
        title: "Sombra Latente",
        desc: "Una figura difusa en los cristales de adivinación. Estará disponible en futuras actualizaciones del roster.",
        hasSprite: false
    },
    desconocido3: {
        name: "Entidad Desconocida III",
        title: "Caos Incipiente",
        desc: "La barrera dimensional se debilita. Pronto este héroe reclamará su lugar en la arena de heroVsBoss.",
        hasSprite: false
    },
    desconocido4: {
        name: "Entidad Desconocida IV",
        title: "Vestigio Olvidado",
        desc: "Datos corruptos detectados. Nuestros magos están restaurando el código fuente de este personaje.",
        hasSprite: false
    },
    desconocido5: {
        name: "Entidad Desconocida V",
        title: "El Último Sello",
        desc: "La identidad de este contendiente permanece sellada en las catacumbas. Próximamente.",
        hasSprite: false
    }
};

const preloadedSprites = {}; 
let totalImagesToLoad = 1; 
let imagesLoaded = 0;

const canvas = document.getElementById('spriteDisplay');
const ctx = canvas.getContext('2d');
let currentAnimFrame = 1;
let animationId = null;
let activeCharacterKey = 'iceboss';


const fps = 30;
const fpsInterval = 1000 / fps;
let then = Date.now();


function initPreloader() {
    for (const key in characters) {
        if (characters[key].hasSprite) {
            totalImagesToLoad += characters[key].frameCount;
            preloadedSprites[key] = []; 
        }
    }

    const imgTitulo = new Image();
    imgTitulo.src = "assets/img/titulo.png";
    imgTitulo.onload = imgTitulo.onerror = updateProgress;

    for (const key in characters) {
        if (characters[key].hasSprite) {
            const char = characters[key];
            for (let i = 1; i <= char.frameCount; i++) {
                const frameStr = String(i).padStart(4, '0'); 
                const imgSrc = `${char.spriteFolder}${frameStr}.png`;
                
                const img = new Image();
                img.src = imgSrc;
                preloadedSprites[key].push(img);
                
                img.onload = updateProgress;
                img.onerror = () => {
                    console.warn(`Error cargando frame: ${imgSrc}`);
                    updateProgress(); 
                };
            }
        }
    }
}

function updateProgress() {
    imagesLoaded++;
    let percentage = Math.floor((imagesLoaded / totalImagesToLoad) * 100);
    if (percentage > 100) percentage = 100;

    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').innerText = `Cargando Assets (${percentage}%)`;

    if (imagesLoaded >= totalImagesToLoad) {
        setTimeout(startExperience, 500); 
    }
}

function startExperience() {
    document.getElementById('preloader').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('preloader').style.display = 'none';
        document.body.classList.remove('loading');
        document.body.classList.add('ready');
        
        setAvatars();
        
        const canvasEl = document.getElementById('spriteDisplay');
        const placeholderEl = document.getElementById('placeholderImg');
        placeholderEl.style.display = 'none';
        canvasEl.style.display = 'block';
        
        then = Date.now(); 
        animateSprite();
    }, 800);
}


function animateSprite() {
    animationId = requestAnimationFrame(animateSprite);

    let now = Date.now();
    let elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        const charData = characters[activeCharacterKey];
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (charData && charData.hasSprite && preloadedSprites[activeCharacterKey]) {
            const spritesArray = preloadedSprites[activeCharacterKey];
            const imageToDraw = spritesArray[currentAnimFrame - 1];

            if (imageToDraw && imageToDraw.complete && imageToDraw.naturalHeight !== 0) {
                ctx.drawImage(imageToDraw, 0, 0, canvas.width, canvas.height);
            }

            currentAnimFrame++;
            if (currentAnimFrame > charData.frameCount) {
                currentAnimFrame = 1;
            }
        }
    }
}


function selectCharacter(key) {
    activeCharacterKey = key;
    currentAnimFrame = 1; 

    document.querySelectorAll('.char-selector').forEach(sel => sel.classList.remove('active'));
    event.currentTarget.classList.add('active');

    document.getElementById('charName').innerText = characters[key].name;
    document.getElementById('charTitle').innerText = characters[key].title;
    document.getElementById('charDesc').innerText = characters[key].desc;

    const canvasEl = document.getElementById('spriteDisplay');
    const placeholderEl = document.getElementById('placeholderImg');

    if (animationId) cancelAnimationFrame(animationId);

    if (characters[key].hasSprite) {
        placeholderEl.style.display = 'none';
        canvasEl.style.display = 'block';
        
        then = Date.now(); 
        animateSprite(); 
    } else {
        canvasEl.style.display = 'none';
        placeholderEl.style.display = 'block';
    }
}

function setAvatars() {
   
    ['iceboss', 'flowergirl', 'icegirl', 'snakeboy'].forEach(key => {
        if (preloadedSprites[key] && preloadedSprites[key].length > 0) {
            const avatarDiv = document.getElementById(`avatar-${key}`);
            if(avatarDiv) {
                avatarDiv.innerHTML = ''; 
                const img = document.createElement('img');
                img.src = preloadedSprites[key][0].src; 
                avatarDiv.appendChild(img);
            }
        }
    });
}


window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const heroBanner = document.getElementById('heroBanner');
    const mainInterface = document.getElementById('mainInterface');
    
    if (!document.body.classList.contains('ready')) return;

    let opacity = 1 - (scrollPos / 300);
    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;
    
    heroBanner.style.opacity = opacity;

    if (scrollPos > 250) {
        mainInterface.classList.add('visible');
    } else {
        mainInterface.classList.remove('visible');
    }
});


function toggleContactCard() {
    document.getElementById('contactCard').classList.toggle('active');
}

const correo = "anthony.cpweb@gmail.com"; 
const asunto = "Contacto - heroVsBoss";
const cuerpo = "hola, he revisado tu portafolio de heroVsBoss"; 
document.getElementById('emailLink').href = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

window.onload = initPreloader;
