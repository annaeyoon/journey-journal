document.getElementById("initial-ipod").addEventListener("click", () => {
    const ipodMusic = document.getElementById("ipod-music");

    if (ipodMusic.paused) {
        ipodMusic.play();
        console.log("Music is playing");
    } else {
        ipodMusic.pause();
        console.log("Music is paused");
    }
});
