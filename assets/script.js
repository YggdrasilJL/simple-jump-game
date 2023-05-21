
var character = document.getElementById("character");
var rock = document.getElementById("rock");
var h2 = document.querySelector("h2");
var isJumping = false;
var gameStarted = false;
var score = 0;
var spacebarCount = 0;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        spacebarCount++;

        if (spacebarCount === 1) {
            gameStarted = true;
            h2.style.display = "none";
        } else if (!isJumping && gameStarted) {
            isJumping = true;
            jump();
        }
    }
});

document.addEventListener("keyup", function(event) {
    if (event.code === "Space") {
        isJumping = false;
    }
})

document.addEventListener("keydown", function() {
    startrock();

}, {once: true});

function startrock() {
    rock.style.display = "inherit";
}

function jump() {
    if (character.classList.contains("animate")) {
        return;
    }
    character.classList.add("animate");
    setTimeout(function() {
    character.classList.remove("animate");
    }, 700);
}

function changeScore() {
    score++;
    var scoreElement = document.getElementById("score");
    scoreElement.textContent = score.toString().padStart(4, "0");
}

function checkCollision() {
    var charBox = character.getBoundingClientRect();
    var rockBox = rock.getBoundingClientRect();

    if (
        charBox.left < rockBox.right &&
        charBox.right > rockBox.left &&
        charBox.top < rockBox.bottom &&
        charBox.bottom > rockBox.top
    ) {
        location.reload();
    } else if (charBox.right > rockBox.right && !isJumping && gameStarted === true) {
        changeScore();
    }
}

setInterval(checkCollision, 10);