$(document).ready(function() {
  enableInteraction()
});

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var round = 0;
var human = {
  symbol: "O",
  color: "#333",
  score: 0
}
var ai = {
  symbol: "X",
  color: "#FFF",
  score: 0
}

function move(square, player, color) {
  if (board[square.id] != "O" && board[square.id] != "X") {         // run only if square empty
    round++;
    $(square).css("background-color", color);
    board[square.id] = player;
    console.log("You pick square with id:" + square.id);
    console.log(board);

    if (winning(board, player)) {
      human.score++;
      timeoutMessage("YOU WIN")         // if player win
    } else if (round > 8) {
      timeoutMessage("TIE")             // if is tie
    } else {
      round++;
      var index = minimax(board, ai.symbol).index;                  // run minimax algorithm and return square index of ai choice
      var selectedSquare = "#" + index;
      $(selectedSquare).css("background-color", ai.color);          
      board[index] = ai.symbol;
      console.log(board);

      if (winning(board, ai.symbol)){
        ai.score++;
        timeoutMessage("YOU LOSE")    // if player lose
      } else if (round == 0) {
        timeoutMessage("TIE")         // if is tie
      }
    }
  }
} // end move

function timeoutMessage(myMessage) {
  setTimeout(function() {
    $(".message p").text(myMessage);
    reset();
  }, 500);
  return;
}

function reset() {
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  round = 0;
  $("td").css("background-color", "transparent");
  $("td").off('click');
  setTimeout(function() {
    $(".message p").text("");
    $("td").css("visibility", "hidden");
    $(".choise, .choice-text p").css("visibility", "visible");
    console.clear();
    console.log("Score table: " + human.score + " : " + ai.score);
    enableInteraction();
  }, 2000);
}

function enableInteraction(){
  $(".white").click(function(){
    $(".choise, .choice-text p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    ai.color = "#333";    
    human.color = "#FFF";
  });

  $(".black").click(function(){
    $(".choise, .choice-text p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    ai.color = "#FFF";
    human.color = "#333";
  });
  $("td").click(function(){
    $(this.id).off('click');;
    move(this, human.symbol, human.color);
  });
}

// check if 
function emptyIndexies(board){
  return  board.filter(s => s != "O" && s != "X");
}

// minimax algorithm
function minimax(newBoard, player){
  
  //available spots
  var availSpots = emptyIndexies(newBoard);

 
  if (winning(newBoard, human.symbol)){
    return {score:-10};
  }
  else if (winning(newBoard, ai.symbol)){
    return {score:10};
  }
  else if (availSpots.length === 0){
    return {score:0};
  }

  var moves = [];

  for(var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if(player == ai.symbol){
      var result = minimax(newBoard, human.symbol);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, ai.symbol);
      move.score = result.score;
    }
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if(player == ai.symbol) {
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++) {
      if(moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      } 
    }
  } else {
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++) {
      if(moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
} // end minimax

// winning combinations
function winning(board, player) {
  if(
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
    ) 
    { return true; } else { return false; }
}


