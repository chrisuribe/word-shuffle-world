import React from "react";

function TileBoard({ currentWord }) {
  return (
    <div className="tile-board-all">
      <div className="tile-board-all tile-board">
        {currentWord.split("").map((letter) => (
          <div
            className="tile-board-all tile-board tile"
            key={letter + Math.random()}
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="tile-board-all tile-board">
        {currentWord.split("").map((letter) => (
          <div
            className="tile-board-all tile-board tile"
            key={letter + Math.random()}
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="tile-board-all tile-board">
        {currentWord.split("").map((letter) => (
          <div
            className="tile-board-all tile-board tile"
            key={letter + Math.random()}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="tile-board-all tile-board">
        {currentWord.split("").map((letter) => (
          <div
            className="tile-board-all tile-board tile"
            key={letter + Math.random()}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="tile-board-all tile-board">
        {currentWord.split("").map((letter) => (
          <div
            className="tile-board-all tile-board tile"
            key={letter + Math.random()}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="tile-board-all tile-board">
        {currentWord.split("").map((letter) => (
          <div
            className="tile-board-all tile-board tile"
            key={letter + Math.random()}
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="tile-board-all tile-board">
        {currentWord.split("").map((letter) => (
          <div
            className="tile-board-all tile-board tile"
            key={letter + Math.random()}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TileBoard;
