window.currentPage = "home";
var gamepads = navigator.getGamepads();
window.addEventListener("gamepadconnected", (event) => {
  gamepads = navigator.getGamepads();
});
window.addEventListener("gamepaddisconnected", (event) => {
  gamepads = navigator.getGamepads();
});

function vibrateGamepad(duration, weak, strong) {
  const gamepad = gamepads[0];
  if (gamepad != null) {
    return gamepad.vibrationActuator.playEffect("dual-rumble", {
      startDelay: 0,
      duration: duration,
      weakMagnitude: weak,
      strongMagnitude: strong
    });
  }
  return null;
}

async function gameStartVibration() {
  await vibrateGamepad(100, 0, 0.8);
  await vibrateGamepad(100, 1, 1);
  await vibrateGamepad(100, 1, 0.5);
  await vibrateGamepad(100, 1, 1);
  await vibrateGamepad(100, 1, 0.5);
  await vibrateGamepad(100, 1, 0);
  return;
}

function gamePressButton(btn) {
  if (window.currentPage == "home") {
    if (btn == "A") {
      if (document.querySelector("[active]")) {
        document.querySelector("[active]").click();
        if (document.querySelector("[active]")) {
          buttonUnHover(document.querySelector("[active]"));
        }
      }
    }
    else if (btn == "DPAD-LEFT") {
      homeNavigate("left");
    }
    else if (btn == "DPAD-RIGHT") {
      homeNavigate("right");
    }
  }
  else if (window.currentPage == "pause") {
    if (btn == "DPAD-UP") {
      pauseNavigate("up");
    }
    else if (btn == "DPAD-DOWN") {
      pauseNavigate("down");
    }
    else if (btn == "A") {
      if (document.querySelector("[active]")) {
        document.querySelector("[active]").click();
        if (document.querySelector("[active]")) {
          buttonUnHover(document.querySelector("[active]"));
        }
      }
    }
    else if (btn == "B") {
      leavePause();
      if (document.querySelector("[active]")) {
        buttonUnHover(document.querySelector("[active]"));
      }
    }
  }
  else if (window.currentPage == "game") {
    if (btn == "HOME") {
      exitGame();
    }
    else if (btn == "PLUS") {
      showPauseMenu();
      buttonHover(document.querySelectorAll("li.pausemenu_button")[0]);
    }
  }
}

function gamePressAxe(direction, stick) {
  if (window.currentPage == "home") {
    if (stick == "left") {
      if (direction == "left") { homeNavigate("left") }
      else if (direction == "right") { homeNavigate("right") }
    }
  }
  else if (window.currentPage == "pause") {
    if (stick == "left") {
      if (direction == "up") { pauseNavigate("up") }
      else if (direction == "down") { pauseNavigate("down") }
    }
  }
  else if (window.currentPage == "game") {

  }
}

function gameStopAxe(direction, stick) {

}

window.onkeydown = (e) => {
  if (window.currentPage == "home") {
    if (e.key == "ArrowLeft") {
      homeNavigate("left");
    }
    else if (e.key == "ArrowRight") {
      homeNavigate("right");
    }
    else if (e.key == "Enter") {
      if (document.querySelector("[active]")) {
        document.querySelector("[active]").click();
        if (document.querySelector("[active]")) {
          buttonUnHover(document.querySelector("[active]"));
        }
      }
    }
  }
  else if (window.currentPage == "pause") {
    if (e.key == "ArrowDown") {
      pauseNavigate("down");
    }
    else if (e.key == "ArrowUp") {
      pauseNavigate("up");
    }
    else if (e.key == "Enter") {
      if (document.querySelector("[active]")) {
        document.querySelector("[active]").click();
        if (document.querySelector("[active]")) {
          buttonUnHover(document.querySelector("[active]"));
        }
      }
    }
    else if (e.key == "Escape") {
      leavePause();
      if (document.querySelector("[active]")) {
        buttonUnHover(document.querySelector("[active]"));
      }
    }
  }
  else if (window.currentPage == "game") {
    if (e.key == "Escape") {
      showPauseMenu();
    }
  }
}

function homeNavigate(direction) {
  if (direction == "left") {
    if (!document.querySelector("[active]")) {
      buttonHover(document.querySelector(".startGameButton"));
    }
  }
  else if (direction == "right") {
    if (!document.querySelector("[active]")) {
      buttonHover(document.querySelector(".startGameButton"));
    }
  }
}

function pauseNavigate(direction) {
  if (direction == "up") {
    if (!document.querySelector("[active]")) {
      buttonHover(document.querySelectorAll("li.pausemenu_button")[0]);
    }
    else {
      var activeElem = document.querySelector("[active]");
      if (activeElem.previousElementSibling != null) {
        buttonHover(activeElem.previousElementSibling);
        buttonUnHover(activeElem);
      }
    }
  }
  else if (direction == "down") {
    if (!document.querySelector("[active]")) {
      buttonHover(document.querySelectorAll("li.pausemenu_button")[0]);
    }
    else {
      var activeElem = document.querySelector("[active]");
      if (activeElem.nextElementSibling != null) {
        buttonHover(activeElem.nextElementSibling);
        buttonUnHover(activeElem);
      }
    }
  }
}

const switch_buttons = {
  0: "B",
  1: "A",
  2: "Y",
  3: "X",
  4: "L",
  5: "R",
  6: "ZL",
  7: "ZR",
  8: "MINUS",
  9: "PLUS",
  10: "LEFTSTICK",
  11: "RIGHTSTICK",
  12: "DPAD-UP",
  13: "DPAD-DOWN",
  14: "DPAD-LEFT",
  15: "DPAD-RIGHT",
  16: "HOME",
  17: "CAPTURE"
}

var pressed_buttons = {}
var current_axes = {
  "left": {
    "left": false,
    "right": false,
    "up": false,
    "right": false
  },
  "right": {
    "left": false,
    "right": false,
    "up": false,
    "right": false
  }
}

for (var btn in switch_buttons) {
  pressed_buttons[switch_buttons[btn]] = false;
}

function gamepadLoop() {
  if (navigator.getGamepads()[0] != null) {
    var axes = [];
    axes[0] = Math.round(navigator.getGamepads()[0].axes[0]);
    axes[1] = Math.round(navigator.getGamepads()[0].axes[1]);
    axes[2] = Math.round(navigator.getGamepads()[0].axes[2]);
    axes[3] = Math.round(navigator.getGamepads()[0].axes[3]);
    if (axes[0] == 1) {
      if (current_axes["left"]["right"] != true) {
        current_axes["left"]["right"] = true;
        current_axes["left"]["left"] = false;
        gamePressAxe("right", "left");
        gameStopAxe("left", "left");
        //console.log("Left Stick - Right");
      }
    }
    else if (axes[0] == -1) {
      if (current_axes["left"]["left"] != true) {
        current_axes["left"]["left"] = true;
        current_axes["left"]["right"] = false;
        gamePressAxe("left", "left");
        gameStopAxe("right", "left");
        //console.log("Left Stick - Left");
      }
    }
    else {
      current_axes["left"]["right"] = false;
      current_axes["left"]["left"] = false;
      gameStopAxe("right", "left");
      gameStopAxe("left", "left");
    }
    if (axes[1] == 1) {
      if (current_axes["left"]["down"] != true) {
        current_axes["left"]["down"] = true;
        current_axes["left"]["up"] = false;
        gamePressAxe("down", "left");
        gameStopAxe("up", "left");
        //console.log("Left Stick - Down");
      }
    }
    else if (axes[1] == -1) {
      if (current_axes["left"]["up"] != true) {
        current_axes["left"]["up"] = true;
        current_axes["left"]["down"] = false;
        gamePressAxe("up", "left");
        gameStopAxe("down", "left");
        //console.log("Left Stick - Up");
      }
    }
    else {
      current_axes["left"]["up"] = false;
      current_axes["left"]["down"] = false;
      gameStopAxe("up", "left");
      gameStopAxe("down", "left");
    }
    if (axes[2] == 1) {
      if (current_axes["right"]["right"] != true) {
        current_axes["right"]["right"] = true;
        current_axes["right"]["left"] = false;
        gamePressAxe("right", "right");
        gameStopAxe("left", "right");
        //console.log("Right Stick - Right");
      }
    }
    else if (axes[2] == -1) {
      if (current_axes["right"]["left"] != true) {
        current_axes["right"]["left"] = true;
        current_axes["right"]["right"] = false;
        gamePressAxe("left", "right");
        gameStopAxe("right", "left");
        //console.log("Right Stick - Left");
      }
    }
    else {
      current_axes["right"]["right"] = false;
      current_axes["right"]["left"] = false;
      gameStopAxe("right", "right");
      gameStopAxe("left", "right");
    }
    if (axes[3] == 1) {
      gamePressAxe("down", "right");
    }
    else if (axes[3] == -1) {
      gamePressAxe("up", "right");
    }
    for (var btn in navigator.getGamepads()[0].buttons) {
      if (navigator.getGamepads()[0].buttons[btn].pressed) {
        if (pressed_buttons[switch_buttons[btn]] != true) {
          pressed_buttons[switch_buttons[btn]] = true;
          gamePressButton(switch_buttons[btn]);
          //console.log(`Bouton ${switch_buttons[btn]}`)
        }
      }
      else {
        if (pressed_buttons[switch_buttons[btn]] != false) {
          pressed_buttons[switch_buttons[btn]] = false;
        }
      }
    }
  }
  requestAnimationFrame(gamepadLoop);
}

gamepadLoop();
