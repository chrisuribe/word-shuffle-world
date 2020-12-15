import React from "react";

function TileBoard({ currentWords }) {
  //'console.log(currentWords);

  return (
    <div className="tile-board-all">
      {currentWords.map((currentWord, index) => (
        <div className="tile-board-all tile-board" key={currentWord + index}>
          {currentWord.split("").map((letter, index) => (
            <div
              className="tile-board-all tile-board tile"
              key={letter + index}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TileBoard;
