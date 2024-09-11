const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = spawnFood();
let score = 0;
let growth = 0;
let speed = 200;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (hasCollided()) {
        showGameOver();
        return
    }

    if (hasEatenFood()) {
        score += 10;
        document.getElementById('score').innerText = score;
        food = spawnFood();
        growth += 2;
        speed = Math.max(50, speed - 10);
    }

    moveSnake();
    drawCanvas();
    drawSnake();
    drawFood();

    setTimeout(gameLoop, speed);
}

function drawCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, boxSize, boxSize));
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (growth > 0) {
        growth--;
    }
    else {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction.x === 0) {
        direction = { x: -boxSize, y: 0 };
    }
    else if (key === 38 && direction.y === 0) {
        direction = { x: 0, y: -boxSize };
    }
    else if (key === 39 && direction.x === 0) {
        direction = { x: boxSize, y: 0 };
    }
    else if (key === 40 && direction.y === 0) {
        direction = { x: 0, y: boxSize };
    }
}

function spawnFood() {
    const x = Math.floor(Math.random() *  (canvas.width / boxSize)) * boxSize;
    const y = Math.floor(Math.random() *  (canvas.height / boxSize)) * boxSize;
    return { x, y };
}

function hasCollided() {
    const head = snake[0];
    return head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height 
    || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function hasEatenFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function showGameOver() {
    document.getElementById('restartBtn').style.display = 'block';
    direction = { x: 0, y: 0 };
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0};
    food = spawnFood();
    score = 0;
    growth = 0;
    speed = 200;
    document.getElementById('score').innerText = score;
    document.getElementById('restartBtn').style.display = 'none';
    gameLoop();
}

gameLoop();