import * as displayModule from './display.js'

// Global Variables
var playerMove;
var computerMove;
var isAutoPlayRunning = false;
var clearIdForAP; // clear id for auto play

function gameButtons(){
  const button      = document.querySelectorAll('.js-move-button');
  const resetBtn    = document.querySelector('.js-reset-button');
  const autoPlayBtn = document.querySelector('.js-auto-play-button');

  button.forEach((button)=>{
    const move = button.dataset.move;
    button.addEventListener('click',()=>{
      playerMove   = move;
      computerMove = pickRandomMove();
      let result   = executeGame(playerMove, computerMove);
      displayModule.renderGameResult(result, playerMove, computerMove);
      displayModule.saveToStorage();
      displayModule.disableDefaultDisplay();
    });
  });

  resetBtn.addEventListener('click', ()=>{
    displayModule.isDefaultDisplayRunning && disableAutoPlay();
    displayModule.renderPopUpMsg();
  });

  autoPlayBtn.addEventListener('click', ()=>{
    displayModule.disableDefaultDisplay();
    executeAutoPlay();
  });

}

function executeGame(playerMove, computerMove){
  let result;

  if(playerMove === 'rock'){
    switch(computerMove){
      case 'rock':
        result = 'tie';
        displayModule.score.tie++;
        displayModule.renderScore();
        break;
      case 'paper':
        result = 'loss';
        displayModule.score.loss++;
        displayModule.renderScore();
        break;
      case 'scissors':
        result = 'win';
        displayModule.score.win++;
        displayModule.renderScore();
        break;
      default:
        result = '';
    }
  } else if(playerMove === 'paper'){
    switch(computerMove){
      case 'rock':
        result = 'win';
        displayModule.score.win++;
        displayModule.renderScore();
        break;
      case 'paper':
        result = 'tie';
        displayModule.score.tie++;
        displayModule.renderScore();
        break;
      case 'scissors':
        result = 'loss';
        displayModule.score.loss++;
        displayModule.renderScore();
        break;
      default:
        result = '';
    }
  } else if(playerMove === 'scissors'){
    switch(computerMove){
      case 'rock':
        result = 'loss';
        displayModule.score.loss++;
        displayModule.renderScore();
        break;
      case 'paper':
        result = 'win';
        displayModule.score.win++;
        displayModule.renderScore();
        break;
      case 'scissors':
        result = 'tie';
        displayModule.score.tie++;
        displayModule.renderScore();
        break;
      default:
        result = '';
    }
  }

  return result;
}

function pickRandomMove(){
  const pick = Math.random();
  let   result;

  if(pick >= 0 && pick < 1/3){
    result = 'rock';
  } else if(pick >= 1/3 && pick < 2/3){
    result = 'paper';
  } else if(pick >= 2/3 && pick <= 1){
    result = 'scissors'
  }

  return result;
}

function executeAutoPlay(){
  doPlayOwn();

  if(!isAutoPlayRunning){
    clearIdForAP = setInterval(()=>{
      doPlayOwn();
    }, 1500);
    isAutoPlayRunning = true;

  } else {
    clearInterval(clearIdForAP);
    isAutoPlayRunning = false;
  }
}

function disableAutoPlay(){
  isAutoPlayRunning = true;
  executeAutoPlay();
}

function doPlayOwn(){
  const playerMove   = pickRandomMove();
  const computerMove = pickRandomMove();
  const result       = executeGame(playerMove, computerMove);

  displayModule.renderGameResult(result, playerMove, computerMove);
  displayModule.saveToStorage();
  displayModule.disableDefaultDisplay();
}

(function(){
  gameButtons();
})()