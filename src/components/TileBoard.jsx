import React from 'react';

function TileBoard({currentWord}) {
    return (
        <div className="tile-board">
            {currentWord.split("").map((letter)=><div className="tile" key={letter+Math.random()}>{letter}</div>)}
            

        </div>
    );
}

export default TileBoard;
