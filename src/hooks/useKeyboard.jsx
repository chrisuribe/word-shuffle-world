import React, { useState } from "react";
import ClassNames from "../components/ClassNames.jsx";
import { wordShuffle } from "../services/StringManipulator";

const useKeyboard = (addDisplayLetter) => {
  const [keyboard, setKeyboard] = useState("");

  const addKey = (newKey) => setKeyboard(keyboard + newKey);

  const removeKey = (keyClicked) => {
    setKeyboard(keyboard.replace(keyClicked, ""));
    addDisplayLetter(keyClicked);
  };

  const shuffleKeyboard = (newKeyboard) => {
    newKeyboard
      ? setKeyboard(wordShuffle(newKeyboard))
      : setKeyboard(wordShuffle(keyboard));
  };

  const getKeyboard = () => keyboard;

  const countLetters = (letters, letter) => {
    return letters.match(new RegExp(letter, "g") || []).length;
  };

  function findUniqueCharacters(string) {
    var unique = "";
    for (var i = 0; i < string.length; i++) {
      if (unique.indexOf(string[i]) == -1) {
        unique += string[i];
      }
    }
    return unique;
  }

  const keyboardBuilder = () => {
    let kb = findUniqueCharacters(keyboard);

    return kb.split("").map((letter, index) => (
      <ClassNames
        key={letter + index}
        value={letter}
        onClick={(button) => {
          // I"m sure there is a better way to do this...later. If the button classnames are modified, this will need to be updated.
          // I just didn't have time to figure out a more elegant way to fix this. For the purposes of the game this will work.
          // the goal is simple. Hunt down the button's letter.

          let buttonLetter = "~";
          if (button.target.className === "MuiButton-label")
            buttonLetter = button.target.innerText.toLowerCase().charAt(0);

          if (button.target.className === "ClassNames-letter-3")
            buttonLetter = button.target.firstChild.data;

          if (
            button.target.className ===
            "MuiButtonBase-root MuiButton-root MuiButton-text ClassNames-root-2"
          )
            buttonLetter = button.target.innerText.toLowerCase().charAt(0);

          if (
            button.target.className === "numberArea" ||
            button.target.className === "ClassNames-number-4"
          )
            buttonLetter = button.target.parentElement.parentElement.innerText
              .toLowerCase()
              .charAt(0);

          removeKey(buttonLetter);
        }}
        keysAvailable={countLetters(keyboard, letter)}
      >
        {letter}
      </ClassNames>
    ));
  };

  const BuildKeyboard = () => (
    <div className="tile-holder">
      <div className="tile-holder__side"></div>
      <div className="tile-holder__tiles">{keyboardBuilder()}</div>
      <div className="tile-holder__side"></div>
    </div>
  );

  return [
    BuildKeyboard,
    shuffleKeyboard,
    addKey,
    removeKey,
    setKeyboard,
    getKeyboard,
  ];
};

export default useKeyboard;
