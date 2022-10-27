import React, { useEffect, useState } from "react";
import './styles/startGameScreen.css';
import './styles/playGameScreen.css';


const randomWords = require('random-words');
let randomWordArray = randomWords(50);

let bestScore = JSON.parse(localStorage.getItem("best-score") || "[0]");;

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
                if(currentCards < 50){
                    setCurrentCards(currentCards + 1);
                }
                cardData = shuffleArray(cardData);
            }else{
                
                if(score>bestScore) bestScore = score;
                localStorage.setItem("best-score",JSON.stringify(score));
                startGame();     
            }
            
        }
        
        const children = cardData.map((val)=>(
            React.createElement('button', {className: 'memory-card', key: val["key"], onClick: cardClick}, val['name'])
        ));

        if(score === 50){
            bestScore = score;
            localStorage.setItem("best-score",JSON.stringify(score));
            startGame();
        }
        return children;
      }

      const startGame = () =>{
        setIsGameReady(!isGameReady);
      }

      const startGameScreen = () =>{
        let startGameDesc = "Rule: Don't click on the same word twice";
        const showBestScore =  React.createElement('div', {key: 'showBestScore', className: 'best-score'}, 'Your Best Score is: '+bestScore);
        const startGameInstructions = React.createElement('div', {key: 'startGameDesc', className: 'start-game-desc'}, startGameDesc);
        const startGameBtn = React.createElement('button', {key: 'startGameBtn', className: 'start-game-btn', onClick: startGame, type: 'button'}, 'Start Game');
        const startGameScreen = React.createElement('div',{key:'start-game-screen', className: 'start-game-screen'},[showBestScore, startGameInstructions, startGameBtn]);
        return startGameScreen;
      }

      const playGameScreen = () =>{
        const currentScore = React.createElement('div', {key: 'score', className: 'current-score'}, 'Current Score: '+score);
        const memoryCards = React.createElement('div', {key: 'memoryCards', className: 'memory-card-grid'}, createMemoryCard(currentCards));
        const playGameScreen = React.createElement('div',{key:'playGameScreen', className: 'play-game-screen'},[currentScore, memoryCards]);
        
        return playGameScreen;
        
      }
      
      let children = isGameReady?playGameScreen():startGameScreen();
      
    
  useEffect(()=>{
    return () =>{
        setCurrentCards(5);
        setSelectedCards([]);
        setScore(0);
        randomWordArray = shuffleArray(randomWordArray);
    };
    
  },[isGameReady]);
  return(
    React.createElement('div', {id: 'main'},children)
    
  );
};

export default Main;
