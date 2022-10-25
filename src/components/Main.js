import React, { useEffect, useState } from "react";

const Main = () =>{
    
    const [currentCards, setCurrentCards] = useState(5);
    const [selectedCards, setSelectedCards] = useState([]);
    //creates the memory cards
    const createMemoryCard = (dataLimit) =>{
        let cardData = [];
        for(let i = 0; i<dataLimit; i++){
            cardData.push({key:i, name:i});
        }

        cardData = shuffleArray(cardData);

        const cardClick = (e) =>{
            let value = e.target.innerHTML;
            if (!selectedCards.includes(value)){
                //lazy way to do this
                setSelectedCards(selectedCards.concat(value));
                setCurrentCards(currentCards + 1);
                cardData = shuffleArray(cardData);
            }
        }

        //Durstenfeld Shuffle
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const children = cardData.map((val)=>(
            React.createElement('button', {key: val["key"], onClick: cardClick}, val['name'])
        ));
        
        return children;
      }
      let children = createMemoryCard(currentCards);

  useEffect(()=>{
    console.log(selectedCards);
    return () =>{
      
    };
    
  },[currentCards, selectedCards]);

  return(
    React.createElement('div', {id: 'main'}, children)
  );
};

export default Main;
