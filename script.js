const rows = 6;
const cols = 7;
let currentPlayer = 1;
let board = [];
let player1Score = 0;
let player2Score = 0;

for (let i = 0; i < rows; i++) {
    board.push(new Array(cols).fill(0));
}

function renderBoard() {
    const table = document.querySelector('.board');
    table.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');
            cell.dataset.column = j;
            cell.dataset.row = i;
            if (board[i][j] === 1) {
                cell.classList.add('player1');
            } else if (board[i][j] === 2) {
                cell.classList.add('player2');
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function dropPiece(column) {
    for (let i = rows - 1; i >= 0; i--) {
        if (board[i][column] === 0) {
            board[i][column] = currentPlayer;
            renderBoard();

            const cells = document.querySelectorAll('.board td');
            const index = (i * cols) + column;
            cells[index].classList.add('falling');

            if (checkWin(i, column)) {
                if (currentPlayer === 1) {
                    player1Score++;
                    document.getElementById('player1Score').textContent = player1Score;
                } else {
                    player2Score++;
                    document.getElementById('player2Score').textContent = player2Score;
                }
                if (currentPlayer === 1) {
                    alert('Colour ' + 'White' + ' wins!');
                } else {
                    alert('Colour ' + 'Cyan' + ' wins!');
                }
                resetGame();
                return;
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;

            setTimeout(() => {
                cells[index].classList.remove('falling');
            }, 500);

            return;
        }
    }
}

function checkWin(row, col) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    const player = board[row][col];

    for (let [dx, dy] of directions) {
        let count = 1;
        for (let direction = -1; direction <= 1; direction += 2) {
            for (let step = 1; step < 4; step++) {
                const newRow = row + direction * step * dx;
                const newCol = col + direction * step * dy;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === player) {
                    count++;
                } else {
                    break;
                }
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    currentPlayer = 2;
    renderBoard();
}

document.querySelector('.board').addEventListener('click', function(event) {
    const column = event.target.dataset.column;
    if (column !== undefined) {
        dropPiece(parseInt(column));
    }
});

renderBoard();