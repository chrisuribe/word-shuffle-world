import React, { useState } from "react";

const useDisplayWSW = () => {
  const [displayLetters, setDisplayLetters] = useState("");
  //const [displayLetterRemoved, setDisplayLetterRemoved] = useState("");

  const addDisplayLetter = (newLetter) =>
    setDisplayLetters(displayLetters + newLetter);

  const clearDisplay = () => setDisplayLetters("");

  const removeDisplayLetter = () => {
    setDisplayLetters(displayLetters.slice(0, displayLetters.length - 1)); // update letter removed state
  };

  const BuildDisplay = () => (
    <div className="display">{displayLetters} &nbsp;</div>
  );

  return [
    displayLetters,
    setDisplayLetters,
    BuildDisplay,
    addDisplayLetter,
    clearDisplay,
    removeDisplayLetter,
  ];
};

export default useDisplayWSW;
