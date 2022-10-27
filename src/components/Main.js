import React, { useEffect, useState } from "react";
const randomWords = require('random-words');
let randomWordArray = randomWords(50);

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
        
        //Durstenfeld Shuffle
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
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
                startGame();
            }
        }
        
        const children = cardData.map((val)=>(
            React.createElement('button', {className: 'memory-card', key: val["key"], onClick: cardClick}, val['name'])
        ));
        return children;
      }

      const startGame = () =>{
        setIsGameReady(!isGameReady);
        console.log(isGameReady);
      }

      const startGameBtn = React.createElement('button', {className: 'start-game-btn', onClick: startGame, type: 'button'}, 'Start Game');
      let children = isGameReady?createMemoryCard(currentCards):startGameBtn;
    
  useEffect(()=>{
    console.log('render');
    return () =>{
      
    };
    
  },[isGameReady]);
  return(
    <div>
        <div id = 'score'>{score}</div>

        {React.createElement('div', {id: 'main'},children)}
    </div>
    
  );
};

export default Main;
