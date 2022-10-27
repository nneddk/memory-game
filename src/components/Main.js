import React, { useEffect, useState } from "react";
const randomWords = require('random-words');
let randomWordArray = randomWords(50);
let bestScore = 0;


//Durstenfeld Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
}

const Main = () =>{
    const [currentCards, setCurrentCards] = useState(5);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isGameReady, setIsGameReady] = useState(0);
    const [score, setScore] = useState(0);
    
    
    const createMemoryCard = (limit) =>{
        let cardData = [];
        //creates the memory cards
        for(let i = 0; i<limit; i++){
            cardData.push({key:i, name:randomWordArray[i]});
        }
        
        
        cardData= shuffleArray(cardData);
        

        const cardClick = (e) =>{
            
            let value = e.target.innerHTML;
            if (!selectedCards.includes(value)){
                setScore(score + 1);
                //lazy way to do this
                setSelectedCards(selectedCards.concat(value));
                setCurrentCards(currentCards + 1);
                cardData = shuffleArray(cardData);
            }else{
                if(score>bestScore) bestScore = score;
                startGame();
                
            }
            
        }
        
        const children = cardData.map((val)=>(
            React.createElement('button', {className: 'memory-card', key: val["key"], onClick: cardClick}, val['name'])
        ));

        if(score === 3){
            bestScore = score;
            startGame();
        }
        return children;
      }

      const startGame = () =>{
        setIsGameReady(!isGameReady);
      }

      let startGameDesc = 'test';

      const currentScore = React.createElement('div', {key: 'score', className: 'current-score'}, score);
      const startGameInstructions = React.createElement('div', {key: 'startGameDesc', className: 'start-game-desc'}, startGameDesc);
      const startGameBtn = React.createElement('button', {key: 'startGameBtn', className: 'start-game-btn', onClick: startGame, type: 'button'}, 'Start Game');
      const showBestScore =  React.createElement('div', {key: 'showBestScore', className: 'best-score'}, 'Your Best Score is: '+bestScore);
      let children = isGameReady?[currentScore, createMemoryCard(currentCards)]:[showBestScore,startGameInstructions, startGameBtn];
    
  useEffect(()=>{
    
    
    return () =>{
        setCurrentCards(5);
        setSelectedCards([]);
        setScore(0);
        randomWordArray = shuffleArray(randomWordArray);
    };
    
  },[isGameReady]);
  return(
    <div>
        {React.createElement('div', {id: 'main'},children)}
    </div>
    
  );
};

export default Main;
