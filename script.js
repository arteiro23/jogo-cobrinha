document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const gridSize = 30;
    const cellSize = 10;
    const initialSnakeLength = 5;
    let snake = [{ x: 0, y: 0 }];
    let direction = 'right';
    let food = generateFood();
    let score = 0;

    function generateFood() {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        return { x, y };
    }

    function draw() {
        board.innerHTML = '';

        snake.forEach(segment => {
            const snakeSegment = document.createElement('div');
            snakeSegment.className = 'snake';
            snakeSegment.style.left = `${segment.x * cellSize}px`;
            snakeSegment.style.top = `${segment.y * cellSize}px`;
            board.appendChild(snakeSegment);
        });


        const foodElement = document.createElement('div');
        foodElement.className = 'food';
        foodElement.style.left = `${food.x * cellSize}px`;
        foodElement.style.top = `${food.y * cellSize}px`;
        board.appendChild(foodElement);


        const scoreElement = document.createElement('h2');
        scoreElement.textContent = `Score: ${score}`;
        board.appendChild(scoreElement);
    }

    function update() {

        const head = { ...snake[0] };
        switch (direction) {
            case 'up':
                head.y = (head.y - 1 + gridSize) % gridSize;
                break;
            case 'down':
                head.y = (head.y + 1) % gridSize;
                break;
            case 'left':
                head.x = (head.x - 1 + gridSize) % gridSize;
                break;
            case 'right':
                head.x = (head.x + 1) % gridSize;
                break;
        }

        
        const collision = snake.some(segment => segment.x === head.x && segment.y === head.y);
        if (collision) {
            alert(`Game Over! Your score is ${SCORE}`);
            resetGame();
            return;
        }

        
        if (head.x === food.x && head.y === food.y) {
            snake.unshift({ ...food });
            food = generateFood();
            score += 10; 
        }

    
        snake.unshift(head);
        if (snake.length > initialSnakeLength) {
            snake.pop();
        }

        
        draw();
    }

    function resetGame() {
        snake = [{ x: 0, y: 0 }];
        direction = 'right';
        food = generateFood();
        score = 0;
        draw();
    }


    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });


    draw();

    setInterval(update, 100);
});