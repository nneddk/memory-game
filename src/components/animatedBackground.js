import React  from "react";

const AnimatedList = () =>{
    function getRandomInt(max, floor) {
        return Math.floor(Math.random() * max + floor);
    }
    const shapeChildren = [];
    for(let i = 0; i<100; i++){
        let hw = getRandomInt(5, 1)+'vmin'
        const shape = React.createElement('li', {key: i+'al', style: {
            left: getRandomInt(93, 0)+'vw',
            top: getRandomInt(70, 10)+'vh',
            width: hw,
            height:hw,
            animationDuration: getRandomInt(10,5)+'s'
        }});
        shapeChildren.push(shape);
    }

    return(
        <ul className = 'shapes'>
            {shapeChildren}
        </ul>
    );
};

export default AnimatedList;