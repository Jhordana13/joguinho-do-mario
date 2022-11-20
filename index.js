const mario = document.querySelector(".mario");

const pipe = document.querySelector(".pipe");
pipe.offsetLeft = 1200;

const score = document.getElementById("score");
const highScore = document.getElementById("high-score");

let scoreValue = 0;

const storagedHighScore = localStorage.getItem("high-score");

let highScoreValue = 0;
if (storagedHighScore) {
  highScoreValue = storagedHighScore;
}

score.textContent = scoreValue;
highScore.textContent = highScoreValue;

function jump() {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
}

document.addEventListener("keydown", jump);

let loop = setInterval(() => {
  const marioPosition = window
    .getComputedStyle(mario)
    .bottom.replace("px", " ");
  const pipeposition = pipe.offsetLeft;

  if (pipeposition <= 120 && pipeposition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = "${pipeposition}px";

    mario.style.animation = "none";
    mario.style.bottom = "${marioposition}px";

    mario.src = "./images/perdeuu.png";
    mario.style.width = "75px";
    mario.style.marginleft = "50px";

    if (scoreValue > highScoreValue) {
      highScoreValue = scoreValue;
      localStorage.setItem("high-score", JSON.stringify(scoreValue));
      highScore.textContent = highScoreValue;
      setTimeout(() => {
        alert("Parabens você bateu o seu recorde!");
        window.location.reload();
      }, 100);
    } else {
      setTimeout(() => {
        alert("Fim de jogo!");
        window.location.reload();
      }, 100);
    }

    scoreValue = 0;
    score.textContent = "0";

    clearInterval(loop);
  }

  if (pipeposition < 20 && marioPosition > 120) {
    scoreValue += 1;
    score.textContent = Number(score.textContent) + 1;
    pipe.classList.remove("pipe-movement");
    void pipe.offsetLeft;
    pipe.classList.add("pipe-movement");
  }
}, 10);
