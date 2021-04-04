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
  homePage.classList.add("hidden");
  window.currentPage = "game";
  return;
}

function exitGame() {
  leavePause();
  homePage.classList.remove("hidden");
  window.currentPage = "home";
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
