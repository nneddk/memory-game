import React, { useEffect, useState } from "react";

const App = () =>{
  const [collectedNumber, setCollectedNumber] = useState([]);
  const [text, setText] = useState('Change');
  const addNumber = () =>{
    setCollectedNumber(collectedNumber.concat('1'));
    console.log(collectedNumber);

    setText('Changed');
  }
  /*
  useEffect(()=>{


    return () =>{
    };
  },[]);
*/
  return(
    <div>
      <button onClick={addNumber}>{text}</button>
    </div>
  );
};

export default App;
