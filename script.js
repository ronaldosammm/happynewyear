/* ================= PASSWORD ================= */
const correctPassword = "natasya"; // GANTI
const passBtn = document.getElementById("passwordBtn");
const passInput = document.getElementById("passwordInput");
const passScreen = document.getElementById("passwordScreen");
const startScreen = document.getElementById("startScreen");
const error = document.getElementById("error");

passBtn.onclick = () => {
    if (passInput.value.toLowerCase() === correctPassword) {
        passScreen.classList.remove("active");
        startScreen.classList.add("active");
    } else {
        error.textContent = "Salah yaa 😘";
    }
};

/* ================= MUSIC ================= */
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let play = false;

musicBtn.onclick = () => {
    play ? music.pause() : music.play();
    musicBtn.textContent = play ? "▶️" : "⏸️";
    play = !play;
};

/* ================= STARS ================= */
const starCanvas = document.getElementById("stars");
const sctx = starCanvas.getContext("2d");
starCanvas.width = innerWidth;
starCanvas.height = innerHeight;

let stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    r: Math.random() * 2,
    s: Math.random() * 0.6 + 0.2
}));

function animateStars() {
    sctx.clearRect(0,0,starCanvas.width,starCanvas.height);
    stars.forEach(star => {
        sctx.fillStyle = "white";
        sctx.beginPath();
        sctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
        sctx.fill();
        star.y += star.s;
        if (star.y > starCanvas.height) star.y = 0;
    });
    requestAnimationFrame(animateStars);
}
animateStars();

/* ================= COUNTDOWN ================= */
const startBtn = document.getElementById("startBtn");
const countdownScreen = document.getElementById("countdownScreen");
const countdownEl = document.getElementById("countdown");

startBtn.onclick = () => {
    // 🔊 AUTOPLAY SAH (karena dari klik user)
    music.play().catch(() => {});
    play = true;
    musicBtn.textContent = "⏸️";

    startScreen.classList.remove("active");
    countdownScreen.classList.add("active");

    let c = 5;
    countdownEl.textContent = c;

    const cd = setInterval(() => {
        c--;
        countdownEl.textContent = c;
        if (c < 0) {
            clearInterval(cd);
            countdownScreen.classList.remove("active");
            startFireworksLoop();   // 🔥 petasan mulai
            showText();             // 💌 text jalan
        }
    }, 1000);
};


/* ================= FIREWORKS (LOOP) ================= */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function createExplosion() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;

    for (let i = 0; i < 120; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            a: 1,
            c: `hsl(${Math.random()*360},100%,60%)`
        });
    }
}

function startFireworksLoop() {
    document.getElementById("fireSound").play();
    setInterval(createExplosion, 800); // 🔁 petasan terus
    animateFireworks();
}

function animateFireworks() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach(p => {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy + 0.05;
        p.a -= 0.01;
    });

    particles = particles.filter(p => p.a > 0);
    requestAnimationFrame(animateFireworks);
}

/* ================= TEXT (TYPING) ================= */
const textScreen = document.getElementById("textScreen");
const typingText = document.getElementById("typingText");

const message =
`Selamat Tahun Baru sayangku...
Makasihh udah nemenin ditahun ini sayangg, 
maaf yaa sayangg di tahun ini masih belum bisa ngasih yang terbaik
maaf kalau masih kurang ngertiin, suka bikin marah, suka bikin gamood
aku minta maaf yaa sayangg,
makasih banyak udah sabar sayangg, udah sabar ngehadepin aku, makasih udah buat cerita baru di tahun ini
udah buat kenangan yang gakan pernah dilupain,
semoga di tahun yang baru, kita bisa jadi pribadi yang lebih baik yaa, sehat sehat buat mama, bapa, abang abang,
semoga selalu di dalam perlindungan tuhan, di lancarkan segala usahanya, rezekinya, semoga harapannya tercapaii,
happy new year sayangg ❤️`;

function showText() {
    textScreen.classList.add("active");
    typingText.textContent = "";

    let i = 0;
    const typing = setInterval(() => {
        typingText.textContent += message[i++];
        if (i === message.length) {
            clearInterval(typing);
            setTimeout(showGallery, 4000);
        }
    }, 60);
}

/* ================= GALLERY ================= */
const gallery = document.getElementById("galleryScreen");
const photos = ["foto1.jpg","foto2.jpg","foto3.jpg","foto4.jpg"];

function showGallery() {
    textScreen.classList.remove("active");
    gallery.classList.add("active");

    let i = 0;
    const g = setInterval(() => {
        if (i >= photos.length) return clearInterval(g);
        const img = document.createElement("img");
        img.src = photos[i];
        img.className = "photo";
        gallery.appendChild(img);
        i++;
    }, 1500);
}
