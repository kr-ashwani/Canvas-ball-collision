import { collisionWithWall, collisionBetweenTwoBalls } from "./collision.js";
import { DistanceBetweenPoints, RandomValues, setVh } from "./utility.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const ballsInfo = document.getElementById("ballsInfo");

const setCanvasDimensions = () => {
  canvas.width = window.innerWidth - 25;
  canvas.height =
    window.innerHeight - 40 - document.getElementById("ballsInfo").clientHeight;
  console.log(document.getElementById("ballsInfo").clientHeight);
};

setVh(window);
window.addEventListener("resize", () => setVh(window));
setCanvasDimensions();
window.addEventListener("resize", setCanvasDimensions);

RandomValues(window);

let TOTAL_BALLS = 60; // will be updated by user
let BALLS_RADIUS = 30; // will be updated by user

function Ball() {
  this.r = BALLS_RADIUS;
  this.mass = 1;
  let randX, randY;
  let i = 0;
  const currentTime = new Date().getTime();
  do {
    if ((new Date().getTime() - currentTime) / 1000 > 0.1) {
      alert(
        `Try reducing balls size or balls number as new balls are not getting free space to spawn.\n\nMaximum number of balls that will be generated with balls radius ${BALLS_RADIUS} is ${balls.length}`
      );
      return null;
    }
    if (i === 0) {
      randX = randInt(this.r, canvas.width - this.r);
      randY = randInt(this.r, canvas.height - this.r);
    }
    if (
      balls.length &&
      DistanceBetweenPoints(randX, randY, balls[i].x, balls[i].y) <
        this.r + balls[i].r
    ) {
      i = -1;
      continue;
    }

    this.x = randX;
    this.y = randY;
  } while (++i < balls.length);
  this.speedX = randIntExcept(-3, 3, 0);
  this.speedY = randIntExcept(-3, 3, 0);
  this.color = `orange`;
  this.draw = () => {
    ctx.beginPath();

    this.color =
      this.lastCollided && document.getElementById("colorCol").checked
        ? `#${Math.floor(Math.random() * 16777215).toString(16)}`
        : this.color;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
  };
  this.lastCollided = false;
  this.ballSpawned = true;
}

const balls = [];
const initializeBalls = (e) => {
  if (e) e.preventDefault();
  TOTAL_BALLS = Number(document.getElementById("ballsNum").value);
  BALLS_RADIUS = Number(document.getElementById("ballsSize").value);
  balls.length = 0;
  let newBall = null;
  for (let i = 0; i < TOTAL_BALLS; i++) {
    newBall = new Ball();
    if (newBall.ballSpawned) balls.push(newBall);
    else break;
  }

  document.getElementById("ballsNum").value = balls.length;
};

initializeBalls();

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].lastCollided = false;
  }

  for (let i = 0; i < balls.length; i++) {
    collisionWithWall(balls[i], canvas);

    for (let j = 0; j < balls.length; j++) {
      if (i == j) continue;

      collisionBetweenTwoBalls(balls[i], balls[j], i, j);
    }

    balls[i].draw();
  }
  requestAnimationFrame(animate);
};

animate();

ballsInfo.addEventListener("submit", (e) => initializeBalls(e));
