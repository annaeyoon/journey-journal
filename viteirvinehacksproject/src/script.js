document.getElementById("initial-ipod").addEventListener("click", () => {
    const ipodMusic = document.getElementById("ipod-music");
    const ipodImage = document.getElementById("initial-ipod");

    if (ipodMusic.paused) {
        // Music is paused, so play it and change the iPod image (or style)
        ipodMusic.play();
        ipodImage.src = "public/assets/ipodon.png";  // Change image when music starts
        console.log("Music is playing");
    } else {
        // Music is playing, so pause it and reset the iPod image
        ipodMusic.pause();
        ipodImage.src = "public/assets/ipodoff.png";  // Change image back when music stops
        console.log("Music is paused");
    }
});
