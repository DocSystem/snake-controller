const homePage = document.getElementById('homePage');
const gamePage = document.getElementById('game');
const pauseMenu = document.getElementById('pauseMenu');

function buttonHover(elem) {
  elem.setAttribute("active", "");
}

function buttonUnHover(elem) {
  elem.removeAttribute("active");
}

function startGame() {
  if (gamepads[0] != null) {
    gameStartVibration();
  }
  var gameTable = document.createElement("table");
  for (var i = 0; i < 16; i++) {
    var gameTr = document.createElement("tr");
    for (var j = 0; j < 16; j++) {
      var gameTd = document.createElement("td");
      gameTr.appendChild(gameTd);
    }
    gameTable.appendChild(gameTr);
  }
  gamePage.append(gameTable);
  homePage.classList.add("hidden");
  window.currentPage = "game";
  return;
}

function exitGame() {
  leavePause();
  homePage.classList.remove("hidden");
  window.currentPage = "home";
  const gameTable = document.querySelector("#game > table");
  gameTable.parentNode.removeChild(gameTable);
  return;
}

function leavePause() {
  pauseMenu.classList.add("hidden");
  window.currentPage = "game";
}

function showPauseMenu() {
  pauseMenu.classList.remove("hidden");
  window.currentPage = "pause";
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
}

gameLoop();
