let boxes = document.querySelectorAll('.box');
let msgBox = document.querySelector('.msg-box');
let msg = document.querySelector('#msg');
let reset = document.querySelector('#reset');

let turnX = true;   // playerX, playerO
let count = 0;      // To Track Draw

const pattern = [
    [0,1,2], [3,4,5], [6,7,8],      // row
    [0,3,6], [1,4,7], [2,5,8],      // column
    [0,4,8], [2,4,6]                // diagonal
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnX){
            box.innerText = 'X';
            box.style.color = 'red';
            turnX = false;
        }
        else{
            box.innerText = 'O';
            box.style.color = 'blue';
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
        checkWinner();
    });
});

const gameDraw = () => {
    msg.innerText = `Game Draw! Play Again.`;
    msgBox.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () =>  {
    for (let i of pattern) {
        let x = boxes[i[0]].innerText;
        let y = boxes[i[1]].innerText;
        let z = boxes[i[2]].innerText;
    
        if (x != '' && y != '' && z != '') {
            if (x === y && y === z) {
                displayWinner(x);
                return true;
            }
        }
    }
};

const displayWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} won the game.`;
    msgBox.classList.remove('hide');
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgBox.classList.add('hide');
    count = 0;
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
};

reset.addEventListener('click', resetGame);