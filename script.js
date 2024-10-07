// script.js
const boardSize = 15;
let board = [];
let currentPlayer = 'X';
let gameOver = false;
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");

// 初始化棋盘
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // 清空棋盘
    board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(''));
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleMove(Math.floor(i / boardSize), i % boardSize));
        gameBoard.appendChild(cell);
    }
}

// 棋子放置及胜负检测
function handleMove(x, y) {
    if (board[x][y] === '' && !gameOver) {
        board[x][y] = currentPlayer;
        updateBoard();
        if (checkWinner(x, y)) {
            statusDisplay.textContent = `玩家 ${currentPlayer} 获胜！`;
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `当前玩家：${currentPlayer}`;
        }
    }
}

// 更新棋盘显示
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const x = Math.floor(i / boardSize);
        const y = i % boardSize;
        cells[i].textContent = board[x][y];
    }
}

// 检查是否有五子连珠
function checkWinner(x, y) {
    return checkDirection(x, y, 1, 0) ||  // 横向
           checkDirection(x, y, 0, 1) ||  // 纵向
           checkDirection(x, y, 1, 1) ||  // 主对角线
           checkDirection(x, y, 1, -1);   // 副对角线
}

// 检查特定方向是否连成五子
function checkDirection(x, y, dx, dy) {
    let count = 1;

    // 检查当前方向的正向
    for (let i = 1; i < 5; i++) {
        const nx = x + i * dx;
        const ny = y + i * dy;
        if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    // 检查当前方向的反向
    for (let i = 1; i < 5; i++) {
        const nx = x - i * dx;
        const ny = y - i * dy;
        if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    return count >= 5;  // 是否有五个连续的棋子
}

// 重置游戏
resetButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameOver = false;
    statusDisplay.textContent = `当前玩家：${currentPlayer}`;
    createBoard();
});

// 初始化
createBoard();
