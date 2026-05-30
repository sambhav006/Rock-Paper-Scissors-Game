let  userScore=0;
let compScore=0;


const choices = document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");
const battleText = document.querySelector("#battle-text");
const leftFight = document.querySelector("#left-fight");
const rightFight = document.querySelector("#right-fight");
const popup = document.querySelector("#popup");
const winnerText = document.querySelector("#winner-text");
const playAgainBtn = document.querySelector("#play-again-btn");
const restartBtn = document.querySelector("#restart-btn");

const genCompChoice=()=>{
    const options=["Rock","Paper","Scissors"];
    const randIdx=Math.floor(Math.random()*3);
    return options[randIdx];
};

const gameDraw=()=>{
    msg.innerText="Draw.Play again";
    msg.style.backgroundColor="#081b31";
};

const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        if(userScore === 5){
            endGame("You");
        }
        msg.innerText=`You win. ${userChoice} beats ${compChoice}  ! `;
        msg.style.backgroundColor="green";
    
}
    else
    {
        compScore++;
       compScorePara.innerText=compScore;
       if(compScore === 5){
        endGame("Computer");
    }
       msg.innerText=`You Lost. ${compChoice} beats ${userChoice} `;
       msg.style.backgroundColor="red";

    }
};
const showFightAnimation = (userChoice, compChoice, userWin) => {

    leftFight.src = `./images/${userChoice.toLowerCase()}.png`;
    rightFight.src = `./images/${compChoice.toLowerCase()}.png`;

    leftFight.className = "";
    rightFight.className = "";

    if(userWin){

        leftFight.classList.add("left-attack");
        leftFight.classList.add("winner");

        rightFight.classList.add("loser");

        if(userChoice === "Rock"){
            rightFight.classList.add("crush");
        }

        else if(userChoice === "Paper"){
            rightFight.classList.add("wrap");
        }

        else{
            rightFight.classList.add("cut");
        }

    }

    else{

        rightFight.classList.add("right-attack");
        rightFight.classList.add("winner");

        leftFight.classList.add("loser");

        if(compChoice === "Rock"){
            leftFight.classList.add("crush");
        }

        else if(compChoice === "Paper"){
            leftFight.classList.add("wrap");
        }

        else{
            leftFight.classList.add("cut");
        }
    }
};
const launchConfetti = () => {

    const duration = 3000;

    const end = Date.now() + duration;

    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];

    (function frame() {

        confetti({
            particleCount: 7,
            angle: 60,
            spread: 80,
            origin: { x: 0 },

            colors: colors
        });

        confetti({
            particleCount: 7,
            angle: 120,
            spread: 80,
            origin: { x: 1 },

            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }

    })();
};
const endGame = (winner) => {

    popup.classList.remove("hide");

    if(winner === "You"){

        winnerText.innerText = "You won the game!";

        launchConfetti();
    }

    else{

        winnerText.innerText = "Oops! You lost, Computer wins";

    }

};  
const resetGame = () => {

    userScore = 0;
    compScore = 0;

    userScorePara.innerText = 0;
    compScorePara.innerText = 0;

    msg.innerText = "Play your move";

    msg.style.backgroundColor = "#081b31";

    popup.classList.add("hide");

    leftFight.src = "./images/rock.png";
    rightFight.src = "./images/paper.png";

    leftFight.className = "";
    rightFight.className = "";

};
    const playGame=(userChoice)=>{
        if(userScore === 5 || compScore === 5){
             return;
            }
        const compChoice=genCompChoice();

       if(userChoice === compChoice)
        {

            leftFight.src = `./images/${userChoice.toLowerCase()}.png`;
            rightFight.src = `./images/${compChoice.toLowerCase()}.png`;

            leftFight.className = "";
            rightFight.className = "";

            gameDraw();

        }
else
{
    let userWin=true;
    if(userChoice==="Rock")
        {
        //scissors,paper
        userWin = compChoice ===  "Paper" ? false : true;

    }
    else if(userChoice === "Paper" )
        {
        //scissors,rock
        userWin = compChoice === "Scissors" ? false : true;
    }
    else
    {
        //rock,paper
        userWin = compChoice === "Rock" ?  false : true;
        

    }
    showFightAnimation(userChoice, compChoice, userWin);
    showWinner(userWin,userChoice,compChoice);
}
};

choices.forEach((choice)=>{
    choice.addEventListener("click", () => {
      const userChoice= choice.getAttribute("id");
     playGame(userChoice);


    });
});

restartBtn.addEventListener("click", resetGame);

playAgainBtn.addEventListener("click", resetGame);