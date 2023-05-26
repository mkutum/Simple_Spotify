let songIndex = 0;
let audioElement = new Audio("musics/Nila-Dusokot.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songText = document.getElementById("songTXT");
let songs = [
    { id: 0, songName: "Nila Nila Dusokot", filePath: "musics/Nila-Dusokot.mp3", coverPath: "/logos/cover1.jpeg" },
    { id: 1, songName: "Avicii", filePath: "musics/Avicii.mp3", coverPath: "/logos/cover1.jpeg" },
    { id: 2, songName: "Channa", filePath: "musics/Channa.mp3", coverPath: "/logos/cover1.jpeg" },
    { id: 3, songName: "Malang", filePath: "musics/Malang.mp3", coverPath: "/logos/cover1.jpeg" },
    { id: 4, songName: "Smile-Energy", filePath: "musics/Smile-Energy.mp3", coverPath: "/logos/cover1.jpeg" }
]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

function assignSongToPlay(songIndex) {
    newSong = songs[songIndex].filePath;
    audioElement.src = newSong;
}
function assignColorPlay(elementName) {
    elementName.parentElement.parentElement.parentElement.classList.add("songPlay");
}
function removeColorPlay() {
    Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
        element.classList.remove("songPlay");
    })
}

// let currentTimePlaying = 0;

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        if (audioElement.src.length === 0) {
            audioElement.src = "musics/Nila-Dusokot.mp3";
            audioElement.play();
            let changeIcon = document.getElementById(1).classList;
            changeIcon.remove("fa-circle-play");
            changeIcon.add("fa-circle-pause");
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            gif.style.opacity = 1;

        } else {
            audioElement.play();
            songs.map((song) => {
                if (`http://127.0.0.1:5500/${song.filePath}` === audioElement.src) {
                    let changeIcon = document.getElementById(song.id);
                    changeIcon.classList.remove("fa-circle-play");
                    changeIcon.classList.add("fa-circle-pause");
                }
            }
            )
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            gif.style.opacity = 1;
        }


    } else {
        audioElement.pause();
        makeAllPlays();
        // currentTimePlaying = audioElement.currentTime;
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})
function changeSongPlay(songIndex) {
    audioElement.currentTime = 0;
    indexElement = document.getElementById(songIndex);
    removeColorPlay();
    assignColorPlay(indexElement);
    audioElement.play();
    makeAllPlays();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    indexElement.classList.remove("fa-circle-play");
    indexElement.classList.add("fa-circle-pause");
    songText.innerHTML = songs[songIndex].songName;
}



Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            if (audioElement.paused) {
                songText.innerHTML = songs[parseInt(e.target.id)].songName;
                makeAllPlays();
                songIndex = parseInt(e.target.id);
                assignSongToPlay(songIndex);
                removeColorPlay();
                assignColorPlay(e.target);
                audioElement.play();
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");
                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");


            }

        } else {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            assignSongToPlay(songIndex);
            removeColorPlay();
            assignColorPlay(e.target);
            audioElement.pause();
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        }
    })
})


document.getElementById("previous").addEventListener('click', () => {
    // console.log(songIndex);
    if (songIndex > 5) {
        songIndex = 5;
    } else if (songIndex < 1) {
        songIndex = 1;
    } else {
        songIndex = songIndex - 1;
    }
    assignSongToPlay(songIndex);
    changeSongPlay(songIndex);

})


document.getElementById("next").addEventListener('click', () => {
    if (songIndex > 5) {
        songIndex = 5;
        console.log("No Songs");
    } else if (songIndex < 1) {
        songIndex = 1;
    } else {
        songIndex = songIndex + 1;
    }
    assignSongToPlay(songIndex);
    changeSongPlay(songIndex);
})