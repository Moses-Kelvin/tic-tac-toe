const arr = document.querySelectorAll('.btn');
const restart = document.querySelector('.restart-btn');
const xScore = document.querySelector('.x-score');
const oScore = document.querySelector('.o-score');
const tie = document.querySelector('.tie');
const confirmRestart = document.querySelector('.confirm-restart');
const overlay = document.querySelector('.overlay');
const declineRestart = document.querySelector('.decline-restart');
const overlay2 = document.querySelector('.overlay2');
const winnerIcon = document.querySelector('.winner-icon');
const playerTurn = document.querySelector('.player-turn');
const winnerMsg = document.querySelector('.winner-msg');
const el_x = document.querySelector('.el-x');
const el_o = document.querySelector('.el-o');
const player_btn = document.querySelector('.vs-player_btn');
const cpu_btn = document.querySelector('.vs-cpu_btn');
const Main = document.querySelector('main');
const home = document.querySelector('.home');
const player_el = document.querySelector('.player-el');
const quit_btn = document.querySelector('.quit');
const computer_el = document.querySelector('.computer-el');
const nextRound_btn = document.querySelector('.next-round_btn');
const round_taker = document.querySelector('.round-taker');

let played = true;
let userPickedElement = '';
let oponent = '';
let count = 0;
let endGame = false;

const returnToDefault = () => {
    arr.forEach(el => {
        if (el.disabled == true) {
            el.disabled = false
        }
        el.textContent = ''
    }
    );
    xScore.textContent = 0
    oScore.textContent = 0
    tie.textContent = 0
};

quit_btn.addEventListener('click', () => {
    endGame = false;
    count = 0;
    played = true;
    if (oponent === 'Player') {
        playerTurn.textContent = 'X Turn'
    };
    returnToDefault();
    Main.style.display = 'none';
    overlay2.style.display = 'none';
    el_o.classList.remove('picked-element');
    el_x.classList.remove('picked-element');
    cpu_btn.classList.remove('bump');
    player_btn.classList.remove('bump');
    userPickedElement = '';
    home.style.display = 'grid';
});

cpu_btn.addEventListener('click', () => {
    oponent = 'Cpu';
    setTimeout(() => {
        cpu_btn.classList.add('bump')
    }, 50);
    cpu_btn.classList.remove('bump');

    setTimeout(() => {
        if (userPickedElement === 'O') {
            playerTurn.textContent = 'X Turn'
            player_el.textContent = 'O (YOU)'
            computer_el.textContent = 'X (CPU)'
            pcPlayHandler();
        } else {
            playerTurn.textContent = 'X Turn'
            player_el.textContent = 'X (YOU)'
            computer_el.textContent = 'O (CPU)'
        }
        home.style.display = 'none'
        Main.style.display = 'block'
    }, 300);
});

player_btn.addEventListener('click', () => {
    oponent = 'Player';
    setTimeout(() => {
        player_btn.classList.add('bump');
    }, 50);
    player_btn.classList.remove('bump')
    setTimeout(() => {
        home.style.display = 'none';
        Main.style.display = 'block';
        if (userPickedElement === 'O') {
            computer_el.textContent = 'X (PLAYER 2)';
            player_el.textContent = 'O (YOU)';
        } else {
            player_el.textContent = 'X (YOU)'
            computer_el.textContent = 'O (PLAYER 2)'
        }
    }, 300);
});


el_x.addEventListener('click', () => {
    el_o.classList.remove('picked-element');
    el_x.classList.add('picked-element');
    userPickedElement = 'X';
});


el_o.addEventListener('click', () => {
    el_x.classList.remove('picked-element');
    el_o.classList.add('picked-element');
    userPickedElement = 'O';
});


restart.addEventListener('click', (e) => {
    setTimeout(() => {
        restart.classList.add('bump');
    }, 50);
    restart.classList.remove('bump');
    setTimeout(() => {
        overlay.style.display = 'block';
    }, 300);
});

confirmRestart.addEventListener('click', () => {
    returnToDefault();
    played = true;
    overlay.style.display = 'none';
    playerTurn.textContent = 'X Turn';
    if (userPickedElement === 'O' && oponent === 'Cpu') {
        pcPlayHandler();
    }
});

nextRound_btn.addEventListener('click', () => {
    endGame = false;
    count = 0;
    played = true;
    if (oponent === 'Player') {
        playerTurn.textContent = 'X Turn'
    }
    arr.forEach(el => {
        if (el.disabled == true) {
            el.disabled = false;
        }
        el.textContent = '';
    });
    overlay2.style.display = 'none';
    if (userPickedElement === 'O' && oponent === 'Cpu') {
        playerTurn.textContent = 'X Turn';
        setTimeout(() => {
            pcPlayHandler();
        }, 700);
    };
});

declineRestart.addEventListener('click', () => { overlay.style.display = 'none' });

arr.forEach(el =>
    el.addEventListener('click', () => {
        if (oponent === 'Cpu') {
            count++;
            if (userPickedElement === '') {
                el.textContent = 'X';
                el.disabled = true;
            } else {
                el.textContent = userPickedElement;
                el.disabled = true;
            }
            if (userPickedElement === 'O') {
                playerTurn.textContent = 'X Turn';
            } else {
                playerTurn.textContent = 'O Turn';
            }
            gameLogic();
            if (endGame === false) {
                pcPlayHandler();
            }
        } else {
            if (played) {
                el.textContent = 'X';
                count++;
                playerTurn.textContent = 'O Turn';
                played = false
                gameLogic();
            } else {
                el.textContent = 'O';
                count++;
                playerTurn.textContent = 'X Turn';
                gameLogic();
                played = true;
            }
        }
    })
);

const pcPlayHandler = () => {
    setTimeout(() => {
        let availableSapces = [];
        arr.forEach((a, index) => {
            if (a.textContent.length == 0) {
                availableSapces.push(index);
            }
        });
        const spacesLength = availableSapces.length;
        const position = availableSapces[Math.floor(Math.random() * spacesLength)];
        if (userPickedElement === 'O') {
            arr[position].textContent = 'X';
            arr[position].disabled = true;
        } else {
            arr[position].textContent = 'O';
            arr[position].disabled = true;
        }
        if (userPickedElement === 'O') {
            playerTurn.textContent = 'O Turn';
        } else {
            playerTurn.textContent = 'X Turn';
        }
        count++;
        gameLogic();
    }, 1000);
};

const detectTie = () => {
    if (count == 9) {
        endGame = true;
        setTimeout(() => {
            tie.textContent = Number(tie.textContent) + 1;
            winnerMsg.textContent = 'TIE!';
            round_taker.textContent = '...OPPS, NO WINNER!';
            winnerIcon.setAttribute('src', './images/tie-icon.jpg');
            overlay2.style.display = 'block';
        }, 200);
    };
};

const gameLogic = () => {
    if (userPickedElement === 'X' || userPickedElement === '') {
        if (
            (arr[0].textContent.includes("X") && arr[1].textContent.includes("X") && arr[2].textContent.includes("X")) ||
            (arr[3].textContent.includes("X") && arr[4].textContent.includes("X") && arr[5].textContent.includes("X")) ||
            (arr[6].textContent.includes("X") && arr[7].textContent.includes("X") && arr[8].textContent.includes("X")) ||
            (arr[0].textContent.includes("X") && arr[3].textContent.includes("X") && arr[6].textContent.includes("X")) ||
            (arr[1].textContent.includes("X") && arr[4].textContent.includes("X") && arr[7].textContent.includes("X")) ||
            (arr[2].textContent.includes("X") && arr[5].textContent.includes("X") && arr[8].textContent.includes("X")) ||
            (arr[0].textContent.includes("X") && arr[4].textContent.includes("X") && arr[8].textContent.includes("X")) ||
            (arr[2].textContent.includes("X") && arr[4].textContent.includes("X") && arr[6].textContent.includes("X"))
        ) {
            endGame = true;
            xScore.textContent = Number(xScore.textContent) + 1;
            setTimeout(() => {
                winnerIcon.setAttribute('src', './images/icon-x.svg');
                winnerMsg.textContent = 'YOU WON!';
                round_taker.textContent = 'TAKES THE ROUND';
                overlay2.style.display = 'block';
            }, 200);
        }

        else if (
            (arr[0].textContent.includes("O") && arr[1].textContent.includes("O") && arr[2].textContent.includes("O")) ||
            (arr[3].textContent.includes("O") && arr[4].textContent.includes("O") && arr[5].textContent.includes("O")) ||
            (arr[6].textContent.includes("O") && arr[7].textContent.includes("O") && arr[8].textContent.includes("O")) ||
            (arr[0].textContent.includes("O") && arr[3].textContent.includes("O") && arr[6].textContent.includes("O")) ||
            (arr[1].textContent.includes("O") && arr[4].textContent.includes("O") && arr[7].textContent.includes("O")) ||
            (arr[2].textContent.includes("O") && arr[5].textContent.includes("O") && arr[8].textContent.includes("O")) ||
            (arr[0].textContent.includes("O") && arr[4].textContent.includes("O") && arr[8].textContent.includes("O")) ||
            (arr[2].textContent.includes("O") && arr[4].textContent.includes("O") && arr[6].textContent.includes("O"))
        ) {
            oScore.textContent = Number(oScore.textContent) + 1;
            setTimeout(() => {
                winnerIcon.setAttribute('src', './images/icon-o.svg');
                winnerMsg.textContent = 'OHH NO, YOU LOST...';
                round_taker.textContent = 'TAKES THE ROUND';
                overlay2.style.display = 'block';
            }, 200);
        } else {
            detectTie();
        }
    } else if (userPickedElement === 'O') {
        if (
            (arr[0].textContent.includes("O") && arr[1].textContent.includes("O") && arr[2].textContent.includes("O")) ||
            (arr[3].textContent.includes("O") && arr[4].textContent.includes("O") && arr[5].textContent.includes("O")) ||
            (arr[6].textContent.includes("O") && arr[7].textContent.includes("O") && arr[8].textContent.includes("O")) ||
            (arr[0].textContent.includes("O") && arr[3].textContent.includes("O") && arr[6].textContent.includes("O")) ||
            (arr[1].textContent.includes("O") && arr[4].textContent.includes("O") && arr[7].textContent.includes("O")) ||
            (arr[2].textContent.includes("O") && arr[5].textContent.includes("O") && arr[8].textContent.includes("O")) ||
            (arr[0].textContent.includes("O") && arr[4].textContent.includes("O") && arr[8].textContent.includes("O")) ||
            (arr[2].textContent.includes("O") && arr[4].textContent.includes("O") && arr[6].textContent.includes("O"))
        ) {
            endGame = true;
            xScore.textContent = Number(xScore.textContent) + 1;
            setTimeout(() => {
                winnerIcon.setAttribute('src', './images/icon-o.svg');
                winnerMsg.textContent = 'YOU WON!';
                round_taker.textContent = 'TAKES THE ROUND';
                overlay2.style.display = 'block';
            }, 200);
        } else if (
            (arr[0].textContent.includes("X") && arr[1].textContent.includes("X") && arr[2].textContent.includes("X")) ||
            (arr[3].textContent.includes("X") && arr[4].textContent.includes("X") && arr[5].textContent.includes("X")) ||
            (arr[6].textContent.includes("X") && arr[7].textContent.includes("X") && arr[8].textContent.includes("X")) ||
            (arr[0].textContent.includes("X") && arr[3].textContent.includes("X") && arr[6].textContent.includes("X")) ||
            (arr[1].textContent.includes("X") && arr[4].textContent.includes("X") && arr[7].textContent.includes("X")) ||
            (arr[2].textContent.includes("X") && arr[5].textContent.includes("X") && arr[8].textContent.includes("X")) ||
            (arr[0].textContent.includes("X") && arr[4].textContent.includes("X") && arr[8].textContent.includes("X")) ||
            (arr[2].textContent.includes("X") && arr[4].textContent.includes("X") && arr[6].textContent.includes("X"))
        ) {
            oScore.textContent = Number(oScore.textContent) + 1;
            setTimeout(() => {
                winnerIcon.setAttribute('src', './images/icon-x.svg');
                winnerMsg.textContent = 'OHH NO, YOU LOST...';
                round_taker.textContent = 'TAKES THE ROUND';
                overlay2.style.display = 'block';
            }, 200);
        } else {
            detectTie();
        }
    }
};

