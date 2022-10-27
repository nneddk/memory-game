import React  from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import AnimatedList from "./components/animatedBackground";
import './components/styles/App.css'

const App = () =>{

  return(
    <>
      <AnimatedList/>
      <Header/>
      <Main/>
      <Footer/>
      
      
    </>
  );
};

export default App;
