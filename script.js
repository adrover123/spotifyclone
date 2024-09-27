console.log("welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let volumeControl = document.getElementById("volumeControl");

let songs = [
  {
    songName: "One Step Closer",
    filePath: "songs/1.mp3",
    coverPath: "images/cover1.png",
  },
  {
    songName: "Crawling",
    filePath: "songs/2.mp3",
    coverPath: "images/cover1.png",
  },
  {
    songName: "By Myself",
    filePath: "songs/3.mp3",
    coverPath: "images/cover1.png",
  },
  {
    songName: "In The End",
    filePath: "songs/4.mp3",
    coverPath: "images/cover1.png",
  },
  {
    songName: "BAYZY, Sayfro - On and On",
    filePath: "songs/5.mp3",
    coverPath: "images/5.jpg",
  },
  {
    songName: "DJ FKU - EXECUTIONER",
    filePath: "songs/6.mp3",
    coverPath: "images/6.jpg",
  },
  {
    songName: "NEFFEX & TOKYO MACHINE - Desperate",
    filePath: "songs/7.mp3",
    coverPath: "images/7.jpg",
  },
  {
    songName: "Zachz Winner - blu",
    filePath: "songs/8.mp3",
    coverPath: "images/8.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//audioElement.play()

//Handle Play/pause Click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

//listen to events

audioElement.addEventListener("timeupdate", () => {
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id) - 1;
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }

  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

volumeControl.addEventListener("input", () => {
  audioElement.volume = volumeControl.value / 100;
});
