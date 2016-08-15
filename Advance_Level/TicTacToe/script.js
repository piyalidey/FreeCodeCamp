/** todo: refactor and make object-oriented */
$(function() {
  var playerToken = 'X';
  var aiToken = 'O';
  var board = ['', '', '', '', '', '', '', '', ''];
  var isPlayerTurn = false;
  var aiChosenSpots = [];
  var playerChosenSpots = [];
  var turn = 1;

  /**
  * Sets playerToken to token and aiToken to X or O – whichever player did not pick.
  * @param {String} token - the token to set playerToken to.
  */
  function setPlayerToken(token) {
    if (token === 'X') {
      playerToken = 'X';
      aiToken = 'O';
    } else if (token === 'O') {
      playerToken = 'O';
      aiToken = 'X';
    }
  }

  /**
   * Shows a line above winning three in a row for 2 seconds and restarts the game
   * @param {string} winner - the id of the win line div to show on top of winning section.
   */
  function startWinAnimation(winner) {
    var $div = $('#' + winner);
    var interval = setInterval(function() {
      $div.toggleClass('visible');
    }, 300);
    // clear interval and reset game
    setTimeout(function() {
      clearInterval(interval);
      // remove in case interval ends on visible
      $div.removeClass('visible');
      resetGame();
    }, 2000);
  }

  /**
   * Checks if there is a winner
   * @returns {Boolean} True if there is a winner.
   */
  function checkWinner() {
    // Tie
    if (board.indexOf('') === -1) {
      startWinAnimation();
    }

    // Diagonal left
    if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
      startWinAnimation('diagonal-left');
      return true;
    }

    // Diagonal right
    if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
      startWinAnimation('diagonal-right');
      return true;
    }

    // Top three
    if (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) {
      startWinAnimation('top-row');
      return true;
    }

    // Middle three
    if (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) {
      startWinAnimation('middle-row');
      return true;
    }

    // Bottom three
    if (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) {
      startWinAnimation('bottom-row');
      return true;
    }

    // Left three
    if (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) {
      startWinAnimation('left-column');
      return true;
    }

    // Center three
    if (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) {
      startWinAnimation('center-column');
      return true;
    }

    // Right three
    if (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) {
      startWinAnimation('right-column');
      return true;
    }

    return false;
  }

  /** Draws X's and O's on the board */
  function updateBoard() {
    for (var i = 0; i < board.length; i++) {
      var $div = $('#' + i);
      var $span = $('<span></span>');
      if (board[i] === '') {
        $div.empty();
      } else if (board[i] === 'X') {
        if ($div.children().length === 0) {
          $span.append('X');
          $div.append($span);
        }
      } else if (board[i] === 'O') {
        if ($div.children().length === 0) {
          $span.append('O');
          $div.append($span);
        }
      }
    }
  }

  /**
   * Calculate the opposite of a given square.
   * @param {Number} square - position to find opposite of.
   * @returns {Number} opposite position of square.
   */
  function getOppositeSquare(square) {
    switch (square) {
      case 0:
        return 8;
      case 2:
        return 6;
      case 6:
        return 2;
      case 8:
        return 0;
      default:
        return;
    }
  }

  /**
   * Looks through board to find empty corner
   * @returns {Number} index of empty spot. If no empty spots, returns -1.
   */
  function findAvailableCorner() {
    if (board[0] === '') {
      return 0;
    } else if (board[2] === '') {
      return 2;
    } else if (board[6] === '') {
      return 6;
    } else if (board[8] === '') {
      return 8;
    } else {
      return -1;
    }
  }

  /**
   * Check if the player could win next turn.
   * @returns {Number} The spot AI needs to go to block player from winning. Returns -1 if player can't win next turn.
   */
  function whereCanPlayerWin() {
    var spot1 = playerChosenSpots[0];
    var spot2 = playerChosenSpots[1];

    if (spot1 === 4 || spot2 === 4) {
      if ((spot1 === 1 || spot2 === 1) && board[7] === '') {
        return 7;
      }

      if ((spot1 === 3 || spot2 === 3) && board[5] === '') {
        return 5;
      }

      if ((spot1 === 5 || spot2 === 5) && board[3] === '') {
        return 3;
      }

      if ((spot1 === 7 || spot2 === 7) && board[1] === '') {
        return 1;
      }
    }

    return -1;
  }

  /**
  * Finds the spot where Ai can win if player leaves themself open to lose on turn 4.
  * @returns {Number} Index of spot on board where AI can win. Returns -1 if can't win.
  */
  function whereCanAiWin() {
    if (board[1] === aiToken) {
      if (board[0] === aiToken && board[2] === '') {
        return 2;
      }

      if (board[2] === aiToken && board[0] === '') {
        return 0;
      }
    }

    if (board[3] === aiToken) {
      if (board[0] === aiToken && board[6] === '') {
        return 6;
      }

      if (board[6] === aiToken && board[0] === '') {
        return 0;
      }
    }

    if (board[5] === aiToken) {
      if (board[2] === aiToken && board[8] === '') {
        return 8;
      }

      if (board[8] === aiToken && board[2] === '') {
        return 2;
      }
    }

    if (board[7] === aiToken) {
      if (board[6] === aiToken && board[8] === '') {
        return 8;
      }

      if (board[8] === aiToken && board[6] === '') {
        return 6;
      }
    }

    return -1;
  }

  /**
   * Gets the spot in between two adjacent corners on the board.
   * @param {Number} spot1 - index of first corner on the board.
   * @param {Number} spot2 - index of second corner on the board.
   * @returns {Number} index of spot between spot1 and spot2. If two spots aren't adjacent corners, returns -1.
   */
  function spotBetweenAdjacentCorners(spot1, spot2) {
    if (spot1 === 0 || spot2 === 0) {
      if (spot1 === 2 || spot2 === 2) {
        return 1;
      } else if (spot1 === 6 || spot2 === 6) {
        return 3;
      } else {
        return -1;
      }
    }

    if (spot1 === 2 || spot2 === 2) {
      if (spot1 === 0 || spot2 === 0) {
        return 1;
      } else if (spot1 === 8 || spot2 === 8) {
        return 5;
      } else {
        return -1;
      }
    }

    if (spot1 === 6 || spot2 === 6) {
      if (spot1 === 0 || spot2 === 0) {
        return 3;
      } else if (spot1 === 8 || spot2 === 8) {
        return 7;
      } else {
        return -1;
      }
    }

    if (spot1 === 8 || spot2 === 8) {
      if (spot1 === 2 || spot2 === 2) {
        return 5;
      } else if (spot1 === 6 || spot2 === 6) {
        return 7;
      } else {
        return -1;
      }
    }

    return -1;
  }

  /** Logic to place AI marker */
  function takeAiTurn() {
    var chosenSpot;
    // start in a random corner
    if (turn === 1) {
      var randomNumber = Math.floor(Math.random() * 4);
      switch (randomNumber) {
        case 0:
          chosenSpot = 0;
          break;
        case 1:
          chosenSpot = 2;
          break;
        case 2:
          chosenSpot = 6;
          break;
        case 3:
          chosenSpot = 8;
          break;
      }
    } else if (turn === 2) {
      var aiSpot = aiChosenSpots[0];
      var playerSpot = playerChosenSpots[0];
      // Is opposite spot taken?
      var oppositeAiSpot = getOppositeSquare(aiSpot);
      if (oppositeAiSpot !== playerSpot) {
        // No. Choose opposite spot.
        chosenSpot = oppositeAiSpot;
      } else {
        // Yes. Choose another corner.
        var random = Math.floor(Math.Random * 2);
        if (aiSpot === 0 || playerSpot === 0) {
          // 0 and 8 are taken. Choose 2 or 6.
          chosenSpot = random === 0 ? 2 : 6;
        } else {
          // 2 and 6 are taken. Choose 0 or 8.
          chosenSpot = random === 0 ? 0 : 8;
        }
      }
    } else if (turn === 3) {
      // Did we get opposite spots?
      if (aiChosenSpots[0] === getOppositeSquare(aiChosenSpots[1])) {
        // Yes.
        // Is the middle spot available?
        if (playerChosenSpots.indexOf(4) === -1) {
          // Yes. We win.
          chosenSpot = 4;
        } else {
          // No.
          // Could player win next turn?
          var playerWinSpot = whereCanPlayerWin();
          if (playerWinSpot !== -1) {
            chosenSpot = playerWinSpot;
          } else {
            // Choose a corner that's available.
            chosenSpot = findAvailableCorner();
          }
        }
      } else {
        // No.
        // Is the spot between the two adjacent corners we took available?
        var spot = spotBetweenAdjacentCorners(aiChosenSpots[0], aiChosenSpots[1]);

        if (spot !== -1 && board[spot] === '') {
          // Yes.
          // We win.
          chosenSpot = spot;
        } else {
          // No.
          // Choose open corner.
          chosenSpot = findAvailableCorner();
        }
      }
    } else if (turn === 4) {
      // Could player win next turn again?
      var playerBlockingSpot = getOppositeSquare(playerChosenSpots[2]);
      if (board[playerBlockingSpot] === '') {
        // Yes. Block them.
        chosenSpot = playerBlockingSpot;
      } else {
        // No. We can win.
        // Where is the middle spot?
        var middleSpot;
        var sideSpot1;
        var sideSpot2;

        if (board[getOppositeSquare(aiChosenSpots[0])] !== aiToken) {
          middleSpot = aiChosenSpots[0];
          sideSpot1 = aiChosenSpots[1];
          sideSpot2 = aiChosenSpots[2];
        } else if (board[getOppositeSquare(aiChosenSpots[1])] !== aiToken) {
          middleSpot = aiChosenSpots[1];
          sideSpot1 = aiChosenSpots[0];
          sideSpot2 = aiChosenSpots[2];
        } else {
          middleSpot = aiChosenSpots[2];
          sideSpot1 = aiChosenSpots[0];
          sideSpot2 = aiChosenSpots[1];
        }

        var spot = spotBetweenAdjacentCorners(middleSpot, sideSpot1);
        if (spot !== -1 && board[spot] === '') {
          chosenSpot = spot;
        } else {
          spot = spotBetweenAdjacentCorners(middleSpot, sideSpot2);
          if (spot !== -1 && board[spot] === '') {
            chosenSpot = spot;
          } else {
            if (board[4] === '') {
              chosenSpot = 4;
            } else {
              // Where can we win?
              chosenSpot = whereCanAiWin();
            }
          }
        }
      }

    } else if (turn >= 5) {
      // Go wherever is left.
      chosenSpot = board.indexOf('');
    }

    aiChosenSpots.push(chosenSpot);
    board[chosenSpot] = aiToken;
    updateBoard();
    if (!checkWinner()) {
      isPlayerTurn = true;
    }
  }

  /** Starts a new game */
  function resetGame() {
    $('.board .space').empty();
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 1;
    aiChosenSpots = [];
    playerChosenSpots = [];
    takeAiTurn();
  }

  // Click on a div
  $('.board div').click(function() {
    if (isPlayerTurn) {
      var id = $(this).attr('id');
      if (board[id] === '') {
        playerChosenSpots.push(parseInt(id, 10));
        board[id] = playerToken;
      } else {
        return;
      }
      isPlayerTurn = false;
      updateBoard();
      if (!checkWinner()) {
        turn++;
        takeAiTurn();
      }
    }
  });

  // Show modal to set playerToken to X or O.
  $('#myModal').modal();

  /** O button was clicked on modal. Set player token to 'O'. */
  $('#o-btn').click(function() {
    setPlayerToken('O');
  });

  /** X button was clicked on modal. Set player token to 'X'. */
  $('#x-btn').click(function() {
    setPlayerToken('X');
  });

  /** When modal is hidden, ai takes first move. */
  $('#myModal').on('hidden.bs.modal', function() {
    takeAiTurn();
  });
});
