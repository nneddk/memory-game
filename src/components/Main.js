import React, { useEffect, useState } from "react";

const Main = () =>{
  const [collectedNumber, setCollectedNumber] = useState([]);
  const [text, setText] = useState('1');
  const addNumber = () =>{
    setCollectedNumber(collectedNumber.concat('1'));
    console.log(collectedNumber);

    setText('1');
  }
  useEffect(()=>{
    
    return () =>{
      
    };
  });

  return(
    <div id = 'main'>
      <button onClick={addNumber}>{text}</button>
    </div>
  );
};

export default Main;
