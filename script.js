// Reveal sections when scrolling
const sections = document.querySelectorAll('.section');

function revealOnScroll() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// sparkly cursor
document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 600);
});

// sticky notes
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('wiggle');
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('wiggle');
    });
});

// ----------------------
// MUSIC PLAYER
// ----------------------

const songs = [
    { name: "Menu", file: "assets/music/Menu.mp3" },
    { name: "Simple Menu", file: "assets/music/Menu-minimised.mp3" },
    { name: "Aero Proj", file: "assets/music/aero-proj.mp3" },
    { name: "SWAN", file: "assets/music/SWAN.mp3" },
    { name: "Flamingo (SWAN reprise)", file: "assets/music/flamingo-swan-reprise.mp3" },
    { name: "Fruits", file: "assets/music/fruits.mp3" },
    { name: "Merry-Go-Round", file: "assets/music/merry-go-around.mp3" },
    { name: "Outside Pretty", file: "assets/music/OUTSIDE-PRETTY.mp3" },
    { name: "PC10", file: "assets/music/pc10.mp3" },
    { name: "Whimsical", file: "assets/music/whimsical.mp3" },
];

let currentSong = 0;
let isPlaying = false;

const audio = new Audio();

// debugging: log audio loading errors
audio.addEventListener("error", () => {
    console.log("Audio failed to load:", audio.src);
});

const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const songName = document.getElementById("songName");

// CD IMAGE for spinning animation
const cdImage = document.getElementById("cdImage");

function loadSong(index) {
    audio.src = songs[index].file;
    songName.textContent = "Now Playing: " + songs[index].name;
}

function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";

    // make CD spin
    if (cdImage) cdImage.style.animationPlayState = "running";
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶";

    // stop CD spin
    if (cdImage) cdImage.style.animationPlayState = "paused";
}

playPauseBtn.addEventListener("click", () => {
    if (isPlaying) pauseSong();
    else playSong();
});

nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
});

prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
});

// Load the first song on page start
loadSong(currentSong);

// For iframe navigation (persistent music)
function loadPage(page) {
    const frame = document.getElementById("contentFrame");

    // Fade OUT
    frame.classList.add("fade-out");

    setTimeout(() => {
        // Change the page after fade-out
        frame.src = page;

        // Fade IN after the new page loads
        frame.onload = () => {
            frame.classList.remove("fade-out");
            frame.classList.add("fade-in");

            // Remove fade-in class after animation
            setTimeout(() => {
                frame.classList.remove("fade-in");
            }, 400);
        };
    }, 400); // match fade-out duration
}

// Preload all media so slides switch instantly
function preloadGallery(gallery) {
    gallery.forEach(src => {
        if (src.endsWith(".mp4")) {
            const video = document.createElement("video");
            video.src = src;
        } else {
            const img = new Image();
            img.src = src;
        }
    });
}

// Preload everything on page load
Object.values(galleries).forEach(preloadGallery);
