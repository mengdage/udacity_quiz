function ticTacToeGame() {
var ticTacToe = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
    ];

this.reset = function (){
  ticTacToe = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
      ];
};

//x, y: postion
//makr: O or X
this.makeMove = function (x, y, mark) {
    // check if x and y is legal
    if( x< 0 || x >2 || y <0 || y > 2){
        console.error("illegal x or y");
        return;
    }

    // check if it's possible to put the mark the (x, y)
    if(ticTacToe[x][y] === "") {
        // good to go
        // put the mark at (x, y)
        ticTacToe[x][y] = mark;
        // update the UI
        var result = this.checkWin(x, y, mark);
        if(result.finished) {
            console.log('the winner is ' + result.winner);
        }
    } else {
        // give some feedback
        console.error("this place is not empty");
    }
}


// {
// finished: true/false
// winner: 1 or 2
// }
//
this.checkWin = function (x, y, mark){
    var result = {
        finished: false,
        winner: 1
    };

    // check if (x, y) produce a row or diagonal with mark

    // 1. check if a horizontal line with 3 marks
    if(ticTacToe[x][0] === mark && ticTacToe[x][1] === mark && ticTacToe[x][2] === mark) {
        // there's a horizontal line with 3 marks
        // set the result
        result.finished = true;
        result.winner = (mark === 'O') ? 1 : 2;

        return result;
    }

    // 2. check if a vertical line with 3 marks
    if(ticTacToe[0][y] === mark && ticTacToe[1][y] === mark && ticTacToe[2][y] === mark) {
        // there's a vertical line with 3 marks
        // set the result
        result.finished = true;
        result.winner = (mark === 'O') ? 1 : 2;

        return result;
    }

    // 3. check if 2 diagonal lines with 3 marks
    // 3.1 check one diagonal line
    if(ticTacToe[0][0] === mark && ticTacToe[1][1] === mark && ticTacToe[2][2] === mark) {
        result.finished = true;
        result.winner = (mark === 'O') ? 1 : 2;

        return result;
    }
    // 3.2 check the other diagonal line
    if(ticTacToe[0][2] === mark && ticTacToe[1][1] === mark && ticTacToe[2][0] === mark) {
        result.finished = true;
        result.winner = (mark === 'O') ? 1 : 2;

        return result;
    }

    // there's no winner
    return result;
}

}

// test
var game = new ticTacToeGame();
game.makeMove(0, 0, 'O');
game.makeMove(1, 1, 'O');
game.makeMove(2, 2, 'O');
game.makeMove(2, 2, 'x');
game.reset();
game.makeMove(0, 0, 'x');
game.makeMove(1, 1, 'x');
game.makeMove(2, 2, 'x');
