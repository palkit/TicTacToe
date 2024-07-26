let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX , PlayerO
let gameOver = false;
let moveCount = 0;
const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        moveCount++;
        checkwinner();
    });
});

const checkwinner = () => {
    for (let pattern of winpattern) {
        let posi1val = boxes[pattern[0]].innerText;
        let posi2val = boxes[pattern[1]].innerText;
        let posi3val = boxes[pattern[2]].innerText;
        if (posi1val != "" && posi2val != "" && posi3val != "") {
            if (posi1val === posi2val && posi2val === posi3val) {
                msg.innerText = `Winner is ${posi1val}`;
                gameOver = true;
                disableAllBoxes();
                if (msg.classList.contains('animate-winner')) {
                    msg.classList.remove('animate-winner');
                    void msg.offsetWidth; // Trigger reflow
                }
                msg.classList.add('animate-winner');
                return;
            }
        }
    }

    if (moveCount === boxes.length) {
        msg.innerText = "It's a draw!";
        gameOver = true;
        if (msg.classList.contains('animate-winner')) {
            msg.classList.remove('animate-winner');
            void msg.offsetWidth; // Trigger reflow
        }
        msg.classList.add('animate-winner');
    }
};

const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

resetbtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msg.innerText = "Game on!";
    if (msg.classList.contains('animate-winner')) {
        msg.classList.remove('animate-winner');
        void msg.offsetWidth; // Trigger reflow
    }
    msg.classList.add('animate-winner');
    gameOver = false;
    turn0 = true;
    moveCount = 0;
});
