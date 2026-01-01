let score=JSON.parse(localStorage.getItem('score')) || {
                wins:0,
                losses:0,
                ties:0
            };
document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
/*if(!score){
    score={
        wins:0,
        losses:0,
        ties:0
    };
}*/
document.body.addEventListener('keydown',(event) => {
    if(event.key==='r'){
        game('rock');
    }
    else if(event.key==='p'){
        game('paper');
    }
    else if(event.key==='s'){
        game('scissors');
    }
    if(event.key==='Backspace'){
        resetScore();
    }
});
const resetconfirmElement=document.querySelector('.js-reset-confirmation');
function resetScore(){
    resetconfirmElement.innerHTML=`Are you sure you want to reset the score?
                                <button class="js-yes-button yes-button">
                                    Yes
                                </button>
                                <button class="js-no-button no-button">
                                    No
                                </button>`;
    document.querySelector('.js-yes-button').addEventListener('click',() => {
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
        resetconfirmElement.innerHTML='';
    });
    document.querySelector('.js-no-button').addEventListener('click',() => {
        resetconfirmElement.innerHTML='';
    });
    
}
document.querySelector('.js-rock-button')
            .addEventListener('click',() => {
                game('rock');
            });
document.querySelector('.js-paper-button')
            .addEventListener('click',() => {
                game('paper');
            });
document.querySelector('.js-scissors-button')
            .addEventListener('click',() => {
                game('scissors');
            });
document.querySelector('.js-reset-button')
            .addEventListener('click',() => {
                resetScore();
            });
const autoPlayElement=document.querySelector('.js-autoplay-button');
autoPlayElement.addEventListener('click',() => {
                autoPlay();
            });
let isAutoPlaying=false;
let intervalId;
function autoPlay(){
    if(!isAutoPlaying){
        autoPlayElement.innerHTML='Stop Playing';
        intervalId=setInterval(function(){
            let playerMove=pickComputerMove();
            game(playerMove);
        },1000);
        isAutoPlaying=true;
    }
    else{
        autoPlayElement.innerHTML='Auto Play';
        clearInterval(intervalId);
        isAutoPlaying=false;
    }
}
function game(yourMove){
    const computerMove=pickComputerMove();
    let result;
    if(computerMove==='rock'){
        if(yourMove==='rock'){
            result='Tie.';
            score.ties+=1;
        }
        else if(yourMove==='paper'){
            result='You win.';
            score.wins+=1;
        }
        else{
            result='You lose.';
            score.losses+=1;
        }
    }
    else if(computerMove==='paper'){
        if(yourMove==='rock'){
            result='You lose.';
            score.losses+=1;
        }
        else if(yourMove==='paper'){
            result='Tie.';
            score.ties+=1;
        }
        else{
            result='You win.';
            score.wins+=1;
        }
    }
    else{
        if(yourMove==='rock'){
            result='You win.';
            score.wins+=1;
        }
        else if(yourMove==='paper'){
            result='You lose.';
            score.losses+=1;
        }
        else{
            result='Tie.';
            score.ties+=1;
        }
    }
    localStorage.setItem('score',JSON.stringify(score));
    document.querySelector('.js-result').innerHTML=result;
    document.querySelector('.js-moves').innerHTML=`You <img src="images/${yourMove}-emoji.png" class="move-icon">  <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
    document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function pickComputerMove(){
    const randomNumber=Math.random();
    let computerMove;
    if(randomNumber>=2/3){
        computerMove='scissors';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove='paper';
    }
    else{
        computerMove='rock';
    }
    return computerMove;
}