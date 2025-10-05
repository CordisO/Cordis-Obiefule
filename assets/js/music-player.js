const audio = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause");
const playIcon = document.getElementById("play-btn");
const pauseIcon = document.getElementById("pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const elapsedBar = document.querySelector(".elapsed");
const timeNow = document.querySelector(".time_now");
const timeFull = document.querySelector(".time_full");
const playingAnim = document.querySelector(".playing");
const title1 = document.querySelector(".title-1");
const title2 = document.querySelector(".title-2");

// Playlist with metadata
let playlist = [
  {
    src: "assets/audio/Alfie Jukes - Tote Bag [Lyric Video].mp3",
    title: "Tote Bag",
    artist: "Alfie Jukes",
  },
  {
    src: "assets/audio/Alfie Jukes - Eyes Wide.mp3",
    title: "Eyes Wide",
    artist: "Alfie Jukes",
  },
  {
    src: "assets/audio/Golden Brown - The Stranglers.mp3",
    title: "Golden Brown",
    artist: "The Stranglers",
  },
];

let currentIndex = 0;

// Load a song into the player
function loadSong(index) {
  audio.src = playlist[index].src;
  title1.textContent = playlist[index].title;
  title2.textContent = playlist[index].artist;

  // Show pause icon
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
}

// Play/pause button
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  } else {
    audio.pause();
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  }
});

// Next song
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
});

// Update progress bar + time
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  elapsedBar.style.width = progress + "%";

  timeNow.textContent = formatTime(audio.currentTime);
  timeFull.textContent = formatTime(audio.duration);
});

// When music plays
audio.addEventListener("play", () => {
  playingAnim.classList.add("active");
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
});

// When music pauses
audio.addEventListener("pause", () => {
  playingAnim.classList.remove("active");
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
});

// When music ends
audio.addEventListener("ended", () => {
  playingAnim.classList.remove("active"); 
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
});

// Format mm:ss
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Load the first song
loadSong(currentIndex);
