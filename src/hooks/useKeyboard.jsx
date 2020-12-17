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
        onClick={(button) => {
          const { data: letterClicked } = button.target.firstChild;
          removeKey(letterClicked);
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
