
const cells = document.querySelectorAll(".cell");

const currentPlayerText =
    document.getElementById("currentPlayer");

const result =
    document.getElementById("result");

const resultText =
    document.getElementById("resultText");

const restartBtn =
    document.getElementById("restartBtn");

const playAgain =
    document.getElementById("playAgain");

const winningLine =
    document.getElementById("winningLine");


/* Game Board */

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];


let currentPlayer = "X";

let gameActive = true;


/* Winning Patterns */

const winningPatterns = [

    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]

];


/* Cell Click */

cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        const index = cell.dataset.index;


        // If cell is already filled
        // or game is over

        if (
            board[index] !== "" ||
            !gameActive
        ) {
            return;
        }


        /* Store Player */

        board[index] = currentPlayer;


        /* Display X */

        if (currentPlayer === "X") {

            cell.textContent = "✕";

            cell.classList.add("cross");

        }


        /* Display O */

        else {

            cell.textContent = "○";

            cell.classList.add("circle");

        }


        checkWinner();

    });

});


/* Check Winner */

function checkWinner() {

    for (let pattern of winningPatterns) {

        const a = pattern[0];

        const b = pattern[1];

        const c = pattern[2];


        /* Check 3 Matching Cells */

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {


            /* Stop Game */

            gameActive = false;


            /* Highlight Winning Cells */

            cells[a].classList.add(
                "winner-cell"
            );

            cells[b].classList.add(
                "winner-cell"
            );

            cells[c].classList.add(
                "winner-cell"
            );


            /* Draw Winning Line */

            drawWinningLine(
                pattern,
                board[a]
            );


            /* Winner Name */

            let winner;


            if (board[a] === "X") {

                winner = "✕ CROSS";

            }

            else {

                winner = "○ CIRCLE";

            }


            /* Show Popup */

            setTimeout(() => {

                resultText.innerHTML =
                    "Winner is<br>" + winner;

                result.style.display = "flex";

            }, 700);


            return;
        }

    }


    /* Check Draw */

    if (!board.includes("")) {

        gameActive = false;


        setTimeout(() => {

            resultText.innerHTML =
                "🤝 It's a Draw!";

            result.style.display = "flex";

        }, 400);


        return;
    }


    /* Change Player */

    if (currentPlayer === "X") {

        currentPlayer = "O";

        currentPlayerText.textContent =
            "○ CIRCLE";

    }

    else {

        currentPlayer = "X";

        currentPlayerText.textContent =
            "✕ CROSS";

    }

}


/* Draw Winning Line */

function drawWinningLine(
    pattern,
    player
) {


    /* Show Line */

    winningLine.style.display = "block";


    /* Remove Old Color */

    winningLine.classList.remove(
        "cross-line",
        "circle-line"
    );


    /* Set Line Color */

    if (player === "X") {

        winningLine.classList.add(
            "cross-line"
        );

    }

    else {

        winningLine.classList.add(
            "circle-line"
        );

    }


    /* Reset */

    winningLine.style.transform =
        "none";


    /* Top Row */

    if (
        pattern[0] === 0 &&
        pattern[1] === 1
    ) {

        winningLine.style.width =
            "100%";

        winningLine.style.height =
            "5px";

        winningLine.style.left =
            "0";

        winningLine.style.top =
            "16.5%";
    }


    /* Middle Row */

    else if (
        pattern[0] === 3 &&
        pattern[1] === 4
    ) {

        winningLine.style.width =
            "100%";

        winningLine.style.height =
            "5px";

        winningLine.style.left =
            "0";

        winningLine.style.top =
            "50%";
    }


    /* Bottom Row */

    else if (
        pattern[0] === 6 &&
        pattern[1] === 7
    ) {

        winningLine.style.width =
            "100%";

        winningLine.style.height =
            "5px";

        winningLine.style.left =
            "0";

        winningLine.style.top =
            "83.5%";
    }


    /* Left Column */

    else if (
        pattern[0] === 0 &&
        pattern[1] === 3
    ) {

        winningLine.style.width =
            "5px";

        winningLine.style.height =
            "100%";

        winningLine.style.left =
            "16.5%";

        winningLine.style.top =
            "0";
    }


    /* Middle Column */

    else if (
        pattern[0] === 1 &&
        pattern[1] === 4
    ) {

        winningLine.style.width =
            "5px";

        winningLine.style.height =
            "100%";

        winningLine.style.left =
            "50%";

        winningLine.style.top =
            "0";
    }


    /* Right Column */

    else if (
        pattern[0] === 2 &&
        pattern[1] === 5
    ) {

        winningLine.style.width =
            "5px";

        winningLine.style.height =
            "100%";

        winningLine.style.left =
            "83.5%";

        winningLine.style.top =
            "0";
    }


    /* Diagonal \ */

    else if (
        pattern[0] === 0 &&
        pattern[1] === 4
    ) {

        winningLine.style.width =
            "140%";

        winningLine.style.height =
            "5px";

        winningLine.style.left =
            "-20%";

        winningLine.style.top =
            "50%";

        winningLine.style.transform =
            "rotate(45deg)";
    }


    /* Diagonal / */

    else if (
        pattern[0] === 2 &&
        pattern[1] === 4
    ) {

        winningLine.style.width =
            "140%";

        winningLine.style.height =
            "5px";

        winningLine.style.left =
            "-20%";

        winningLine.style.top =
            "50%";

        winningLine.style.transform =
            "rotate(-45deg)";
    }

}


/* Restart Game */

function restartGame() {


    /* Clear Board */

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];


    /* Reset Player */

    currentPlayer = "X";

    gameActive = true;


    /* Clear Cells */

    cells.forEach((cell) => {

        cell.textContent = "";

        cell.classList.remove(
            "cross",
            "circle",
            "winner-cell"
        );

    });


    /* Reset Current Player */

    currentPlayerText.textContent =
        "✕ CROSS";


    /* Hide Popup */

    result.style.display = "none";


    /* Hide Winning Line */

    winningLine.style.display = "none";


    /* Reset Line Rotation */

    winningLine.style.transform =
        "none";

}


/* Buttons */

restartBtn.addEventListener(
    "click",
    restartGame
);


playAgain.addEventListener(
    "click",
    restartGame
);

