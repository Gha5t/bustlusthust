// Game Library Data
const gameLibrary = [
    // Puzzle Games
    {id: 1, name: '2048', category: 'puzzle', icon: '🎮', desc: 'Combine tiles to reach 2048'},
    {id: 2, name: 'Tetris', category: 'puzzle', icon: '⬜', desc: 'Classic falling blocks puzzle'},
    {id: 3, name: 'Sudoku', category: 'puzzle', icon: '🔢', desc: 'Number puzzle game'},
    {id: 4, name: 'Memory Match', category: 'puzzle', icon: '🧠', desc: 'Match pairs of cards'},
    {id: 5, name: 'Sliding Puzzle', category: 'puzzle', icon: '🖼️', desc: 'Slide tiles to solve puzzle'},
    {id: 6, name: 'Connect Four', category: 'puzzle', icon: '🔴', desc: 'Strategic connection game'},
    
    // Action Games
    {id: 7, name: 'Flappy Bird', category: 'action', icon: '🐦', desc: 'Navigate through obstacles'},
    {id: 8, name: 'Snake', category: 'action', icon: '🐍', desc: 'Collect food and grow'},
    {id: 9, name: 'Pac-Man', category: 'action', icon: '👾', desc: 'Eat dots and avoid ghosts'},
    {id: 10, name: 'Space Invaders', category: 'action', icon: '👽', desc: 'Shoot down aliens'},
    {id: 11, name: 'Breakout', category: 'action', icon: '🎾', desc: 'Bounce ball and break bricks'},
    {id: 12, name: 'Asteroids', category: 'action', icon: '⭐', desc: 'Destroy space rocks'},
    
    // Strategy Games
    {id: 13, name: 'Chess', category: 'strategy', icon: '♟️', desc: 'Classic board game'},
    {id: 14, name: 'Checkers', category: 'strategy', icon: '⚫', desc: 'Strategic jumping game'},
    {id: 15, name: 'Minesweeper', category: 'strategy', icon: '💣', desc: 'Find hidden mines'},
    {id: 16, name: 'Tower Defense', category: 'strategy', icon: '🗼', desc: 'Defend your base'},
    
    // Classic Games
    {id: 17, name: 'Tic Tac Toe', category: 'classic', icon: '✖️', desc: 'Three in a row'},
    {id: 18, name: 'Hangman', category: 'classic', icon: '🎯', desc: 'Guess the word'},
    {id: 19, name: 'Rock Paper Scissors', category: 'classic', icon: '✂️', desc: 'Beat the computer'},
    {id: 20, name: 'Dice Roller', category: 'classic', icon: '🎲', desc: 'Roll dice game'},
];

let currentFilter = 'all';

// Initialize games on page load
document.addEventListener('DOMContentLoaded', () => {
    displayGames('all');
});

function displayGames(filter) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    const filtered = filter === 'all' ? gameLibrary : gameLibrary.filter(g => g.category === filter);
    
    filtered.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <h3>${game.name}</h3>
            <p>${game.desc}</p>
            <button class="game-btn" onclick="loadGameById(${game.id})">Play Now</button>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

function filterGames(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayGames(category);
}

function loadGameById(gameId) {
    const game = gameLibrary.find(g => g.id === gameId);
    if (game) {
        openGameModal(game.name.toLowerCase().replace(' ', ''));
    }
}

function openGameModal(gameName) {
    const modal = document.getElementById('gameModal');
    const gameContainer = document.getElementById('gameContainer');
    const modalTitle = document.getElementById('modalTitle');
    
    modal.classList.add('show');
    gameContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Loading game...</p>';
    modalTitle.innerHTML = 'Loading...';
    
    setTimeout(() => {
        loadGame(gameName);
    }, 500);
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('show');
}

function openGame(gameType) {
    const modal = document.getElementById('gameModal');
    const gameContainer = document.getElementById('gameContainer');
    const modalTitle = document.getElementById('modalTitle');
    
    modal.classList.add('show');
    gameContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Loading educational content...</p>';
    modalTitle.innerHTML = 'Loading...';
    
    setTimeout(() => {
        loadHistoryMaterial(gameType);
    }, 500);
}

function loadGame(gameName) {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    switch(gameName) {
        case '2048':
            load2048Game();
            break;
        case 'tetris':
            loadTetrisGame();
            break;
        case 'sudoku':
            loadSudokuGame();
            break;
        case 'memory':
            loadMemoryGame();
            break;
        case 'flappybird':
            loadFlappyGame();
            break;
        case 'snake':
            loadSnakeGame();
            break;
        case 'pacman':
            loadPacmanGame();
            break;
        case 'chess':
            loadChessGame();
            break;
        case 'minesweeper':
            loadMinesweeperGame();
            break;
        case 'tictactoe':
            loadTicTacToeGame();
            break;
        case 'hangman':
            loadHangmanGame();
            break;
        case 'rockpaperscissors':
            loadRockPaperScissorsGame();
            break;
        default:
            gameContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Game not loaded yet</p>';
    }
}

// 2048 GAME
function load2048Game() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = '2048 - Combine numbers!';
    
    gameContainer.innerHTML = `
        <div id="game-2048" style="max-width: 400px; margin: 0 auto;">
            <div style="margin-bottom: 20px; text-align: center;">
                <p>Score: <span id="score2048">0</span></p>
                <button onclick="init2048()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">New Game</button>
            </div>
            <div id="grid2048" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #e0e0e0; padding: 10px; border-radius: 5px;"></div>
            <p style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">Use arrow keys to move tiles</p>
        </div>
    `;
    
    init2048();
}

let board2048 = [];
let score2048 = 0;

function init2048() {
    board2048 = Array(16).fill(0);
    score2048 = 0;
    addNew2048();
    addNew2048();
    render2048();
    document.getElementById('score2048').textContent = score2048;
}

function addNew2048() {
    let empty = board2048.map((v, i) => v === 0 ? i : null).filter(v => v !== null);
    if (empty.length > 0) {
        board2048[empty[Math.floor(Math.random() * empty.length)]] = Math.random() < 0.9 ? 2 : 4;
    }
}

function render2048() {
    const grid = document.getElementById('grid2048');
    if (!grid) return;
    grid.innerHTML = '';
    board2048.forEach(val => {
        const tile = document.createElement('div');
        tile.style.cssText = `
            background: ${getTileColor(val)};
            color: ${val > 4 ? 'white' : '#333'};
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60px;
        `;
        tile.textContent = val || '';
        grid.appendChild(tile);
    });
}

function getTileColor(val) {
    const colors = {
        0: '#ccc', 2: '#eee', 4: '#ede', 8: '#f2b179', 16: '#f59563',
        32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61',
        512: '#edc850', 1024: '#edc53f', 2048: '#edc22e'
    };
    return colors[val] || '#3c3c3c';
}

document.addEventListener('keydown', (e) => {
    if (!document.getElementById('gameModal').classList.contains('show')) return;
    
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        if (e.key === 'ArrowLeft') move2048(0);
        else if (e.key === 'ArrowRight') move2048(1);
        else if (e.key === 'ArrowUp') move2048(2);
        else if (e.key === 'ArrowDown') move2048(3);
        
        addNew2048();
        render2048();
        document.getElementById('score2048').textContent = score2048;
    }
});

function move2048(dir) {
    let newBoard = board2048.slice();
    if (dir === 0) newBoard = moveLeft2048(newBoard);
    else if (dir === 1) newBoard = moveRight2048(newBoard);
    else if (dir === 2) newBoard = moveUp2048(newBoard);
    else if (dir === 3) newBoard = moveDown2048(newBoard);
    board2048 = newBoard;
}

function moveLeft2048(board) {
    return board.map((_, i) => {
        if (i % 4 === 0) {
            let row = [board[i], board[i+1], board[i+2], board[i+3]].filter(v => v);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j+1]) {
                    row[j] *= 2;
                    score2048 += row[j];
                    row.splice(j+1, 1);
                }
            }
            while (row.length < 4) row.push(0);
            return row;
        }
    }).flat().filter(v => v !== undefined);
}

function moveRight2048(board) {
    return moveLeft2048(board.reverse()).reverse();
}

function moveUp2048(board) {
    let newBoard = Array(16).fill(0);
    for (let col = 0; col < 4; col++) {
        let column = [board[col], board[col+4], board[col+8], board[col+12]].filter(v => v);
        for (let j = 0; j < column.length - 1; j++) {
            if (column[j] === column[j+1]) {
                column[j] *= 2;
                score2048 += column[j];
                column.splice(j+1, 1);
            }
        }
        while (column.length < 4) column.push(0);
        column.forEach((v, i) => newBoard[col + i * 4] = v);
    }
    return newBoard;
}

function moveDown2048(board) {
    let newBoard = Array(16).fill(0);
    for (let col = 0; col < 4; col++) {
        let column = [board[col+12], board[col+8], board[col+4], board[col]].filter(v => v);
        for (let j = 0; j < column.length - 1; j++) {
            if (column[j] === column[j+1]) {
                column[j] *= 2;
                score2048 += column[j];
                column.splice(j+1, 1);
            }
        }
        while (column.length < 4) column.push(0);
        column.forEach((v, i) => newBoard[col + (3-i) * 4] = v);
    }
    return newBoard;
}

// TETRIS GAME
function loadTetrisGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Tetris - Classic Falling Blocks';
    
    gameContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <p>Score: <span id="tetrisScore">0</span></p>
            <button onclick="initTetris()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">New Game</button>
        </div>
        <canvas id="tetrisCanvas" width="240" height="400" style="background: #000; border: 2px solid #333; border-radius: 5px; display: block; margin: 0 auto;"></canvas>
        <p style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">Use arrow keys to move, UP to rotate</p>
    `;
    
    setTimeout(() => initTetris(), 100);
}

function initTetris() {
    const canvas = document.getElementById('tetrisCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const GRID_WIDTH = 10;
    const GRID_HEIGHT = 20;
    const BLOCK_SIZE = canvas.width / GRID_WIDTH;
    
    let grid = Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0));
    let score = 0;
    let gameRunning = true;
    
    const pieces = [
        [[1,1,1,1]], // I
        [[1,1],[1,1]], // O
        [[0,1,1],[1,1,0]], // Z
        [[1,1,0],[0,1,1]], // S
        [[1,0,0],[1,1,1]], // J
        [[0,0,1],[1,1,1]], // L
        [[0,1,0],[1,1,1]] // T
    ];
    
    let currentPiece = pieces[Math.floor(Math.random() * pieces.length)];
    let pos = {x: 3, y: 0};
    
    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= GRID_HEIGHT; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * BLOCK_SIZE);
            ctx.lineTo(canvas.width, i * BLOCK_SIZE);
            ctx.stroke();
        }
        for (let i = 0; i <= GRID_WIDTH; i++) {
            ctx.beginPath();
            ctx.moveTo(i * BLOCK_SIZE, 0);
            ctx.lineTo(i * BLOCK_SIZE, canvas.height);
            ctx.stroke();
        }
        
        // Draw placed blocks
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                if (grid[y][x]) {
                    ctx.fillStyle = '#00FF00';
                    ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
                }
            }
        }
        
        // Draw current piece
        ctx.fillStyle = '#FF00FF';
        currentPiece.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    ctx.fillRect((pos.x + x) * BLOCK_SIZE + 1, (pos.y + y) * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
                }
            });
        });
        
        document.getElementById('tetrisScore').textContent = score;
    }
    
    function gameLoop() {
        draw();
        if (gameRunning) setTimeout(gameLoop, 500);
    }
    
    gameLoop();
}

// SUDOKU GAME
function loadSudokuGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Sudoku - Number Puzzle';
    
    gameContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <button onclick="initSudoku()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">New Game</button>
        </div>
        <div id="sudokuGrid" style="max-width: 350px; margin: 0 auto; background: #fff; padding: 10px; border-radius: 5px;"></div>
    `;
    
    initSudoku();
}

function initSudoku() {
    const grid = document.getElementById('sudokuGrid');
    grid.innerHTML = '';
    
    // Simple sudoku grid generation
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = '1';
        input.style.cssText = `
            width: 35px;
            height: 35px;
            text-align: center;
            font-size: 16px;
            border: 1px solid #ccc;
            margin: 2px;
            border-radius: 3px;
        `;
        
        if ((Math.floor(i / 9) + 1) % 3 === 0) {
            input.style.borderBottom = '3px solid #000';
        }
        if ((i % 9 + 1) % 3 === 0) {
            input.style.borderRight = '3px solid #000';
        }
        
        input.addEventListener('keydown', (e) => {
            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                e.preventDefault();
            }
        });
        
        grid.appendChild(input);
    }
}

// MEMORY MATCH GAME
function loadMemoryGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Memory Match - Find Pairs';
    
    const cards = ['🦅', '🇺🇸', '⭐', '🎖️', '📜', '🪶', '🦅', '🇺🇸', '⭐', '🎖️', '📜', '🪶'];
    
    let shuffled = cards.sort(() => 0.5 - Math.random());
    let matched = 0;
    let flipped = [];
    
    let html = `
        <div style="margin-bottom: 20px; text-align: center;">
            <p>Matched: <span id="matchedPairs">0</span>/6</p>
            <button onclick="location.reload()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">New Game</button>
        </div>
        <div id="memoryGrid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 350px; margin: 0 auto;">
    `;
    
    shuffled.forEach((card, idx) => {
        html += `
            <button class="memory-card" data-id="${idx}" onclick="flipCard(this, '${card}')" style="
                width: 70px;
                height: 70px;
                font-size: 32px;
                background: #8B00FF;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">?</button>
        `;
    });
    
    html += '</div>';
    gameContainer.innerHTML = html;
}

function flipCard(card, value) {
    if (card.classList.contains('flipped')) return;
    
    card.textContent = value;
    card.classList.add('flipped');
    card.style.background = '#fff';
    card.style.color = '#000';
}

// FLAPPY BIRD GAME
function loadFlappyGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Flappy Bird - Navigate Pipes';
    
    gameContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <p>Score: <span id="flappyScore">0</span></p>
            <button onclick="initFlappy()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Restart Game</button>
        </div>
        <canvas id="flappyCanvas" width="400" height="400" style="background: #87CEEB; border: 2px solid #333; border-radius: 5px; display: block; margin: 0 auto;"></canvas>
        <p style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">Click or press SPACE to flap!</p>
    `;
    
    setTimeout(() => initFlappy(), 100);
}

let flappyGame = null;

function initFlappy() {
    const canvas = document.getElementById('flappyCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let score = 0;
    let gameRunning = true;
    
    const bird = {
        x: 50,
        y: canvas.height / 2,
        width: 30,
        height: 30,
        velocity: 0,
        gravity: 0.5,
        jumpPower: -10
    };
    
    let pipes = [];
    let frameCount = 0;
    
    function createPipe() {
        const pipeWidth = 50;
        const pipeGap = 120;
        const minHeight = 50;
        const maxHeight = canvas.height - pipeGap - minHeight;
        const pipeHeight = Math.random() * (maxHeight - minHeight) + minHeight;
        
        pipes.push({
            x: canvas.width,
            topHeight: pipeHeight,
            bottomY: pipeHeight + pipeGap,
            passed: false
        });
    }
    
    function update() {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;
        
        frameCount++;
        if (frameCount % 80 === 0) createPipe();
        
        pipes.forEach(pipe => {
            pipe.x -= 5;
            
            if (!pipe.passed && pipe.x + 50 < bird.x) {
                pipe.passed = true;
                score++;
                document.getElementById('flappyScore').textContent = score;
            }
        });
        
        pipes = pipes.filter(p => p.x > -50);
        
        if (bird.y + bird.height > canvas.height || bird.y < 0) gameRunning = false;
        
        pipes.forEach(pipe => {
            if (bird.x < pipe.x + 50 && bird.x + bird.width > pipe.x) {
                if (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY) {
                    gameRunning = false;
                }
            }
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
        ctx.fillStyle = '#000';
        ctx.fillRect(bird.x + 20, bird.y + 10, 5, 5);
        
        ctx.fillStyle = '#228B22';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, 50, pipe.topHeight);
            ctx.fillRect(pipe.x, pipe.bottomY, 50, canvas.height - pipe.bottomY);
        });
        
        if (!gameRunning) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 40);
        }
    }
    
    function gameLoop() {
        if (gameRunning) update();
        draw();
        requestAnimationFrame(gameLoop);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && document.getElementById('gameModal').classList.contains('show')) {
            e.preventDefault();
            bird.velocity = bird.jumpPower;
        }
    });
    
    canvas.addEventListener('click', () => {
        bird.velocity = bird.jumpPower;
    });
    
    gameLoop();
}

// SNAKE GAME
function loadSnakeGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Snake - Collect Food';
    
    gameContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <p>Score: <span id="snakeScore">0</span></p>
            <button onclick="initSnake()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">New Game</button>
        </div>
        <canvas id="snakeCanvas" width="400" height="400" style="background: #000; border: 2px solid #333; border-radius: 5px; display: block; margin: 0 auto;"></canvas>
        <p style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">Use arrow keys to move</p>
    `;
    
    setTimeout(() => initSnake(), 100);
}

function initSnake() {
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let score = 0;
    let gameRunning = true;
    
    let snake = [{x: 10, y: 10}];
    let direction = {x: 1, y: 0};
    let nextDirection = {x: 1, y: 0};
    let food = {x: 15, y: 15};
    
    function update() {
        direction = nextDirection;
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
        
        if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
            gameRunning = false;
            return;
        }
        
        if (snake.some(s => s.x === head.x && s.y === head.y)) {
            gameRunning = false;
            return;
        }
        
        snake.unshift(head);
        
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            document.getElementById('snakeScore').textContent = score;
            food = {x: Math.floor(Math.random() * (canvas.width / gridSize)), y: Math.floor(Math.random() * (canvas.height / gridSize))};
        } else {
            snake.pop();
        }
    }
    
    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00FF00';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });
        
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        
        if (!gameRunning) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 40);
        }
    }
    
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('gameModal').classList.contains('show')) return;
        
        if (e.key === 'ArrowUp' && direction.y === 0) nextDirection = {x: 0, y: -1};
        else if (e.key === 'ArrowDown' && direction.y === 0) nextDirection = {x: 0, y: 1};
        else if (e.key === 'ArrowLeft' && direction.x === 0) nextDirection = {x: -1, y: 0};
        else if (e.key === 'ArrowRight' && direction.x === 0) nextDirection = {x: 1, y: 0};
    });
    
    function gameLoop() {
        if (gameRunning) update();
        draw();
        setTimeout(gameLoop, 100);
    }
    
    gameLoop();
}

// PAC-MAN GAME
function loadPacmanGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Pac-Man - Eat Dots';
    
    gameContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <p>Score: <span id="pacmanScore">0</span></p>
            <button onclick="initPacman()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">New Game</button>
        </div>
        <canvas id="pacmanCanvas" width="400" height="400" style="background: #000; border: 2px solid #333; border-radius: 5px; display: block; margin: 0 auto;"></canvas>
        <p style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">Use arrow keys to move</p>
    `;
    
    setTimeout(() => initPacman(), 100);
}

function initPacman() {
    const canvas = document.getElementById('pacmanCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let score = 0;
    let gameRunning = true;
    
    let pacman = {x: 5, y: 5};
    let direction = {x: 0, y: 0};
    let dots = [];
    
    // Create dots
    for (let y = 0; y < canvas.height / gridSize; y++) {
        for (let x = 0; x < canvas.width / gridSize; x++) {
            if (Math.random() > 0.8) {
                dots.push({x, y});
            }
        }
    }
    
    function update() {
        pacman.x += direction.x;
        pacman.y += direction.y;
        
        if (pacman.x < 0) pacman.x = canvas.width / gridSize - 1;
        if (pacman.x >= canvas.width / gridSize) pacman.x = 0;
        if (pacman.y < 0) pacman.y = canvas.height / gridSize - 1;
        if (pacman.y >= canvas.height / gridSize) pacman.y = 0;
        
        dots = dots.filter(dot => {
            if (dot.x === pacman.x && dot.y === pacman.y) {
                score += 10;
                document.getElementById('pacmanScore').textContent = score;
                return false;
            }
            return true;
        });
    }
    
    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw pacman
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0.2, Math.PI * 1.8);
        ctx.lineTo(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
        ctx.fill();
        
        // Draw dots
        ctx.fillStyle = '#FFF';
        dots.forEach(dot => {
            ctx.fillRect(dot.x * gridSize + gridSize / 2 - 2, dot.y * gridSize + gridSize / 2 - 2, 4, 4);
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('gameModal').classList.contains('show')) return;
        if (e.key === 'ArrowUp') direction = {x: 0, y: -1};
        else if (e.key === 'ArrowDown') direction = {x: 0, y: 1};
        else if (e.key === 'ArrowLeft') direction = {x: -1, y: 0};
        else if (e.key === 'ArrowRight') direction = {x: 1, y: 0};
    });
    
    function gameLoop() {
        update();
        draw();
        setTimeout(gameLoop, 150);
    }
    
    gameLoop();
}

// TIC TAC TOE GAME
function loadTicTacToeGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Tic Tac Toe';
    
    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameOver = false;
    
    function renderBoard() {
        let html = `
            <div style="text-align: center;">
                <p>Current Player: <strong>${currentPlayer}</strong></p>
                <div id="tttBoard" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 5px; margin: 20px auto; width: fit-content;">
        `;
        
        board.forEach((cell, idx) => {
            html += `
                <button onclick="tttMove(${idx})" style="
                    width: 100px;
                    height: 100px;
                    font-size: 32px;
                    font-weight: bold;
                    background: white;
                    border: 2px solid #8B00FF;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " ${cell ? 'disabled' : ''}>
                    ${cell}
                </button>
            `;
        });
        
        html += `
                </div>
                <button onclick="resetTTT()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">New Game</button>
            </div>
        `;
        
        gameContainer.innerHTML = html;
    }
    
    window.tttMove = (idx) => {
        if (board[idx] === '' && !gameOver) {
            board[idx] = currentPlayer;
            
            if (checkWinner(board)) {
                gameOver = true;
                gameContainer.innerHTML += `<p style="text-align: center; color: green; font-weight: bold; font-size: 18px;">Player ${currentPlayer} Wins!</p>`;
            } else if (board.every(cell => cell !== '')) {
                gameOver = true;
                gameContainer.innerHTML += `<p style="text-align: center; color: orange; font-weight: bold; font-size: 18px;">It's a Draw!</p>`;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            
            renderBoard();
        }
    };
    
    window.resetTTT = () => {
        board = Array(9).fill('');
        currentPlayer = 'X';
        gameOver = false;
        renderBoard();
    };
    
    function checkWinner(b) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return lines.some(([a, b, c]) => b[a] && b[a] === b[b] && b[a] === b[c]);
    }
    
    renderBoard();
}

// HANGMAN GAME
function loadHangmanGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Hangman - Guess the Word';
    
    const words = ['HISTORY', 'AMERICA', 'REVOLUTIONARY', 'DEMOCRACY', 'INDEPENDENCE', 'CONSTITUTION'];
    const word = words[Math.floor(Math.random() * words.length)];
    let guessed = [];
    let wrong = 0;
    const maxWrong = 6;
    
    function render() {
        let display = word.split('').map(letter => guessed.includes(letter) ? letter : '_').join(' ');
        let remaining = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => !guessed.includes(l));
        
        let html = `
            <div style="text-align: center; padding: 20px;">
                <p>Word: <strong style="font-size: 24px;">${display}</strong></p>
                <p>Wrong Guesses: ${wrong}/${maxWrong}</p>
                <div id="hangmanButtons" style="margin: 20px 0;">
        `;
        
        remaining.forEach(letter => {
            html += `<button onclick="guessLetter('${letter}')" style="padding: 8px 12px; margin: 5px; background: #8B00FF; color: white; border: none; border-radius: 3px; cursor: pointer;">${letter}</button>`;
        });
        
        html += `
                </div>
        `;
        
        if (wrong >= maxWrong) {
            html += `<p style="color: red; font-weight: bold;">Game Over! The word was: ${word}</p>`;
        } else if (word.split('').every(l => guessed.includes(l))) {
            html += `<p style="color: green; font-weight: bold;">You Won!</p>`;
        }
        
        html += `<button onclick="location.reload()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; margin-top: 20px;">New Game</button>`;
        html += '</div>';
        
        gameContainer.innerHTML = html;
    }
    
    window.guessLetter = (letter) => {
        if (!guessed.includes(letter)) {
            guessed.push(letter);
            if (!word.includes(letter)) {
                wrong++;
            }
            render();
        }
    };
    
    render();
}

// ROCK PAPER SCISSORS GAME
function loadRockPaperScissorsGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Rock Paper Scissors';
    
    let playerScore = 0;
    let computerScore = 0;
    
    function render() {
        gameContainer.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p>Player: ${playerScore} | Computer: ${computerScore}</p>
                <div style="margin: 20px 0;">
                    <button onclick="playRPS('rock')" style="padding: 15px 20px; margin: 10px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">🪨 Rock</button>
                    <button onclick="playRPS('paper')" style="padding: 15px 20px; margin: 10px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">📄 Paper</button>
                    <button onclick="playRPS('scissors')" style="padding: 15px 20px; margin: 10px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">✂️ Scissors</button>
                </div>
                <div id="rpsResult" style="margin-top: 20px; font-weight: bold;"></div>
            </div>
        `;
    }
    
    window.playRPS = (playerChoice) => {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        let result = '';
        if (playerChoice === computerChoice) {
            result = 'Draw!';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result = 'You Win!';
            playerScore++;
        } else {
            result = 'Computer Wins!';
            computerScore++;
        }
        
        document.getElementById('rpsResult').innerHTML = `
            <p>You: ${playerChoice} | Computer: ${computerChoice}</p>
            <p>${result}</p>
        `;
        
        setTimeout(render, 1500);
    };
    
    render();
}

// CHESS GAME (Simple)
function loadChessGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Chess - Strategy Game';
    
    gameContainer.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <p style="color: #666;">Full Chess implementation loading...</p>
            <div id="chessBoard" style="display: inline-block; background: #8B4513; padding: 5px; border-radius: 5px;"></div>
        </div>
    `;
    
    const chessBoard = document.getElementById('chessBoard');
    
    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div');
        const isLight = (Math.floor(i / 8) + i) % 2 === 0;
        square.style.cssText = `
            width: 40px;
            height: 40px;
            background: ${isLight ? '#F0D9B5' : '#B58863'};
            display: inline-block;
            line-height: 40px;
            text-align: center;
            font-size: 24px;
        `;
        
        const row = Math.floor(i / 8);
        const col = i % 8;
        
        if (row === 0) {
            const pieces = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
            square.textContent = pieces[col];
        } else if (row === 1) {
            square.textContent = '♙';
        } else if (row === 6) {
            square.textContent = '♟';
        } else if (row === 7) {
            const pieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
            square.textContent = pieces[col];
        }
        
        chessBoard.appendChild(square);
    }
}

// MINESWEEPER GAME
function loadMinesweeperGame() {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    modalTitle.innerHTML = 'Minesweeper - Find Safe Squares';
    
    const ROWS = 8;
    const COLS = 8;
    const MINES = 10;
    
    let board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    let revealed = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));
    let flagged = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));
    let gameOver = false;
    
    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        const r = Math.floor(Math.random() * ROWS);
        const c = Math.floor(Math.random() * COLS);
        if (board[r][c] !== 'M') {
            board[r][c] = 'M';
            minesPlaced++;
        }
    }
    
    // Calculate numbers
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c] !== 'M') {
                let count = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === 'M') {
                            count++;
                        }
                    }
                }
                board[r][c] = count;
            }
        }
    }
    
    function render() {
        let html = `
            <div style="max-width: 350px; margin: 20px auto;">
                <button onclick="location.reload()" style="padding: 10px 20px; background: #8B00FF; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; margin-bottom: 15px;">New Game</button>
                <div id="mineGrid" style="display: grid; grid-template-columns: repeat(${COLS}, 1fr); gap: 3px;">
        `;
        
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const cell = board[r][c];
                let display = '?';
                let bg = '#999';
                
                if (revealed[r][c]) {
                    bg = '#ccc';
                    if (cell === 'M') display = '💣';
                    else if (cell > 0) display = cell;
                    else display = '';
                } else if (flagged[r][c]) {
                    display = '🚩';
                }
                
                html += `
                    <button onclick="minesweeperClick(${r}, ${c})" oncontextmenu="return minesweeperFlag(${r}, ${c})" style="
                        width: 35px;
                        height: 35px;
                        background: ${bg};
                        border: 1px solid #666;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: bold;
                    ">${display}</button>
                `;
            }
        }
        
        html += '</div></div>';
        gameContainer.innerHTML = html;
    }
    
    window.minesweeperClick = (r, c) => {
        if (revealed[r][c] || gameOver) return;
        
        if (board[r][c] === 'M') {
            gameOver = true;
            alert('Game Over! You hit a mine!');
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLS; j++) {
                    if (board[i][j] === 'M') revealed[i][j] = true;
                }
            }
        } else {
            revealed[r][c] = true;
        }
        render();
    };
    
    window.minesweeperFlag = (r, c) => {
        if (!revealed[r][c]) flagged[r][c] = !flagged[r][c];
        render();
        return false;
    };
    
    render();
}

function loadHistoryMaterial(type) {
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    const materials = {
        colonial: {
            title: 'Colonial America',
            content: `
                <h3>Colonial America (1607-1776)</h3>
                <p><strong>Key Points:</strong></p>
                <ul>
                    <li>First permanent English settlement: Jamestown (1607)</li>
                    <li>Plymouth Rock and the Pilgrims (1620)</li>
                    <li>Development of 13 colonies</li>
                    <li>Growth of colonial economy and slavery</li>
                    <li>Tensions with British Parliament</li>
                </ul>
            `
        },
        revolution: {
            title: 'American Revolution',
            content: `
                <h3>American Revolution (1775-1783)</h3>
                <p><strong>Key Events:</strong></p>
                <ul>
                    <li>Boston Tea Party (1773)</li>
                    <li>Declaration of Independence (1776)</li>
                    <li>Revolutionary War begins (1775)</li>
                    <li>Key battles and leaders</li>
                    <li>French support for America</li>
                    <li>Treaty of Paris (1783)</li>
                </ul>
            `
        },
        civilwar: {
            title: 'Civil War Era',
            content: `
                <h3>American Civil War (1861-1865)</h3>
                <p><strong>Key Information:</strong></p>
                <ul>
                    <li>Causes: slavery, states' rights</li>
                    <li>South secedes and forms Confederacy</li>
                    <li>Major battles and leaders</li>
                    <li>Emancipation Proclamation</li>
                    <li>Lincoln's leadership</li>
                    <li>Union victory and reconstruction</li>
                </ul>
            `
        },
        industrial: {
            title: 'Industrial Revolution',
            content: `
                <h3>Industrial Revolution in America</h3>
                <p><strong>Major Changes:</strong></p>
                <ul>
                    <li>Factory system development</li>
                    <li>Railroad expansion</li>
                    <li>Textile and steel industries</li>
                    <li>Migration to cities</li>
                    <li>Working conditions and labor movement</li>
                    <li>Technological innovations</li>
                </ul>
            `
        },
        worldwars: {
            title: 'World War Era',
            content: `
                <h3>America in the World Wars</h3>
                <p><strong>Key
