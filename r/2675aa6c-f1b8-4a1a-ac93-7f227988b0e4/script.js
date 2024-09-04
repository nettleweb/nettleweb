window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||

function (callback) {
  return window.setTimeout(callback, (1000 / 60));
}

let menu_sound_1 = new Audio('https://raw.githubusercontent.com/nickshillingford/nickshillingford.github.io/master/sounds/UI_Quirky29.mp3');
menu_sound_1.type = 'audio/mpeg';

let menu_sound_2 = new Audio('https://raw.githubusercontent.com/nickshillingford/nickshillingford.github.io/master/sounds/UI_Quirky30.mp3');
menu_sound_2.type = 'audio/mpeg';

let voice_1 = new Audio('https://raw.githubusercontent.com/nickshillingford/nickshillingford.github.io/master/sounds/well_done.mp3');
voice_1.type = 'audio/mpeg';

let voice_2 = new Audio('https://raw.githubusercontent.com/nickshillingford/nickshillingford.github.io/master/sounds/android.mp3');
voice_2.type = 'audio/mpeg';

let voice_3 = new Audio('https://raw.githubusercontent.com/nickshillingford/nickshillingford.github.io/master/sounds/baked.mp3');
voice_3.type = 'audio/mpeg';

let voice_4 = new Audio('https://raw.githubusercontent.com/nickshillingford/nickshillingford.github.io/master/sounds/wasting_time.mp3');
voice_4.type = 'audio/mpeg';

let transitionText = document.querySelector('#transitionText');
let transitionU = document.querySelector('#transitionU');
let transitionD = document.querySelector('#transitionD');

let container = document.querySelector('#container');
let menu = document.querySelector('#startMenu');
let select = document.querySelector('#select');
let credit = document.querySelector('#credit');
let title = document.querySelector('#title');
let about = document.querySelector('#about');

let op1 = document.querySelector('#opt1');
let op2 = document.querySelector('#opt2');
let op3 = document.querySelector('#opt3');
let op4 = document.querySelector('#opt4');

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let dict = {
  0: [37, 49.5],
  1: [36, 62.3],
  2: [35, 75.5]
}

var delay_1, delay_2, delay_3, delay_4;
var game = null;
var index = 0;

canvas.width = 400;
canvas.height = 400;

window.addEventListener('keydown', menuControl);

function menuControl(e) {
  switch (e.keyCode) {
    case 13:
      try { menu_sound_2.play(); }
      catch (error) {
        console.log(error);
      }
      selected();
      break;
    case 38:
      if (index != 0) {
        index--;
        select.style.left = dict[index][0] + '%';
        select.style.top = dict[index][1] + '%';
      }
      try { menu_sound_1.play(); }
      catch (error) {
        console.log(error);
      }
      break;
    case 40:
      if (index != 2) {
        index++;
        select.style.left = dict[index][0] + '%';
        select.style.top = dict[index][1] + '%';
      }
      try { menu_sound_1.play(); }
      catch (error) {
        console.log(error);
      }
      break;
  }
}

function selected() {
  switch (index) {
    case 0:
      start();
      break;
    case 1:
      aboutGame();
      break;
    case 2:
      credits();
      break;
  }
}

function back(e) {
  if (e.keyCode == 13) {
    window.removeEventListener('keydown', back);

    credit.style.visibility = 'hidden';
    about.style.visibility = 'hidden';
    op4.style.visibility = 'hidden';

    toggleOptions(true);

    select.style.top = '49.5%';
    select.style.left = '37%';
    index = 0;

    try { menu_sound_2.play(); }
    catch (error) {
      console.log(error);
    }
    window.addEventListener('keydown', menuControl);
  }
}

function start() {
  window.removeEventListener('keydown', menuControl);
  container.removeChild(container.children[4]);

  setTimeout(function() {
    transitionText.className = 'fadeOut';
  }, 2000);
  setTimeout(function() {
    transitionU.className = 'transition_u_out';
    transitionD.className = 'transition_d_out';
  }, 4200);

  game = new Engine();
  game.loadMap(map, 0, 20, 13, 4, 5);

  level1();
}

function aboutGame() {
  about.style.visibility = 'visible';
  manage();
}

function credits() {
  credit.style.visibility = 'visible';
  manage();
}

function toggleOptions(on) {
  let result = on ? 'visible' : 'hidden';

  title.style.visibility = result;
  op1.style.visibility = result;
  op2.style.visibility = result;
  op3.style.visibility = result;
}

function manage() {
  window.removeEventListener('keydown', menuControl);
  window.addEventListener('keydown', back);

  toggleOptions(false);

  op4.style.visibility = 'visible';
  select.style.left = '8.5%';
  select.style.top = '12.3%';
}

function transitionIn() {
  transitionU.style.height = '0px';
  transitionD.style.top = '101%';

  transitionU.className = 'transition_u_in';
  transitionD.className = 'transition_d_in';
}

function transitionOut() {
  transitionU.style.height = '201px';
  transitionD.style.top = '50%';

  transitionU.className = 'transition_u_out';
  transitionD.className = 'transition_d_out';
}

function resetPortals() {
  orange.open = false;
  blue.open = false;
}

function delayTransitionIn(delay) {
  setTimeout(function() {
    transitionIn();
  }, delay);
}

function delayTransitionOut(delay) {
  setTimeout(function() {
    transitionOut();
  }, delay);
}

function delayFadeIn(delay) {
  setTimeout(function() {
    transitionText.className = 'fadeIn';
  }, delay);
}

function delayMapLoad(delay, d) {
  setTimeout(function() {
    transitionText.style.opacity = 1;
    transitionText.className = 'fadeOut';

    game = new Engine();
    game.loadMap(map, d[0], d[1], d[2], d[3], d[4]);

    switch (d[0]) {
      case 1:
        level2();
        break;
      case 2:
        level3();
        break;
      case 3:
        level4();
        break;
    }
  }, delay);
}

function endLevel1() {
  transitionText.innerHTML = 'test chamber two';
  transitionText.style.opacity = 0;

  try {
    voice_1.play();
    delay_1 = 6000;
    delay_2 = 8000;
    delay_3 = 11000;
    delay_4 = 13000;
  }
  catch (error) {
    delay_1 = 0;
    delay_2 = 2000;
    delay_3 = 5000;
    delay_4 = 7000;
  }

  delayTransitionIn(delay_1);
  delayFadeIn(delay_2);

  delayMapLoad(delay_3, [1, 1, 2, 14, 5]);
  delayTransitionOut(delay_4);
}

function endLevel2() {
  transitionText.innerHTML = 'test chamber three';
  transitionText.style.left = '26.2%';
  transitionText.style.opacity = 0;

  try {
    voice_2.play();
    delay_1 = 10000;
    delay_2 = 12000;
    delay_3 = 15000;
    delay_4 = 17000;
  }
  catch (error) {
    delay_1 = 0;
    delay_2 = 2000;
    delay_3 = 5000;
    delay_4 = 7000;
  }

  delayTransitionIn(delay_1);
  delayFadeIn(delay_2);

  delayMapLoad(delay_3, [2, 14, 20, 21, 2]);
  delayTransitionOut(delay_4);
}

function endLevel3() {
  transitionText.innerHTML = 'test chamber four';
  transitionText.style.left = '27.5%';
  transitionText.style.opacity = 0;

  try {
    voice_3.play();
    delay_1 = 7100;
    delay_2 = 9100;
    delay_3 = 12100;
    delay_4 = 14100;
  }
  catch (error) {
    delay_1 = 0;
    delay_2 = 2000;
    delay_3 = 5000;
    delay_4 = 7000;
  }

  delayTransitionIn(delay_1);
  delayFadeIn(delay_2);

  delayMapLoad(delay_3, [3, 18, 18, 2.5, 2]);
  delayTransitionOut(delay_4);
}

function endLevel4() {
  transitionText.innerHTML = 'thanks for playing';
  transitionText.style.opacity = 0;

  try {
    voice_4.play();
    delay_1 = 2200;
    delay_2 = 4400;
  }
  catch (error) {
    delay_1 = 0;
    delay_2 = 2200;
  }

  delayTransitionIn(delay_1);
  delayFadeIn(delay_2);
}

function level1() {
  if (!map.complete_1) {
    game.draw(ctx);
    game.update(ctx);

    window.requestAnimFrame(level1);
  }
  else {
    resetPortals();
    endLevel1();
  }
}

function level2() {
  if (!map.complete_2) {
    game.draw(ctx);
    game.update(ctx);

    window.requestAnimFrame(level2);
  }
  else {
    resetPortals();
    endLevel2();
  }
}

function level3() {
  if (!map.complete_3) {
    game.draw(ctx);
    game.update(ctx);

    window.requestAnimFrame(level3);
  }
  else {
    resetPortals();
    endLevel3();
  }
}

function level4() {
  if (!map.complete_4) {
    game.draw(ctx);
    game.update(ctx);

    window.requestAnimFrame(level4);
  }
  else {
    endLevel4();
  }
}