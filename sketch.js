const size = window.innerWidth * 0.5 * (window.innerHeight / window.innerWidth);


let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
let x_img, o_img;
let turn_n = 0;
let winner = 0;
let state = "game"

let turn = 1;
let config = {
    board_x: size / 20,
    board_y: size / 4,
    board_width: size - 2 * (size / 20),
    board_height: size - (size / 20)

}

function preload() {
    x_img = loadImage("x.png");
    o_img = loadImage("o.png");
}


function setup() {
    createCanvas(size, size * 1.25);
}



function draw() {
    restart()
    if (state == "game") {
        game()
    }
    if (state == "gameOver") {
        gameOver()
    }
}


function draw_board(x, y, w, h) {
    push()
    strokeWeight(5)
    line(x + round(w / 3) * 1, y, x + round(w / 3) * 1, y + h);
    line(x + round(w / 3) * 2, y, x + round(w / 3) * 2, y + h);
    line(x, y + round(h / 3) * 1, x + w, y + round(h / 3) * 1);
    line(x, y + round(h / 3) * 2, x + w, y + round(h / 3) * 2);
    pop()
}

function player_turn() {
    if (state == "game") {
        if (turn == 1 && mouseIsPressed === true) {
            let y = floor((mouseX - config.board_x) / (config.board_width / 3));
            let x = floor((mouseY - config.board_y) / (config.board_height / 3));
            if (x >= 0 && x <= 2 && y >= 0 && y <= 2 && board[x][y] == 0) {
                board[x][y] = 1;
                turn_n++;
                if (!wincondtion(board, turn)) {
                    turn = 2;
                }
                turn = 2;
                return
            }

        } else if (turn == 2 && mouseIsPressed === true) {
            let y = floor((mouseX - config.board_x) / (config.board_width / 3));
            let x = floor((mouseY - config.board_y) / (config.board_height / 3));
            if (x >= 0 && x <= 2 && y >= 0 && y <= 2 && board[x][y] == 0) {
                board[x][y] = 2;
                turn_n++;
                if (!wincondtion(board, turn)) {
                    turn = 1;
                }
            }

        }
    }


}


function display_ui(x, y) {
    push()
    textSize(size / 10)
    textAlign(CENTER, CENTER)
    if (turn == 1) {
        text("Player O's, turn", x, y)
    } else if (turn == 2) {
        text("Player X's, turn", x, y)
    }
    pop()
}


function wincondtion(game, p) {
    for (let i = 0; i < game.length; i++) {
        if (game[i][0] == p && game[i][1] == p && game[i][2] == p) {
            winner = p;
            state = "gameOver"
            return true;
        }
        if (game[0][i] == p && game[1][i] == p && game[2][i] == p) {
            winner = p;
            state = "gameOver"
            return true;
        }
        if (game[0][0] == p && game[1][1] == p && game[2][2] == p) {
            winner = p;
            state = "gameOver"
            return true;
        }
        if (game[0][2] == p && game[1][1] == p && game[2][0] == p) {
            winner = p;
            state = "gameOver"
            return true;
        }
    }

    if (turn_n == 9) {
        winner = 3;
        state = "gameOver"
        return true;
    }
}

function draw_pieces(game) {
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game[i].length; j++) {
            if (game[i][j] == 1) {
                push()
                fill(0)
                image(o_img, config.board_x + config.board_width / 3 * j, config.board_y + config.board_height / 3 * i, config.board_width / 3, config.board_height / 3)
                pop()
            } else if (game[i][j] == 2) {
                push()
                fill(255)
                image(x_img, config.board_x + config.board_width / 3 * j, config.board_y + config.board_height / 3 * i, config.board_width / 3, config.board_height / 3)
                pop()
            }
        }
    }
}



function game() {
    background(240);
    draw_board(config.board_x, config.board_y, config.board_width, config.board_height);
    player_turn()
    draw_pieces(board)
    display_ui(width / 2, 2 * size / 20);
}

function gameOver() {
    background(0)
    push()
    fill(255)
    textSize(40)
    textAlign(CENTER, CENTER)
    print(winner)
    if (winner == 1) {
        text("Player O Won", width / 2, height / 2)
    } else if (winner == 2) {
        text("Player X Won", width / 2, height / 2)
    } else if (winner == 3) {
        text("Its a Tie", width / 2, height / 2)
    }
    textSize(24)
    text("Press R to restart", width / 2, height / 2 + 40)

    // if key m is pressed
    if (keyIsPressed == true && keyCode == 77) {
        console.log(2)
    }
    pop()
}


function restart() {
    if (keyIsPressed == true && keyCode == 82) {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        turn = 1;
        turn_n = 0;
        winner = 0;
        state = "game"
    }
}