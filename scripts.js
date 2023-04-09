const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

const startGame = () => {
    isCircleTurn = false;
    isPlayerTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove('circle', 'x');
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
};

const gameOver = isDraw => {
    winningMessageTextElement.innerText =
     isDraw ? 'Deu Velha!' : (isCircleTurn ? 'Círculo Venceu!' : 'X Venceu!');
    winningMessage.classList.add("show-winning-message");
};

const checkForWin = currentPlayer => winningCombinations.some(combination =>
    combination.every(index => cellElements[index].classList.contains(currentPlayer))
);

const checkForDraw = () => [...cellElements].every(cell => cell.classList.contains('x') ||
                                                     cell.classList.contains('circle'));

const placeMark = (cell, classToAdd) => cell.classList.add(classToAdd);

const setBoardHoverClass = () => {
    board.classList.remove('circle', 'x');
    board.classList.add(isCircleTurn ? 'circle' : 'x');
};

const aiTurn = () => {
    const availableCells = [...cellElements].filter(cell => !cell.classList.contains('x') && 
                                                    !cell.classList.contains('circle'));
    const cell = availableCells[Math.floor(Math.random() * availableCells.length)];
    placeMark(cell, isCircleTurn ? 'circle' : 'x');
    if (checkForWin(isCircleTurn ? 'circle' : 'x')) gameOver(false);
    else if (checkForDraw()) gameOver(true);
    else swapTurns();
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
};

const handleClick = e => {
    const cell = e.target;
    placeMark(cell, isCircleTurn ? 'circle' : 'x');
    if (checkForWin(isCircleTurn ? 'circle' : 'x')) gameOver(false);
    else if (checkForDraw()) gameOver(true);
    else {
        swapTurns();
        aiTurn();
    }
};

startGame();
restartButton.addEventListener('click', startGame);