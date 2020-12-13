import React, { useState } from "react";
import ClassNames from "../components/ClassNames.jsx";
import { wordShuffle } from "../services/StringManipulator";

const useButtonsWSW = (addDisplayLetter) => {
  const [letters, setLetters] = useState("");

  const addLetter = (newLetter) => setLetters(letters + newLetter);

  const removeLetter = (letterClicked) => {
    setLetters(letters.replace(letterClicked, ""));
    addDisplayLetter(letterClicked);
  };

  const shuffleLetters = (newWord) => {
    newWord
      ? setLetters(wordShuffle(newWord))
      : setLetters(wordShuffle(letters));
  };

  const getButtonLetters = () => letters;

  const BuildLetters = () => (
    <div className="tile-holder">
      <div className="tile-holder__side"></div>
      <div className="tile-holder__tiles">
        {letters.split("").map((letter, index) => (
          <ClassNames
            key={letter + index}
            onClick={(button) => {
              const { data: letterClicked } = button.target.firstChild;
              removeLetter(letterClicked);
            }}
          >
            {letter}
          </ClassNames>
        ))}
      </div>
      <div className="tile-holder__side"></div>
    </div>
  );

  return [
    setLetters,
    getButtonLetters,
    BuildLetters,
    addLetter,
    shuffleLetters,
    removeLetter,
  ];
};

export default useButtonsWSW;
