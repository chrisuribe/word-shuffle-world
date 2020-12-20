import React from "react";

function TileBoard({ currentWords, guessedWords, bonusLetters }) {
  //'console.log(currentWords);

  const guessedWord = (word) => {
    return guessedWords.includes(word);
  };

  const bonusLetter = (letter) => {
    return bonusLetters.includes(letter);
  };

  return (
    <div className="tile-board-all">
      {currentWords.map((currentWord, index) => {
        return (
          <div className="tile-board-all tile-board " key={currentWord + index}>
            {currentWord.split("").map((letter, index) => {
              let tileBoardTileClass = "tile-board-all tile-board tile";
              if (bonusLetter(letter)) {
                tileBoardTileClass += " bonus-letter ";
              }
              if (guessedWord(currentWord)) {
                tileBoardTileClass += " guessed-word ";
              }
              return (
                <div className={tileBoardTileClass} key={letter + index}>
                  {guessedWord(currentWord) || bonusLetter(letter)
                    ? letter
                    : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default TileBoard;
