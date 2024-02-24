class Song {
  constructor(title, audioSrc, albumArt) {
    this.title = title;
    this.audioSrc = audioSrc;
    this.albumArt = albumArt;
  }
}

class Playlist {
  constructor() {
    this.songs = [];
    this.currentSongIndex = 0;
  }

  addSong(title, audioSrc, albumArt) {
    const song = new Song(title, audioSrc, albumArt);
    this.songs.push(song);
  }

  playNext() {
    if (this.currentSongIndex < this.songs.length - 1) {
      this.currentSongIndex++;
      return this.songs[this.currentSongIndex];
    } else {
      // Если достигнут конец плейлиста, перейти к началу
      this.currentSongIndex = 0;
      return this.songs[0];
    }
  }

  playPrevious() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
      return this.songs[this.currentSongIndex];
    } else {
      // Если достигнуто начало плейлиста, перейти к концу
      this.currentSongIndex = this.songs.length - 1;
      return this.songs[this.songs.length - 1];
    }
  }

  getCurrentSong() {
    return this.songs[this.currentSongIndex];
  }
}

// Создаем плейлист и добавляем в него песни
const playlist = new Playlist();
playlist.addSong(
  "Еще Хуже",
  "./By Индия - Еще Хуже.mp3",
  "https://i.ytimg.com/vi/tylfRNSw_ow/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLAe7TyezUw22RFjfpjf08G6lrd48w"
);
playlist.addSong(
  "Бандана",
  "./JANAGA - Бандана.mp3",
  "https://i.ytimg.com/vi/k32zcXjS7c4/maxresdefault.jpg"
);
playlist.addSong(
  "Brooklyn",
  "./Miyagi - Brooklyn (feat. Andy Panda , TumaniYO).mp3",
  "https://i.ytimg.com/vi/mhwmB95EX1A/maxresdefault.jpg"
);

const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const songTitle = document.getElementById("songTitle");
const albumArt = document.getElementById("albumArt");

var count = 0;
playBtn.addEventListener("click", () => {
  if (count % 2 == 0) {
    albumArt.style.animation = "rotate 10s linear infinite";
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    audioPlayer.play();
    updateUI();
  } else {
    albumArt.style.animation = "";
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    audioPlayer.pause();
    updateUI();
  }
  count++
});

stopBtn.addEventListener("click", () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  updateUI();
});

nextBtn.addEventListener("click", () => {
  const nextSong = playlist.playNext();
  updateAudio(nextSong);
});

prevBtn.addEventListener("click", () => {
  const prevSong = playlist.playPrevious();
  updateAudio(prevSong);
});

function updateAudio(song) {
  audioPlayer.src = song.audioSrc;
  songTitle.textContent = song.title;
  albumArt.src = song.albumArt;
  audioPlayer.play();
}

function updateUI() {
  if (audioPlayer.paused) {
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  } else {
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }
}

// Инициализация первой песни
const initialSong = playlist.getCurrentSong();
updateAudio(initialSong);
