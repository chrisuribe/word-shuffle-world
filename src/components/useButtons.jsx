import React, { useState } from "react";

const useButtons = (word) => {
  const [cWord, setCurrentWord] = useState(word);
  const [display, setDisplay] = useState("");

  const addLetter = (newLetter) => setCurrentWord(newLetter + cWord);
  const externalSetWord = (word) => setCurrentWord(word);

  const WordButtons = () => (
    <div>
      {cWord.split("").map((letter, index) => (
        <button
          key={letter + index}
          value={letter}
          onClick={(button) => {
            setDisplay(display + button.target.value);
            setCurrentWord(cWord.replace(button.target.value, ""));
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );

  const NewDisplay = () => (
    <div>
      <div>{display}</div>
      <button
        onClick={() => {
          setCurrentWord(
            cWord + display.slice(display.length - 1, display.length)
          );
          setDisplay(display.slice(0, display.length - 1));
        }}
      >
        Return letter
      </button>
    </div>
  );

  return [cWord, WordButtons, externalSetWord, addLetter, NewDisplay];
};

export default useButtons;
