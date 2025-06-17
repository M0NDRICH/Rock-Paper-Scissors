
// Global Variables
export const score = JSON.parse(localStorage.getItem('score'))||{
  win: 0,
  loss: 0,
  tie: 0
}
var isDefaultDisplayRunning = false;
var clearIdForDD; // clear id for default display

// Functions
export function renderDefaultDisplay(){
  const container = document.querySelector('.js-display-area');

  const html = `
        <div class="title-display">
          <p>Rock, Paper, Scissor</p>
          <p>PLAY!</p>
        </div>
  `;

  if(!isDefaultDisplayRunning){

    clearIdForDD = setInterval(()=>{
      if(container.innerHTML === html){
        container.innerHTML = '';
      } else {
        container.innerHTML = html;
      }
    }, 900);

    container.innerHTML = '';
    isDefaultDisplayRunning = true;
  }else{
    clearInterval(clearIdForDD);
    isDefaultDisplayRunning = false;
  }

}

export function saveToStorage(){
  localStorage.setItem('score', JSON.stringify(score));
}

export function renderScore(){
  const displayArea = document.querySelector('.js-score-area');

  const scoreInfo = `Win: ${score.win} Loss: ${score.loss} Tie: ${score.tie}`;

  displayArea.innerText = scoreInfo;
}

export function resetScore(){
  score.win  = 0;
  score.loss = 0;
  score.tie  = 0;

  saveToStorage();
}

export function renderGameResult(resultOfGame, pMove, cMove){
  const displayArea = document.querySelector('.js-display-area');
  const result      = getResult(resultOfGame);

  const html = `
        <div class="game-result js-game-result">
          <p>"${result}"</p>
          <div class="pick-display-area">
            <div class="pick your-pick">
              <img src="images/${pMove}-emoji.png" alt="your pick">
              <p>Your Pick</p>
            </div>
            <div class="pick computer-pick">
              <img src="images/${cMove}-emoji.png" alt="computer's pick">
              <p>Computer's pick</p>
            </div>
          </div>
        </div> 
  `;

  displayArea.innerHTML = html;
}

function getResult(param){
  let result;

  switch(param){
    case 'win':
      result = 'You Win!';
      break;
    case 'loss':
      result = 'You Lose!';
      break;
    case 'tie':
      result = 'It\'s a Tie!';
      break;
    default:
      result = 'I Can\'t Tell';
  }

  return result;
}

export function renderPopUpMsg(){
  const displayArea = document.querySelector('.js-box-container');

  const html = `
      <div class="message-pop-up js-pop-up-msg" >
        <p>Reset the score?</p>
        <div class="msg-button">
          <button class="msg-yes-btn js-yes-btn">Yes</button>
          <button class="msg-no-btn js-no-btn">No</button>
        </div>
      </div>
  `;

  displayArea.insertAdjacentHTML("beforeend", html);

  const yesBtn     = document.querySelector('.js-yes-btn');
  const noBtn      = document.querySelector('.js-no-btn');
  const displayMsg = document.querySelector('.js-game-result');


  yesBtn.addEventListener('click', ()=>{
    resetScore();
    saveToStorage();
    renderScore();
    hidePopUpMsg();
    displayMsg && displayMsg.remove();
    !isDefaultDisplayRunning && renderDefaultDisplay();
    revertButtonFunctions();
  });

  noBtn.addEventListener('click', ()=>{
    hidePopUpMsg();
    revertButtonFunctions();
  });

  disableButtonFunctions();
}

function hidePopUpMsg(){
  const msg = document.querySelector('.js-pop-up-msg');
  msg.remove();
}

export function disableDefaultDisplay(){
  isDefaultDisplayRunning = true;
  renderDefaultDisplay();
}

function disableButtonFunctions(){
  const moveButton   = document.querySelectorAll('.js-move-button');
  const otherButtons = document.querySelector('.js-other-buttons');

  moveButton.forEach((btn)=>{
    btn.setAttribute('inert', '');
  });
  otherButtons.setAttribute('inert', '');

}

function revertButtonFunctions(){
  const moveButton   = document.querySelectorAll('.js-move-button');
  const otherButtons = document.querySelector('.js-other-buttons');

  moveButton.forEach((btn)=>{
    btn.removeAttribute('inert');
  });
  otherButtons.removeAttribute('inert');
}

(function (){
  renderDefaultDisplay();
  renderScore();
})()
