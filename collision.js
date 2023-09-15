import { DistanceBetweenPoints } from "./utility.js";

const collisionWithWall = (ball, canvas) => {
  if (
    ball.x + ball.speedX >= canvas.width - ball.r ||
    ball.x + ball.speedX <= ball.r
  ) {
    ball.speedX *= -1;
    ball.lastCollided = true;
  }

  if (
    ball.y + ball.speedY >= canvas.height - ball.r ||
    ball.y + ball.speedY <= ball.r
  ) {
    ball.speedY *= -1;
    ball.lastCollided = true;
  }

  ball.x += ball.speedX;
  ball.y += ball.speedY;
};

function rotateVelocities(velocityX, velocityY, theta) {
  const rotatedVelocity = {
    x: velocityX * Math.cos(theta) - velocityY * Math.sin(theta),
    y: velocityX * Math.sin(theta) + velocityY * Math.cos(theta),
  };
  return rotatedVelocity;
}

const collisionBetweenTwoBalls = (ball1, ball2, i, j) => {
  if (
    DistanceBetweenPoints(ball1.x, ball1.y, ball2.x, ball2.y) -
      ball1.r -
      ball2.r <
    0
  ) {
    const res = {
      x: ball1.speedX - ball2.speedX,
      y: ball1.speedY - ball2.speedY,
    };

    if (res.x * (ball2.x - ball1.x) + res.y * (ball2.y - ball1.y) >= 0) {
      const m1 = ball1.mass;
      const m2 = ball1.mass;
      const theta = -Math.atan2(ball2.y - ball1.y, ball2.x - ball1.x);

      const rotatedVelocity1 = rotateVelocities(
        ball1.speedX,
        ball1.speedY,
        theta
      );
      const rotatedVelocity2 = rotateVelocities(
        ball2.speedX,
        ball2.speedY,
        theta
      );

      const swapVelocity1 = {
        x:
          (rotatedVelocity1.x * (m1 - m2)) / (m1 + m2) +
          (rotatedVelocity2.x * 2 * m2) / (m1 + m2),
        y: rotatedVelocity1.y,
      };
      const swapVelocity2 = {
        x:
          (rotatedVelocity2.x * (m1 - m2)) / (m1 + m2) +
          (rotatedVelocity1.x * 2 * m2) / (m1 + m2),
        y: rotatedVelocity2.y,
      };

      const u1 = rotateVelocities(swapVelocity1.x, swapVelocity1.y, -theta);
      const u2 = rotateVelocities(swapVelocity2.x, swapVelocity2.y, -theta);

      ball1.speedX = u1.x;
      ball1.speedY = u1.y;
      ball2.speedX = u2.x;
      ball2.speedY = u2.y;

      ball1.lastCollided = true;
      ball2.lastCollided = true;
      ball1.solvedCollision = true;
      ball2.solvedCollision = true;
      console.log("collided");
    }
  }
};

export { collisionWithWall, collisionBetweenTwoBalls };
