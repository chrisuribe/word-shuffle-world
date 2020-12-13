import React, { useEffect } from "react";

const KeyProcessor = (props) => {
  const handleKeyDown = (e) => {
    //console.log(props, e);
    const {
      display,
      setDisplay,
      processDisplayWord,
      removeLetter,
      oneDisplayToButtons,
      getButtonLetters,
    } = props;

    if (e.key === "Enter" && display !== "") processDisplayWord(display);
    else if (e.key === "Backspace") {
      oneDisplayToButtons();
    }
    // process word
    // else if key is letterin word, then add to display.
    else if (
      getButtonLetters()
        .split("")
        .some((letter) => letter === e.key)
    ) {
      //console.log(`You typed: ${e.key} The word is: ${currentWord}`);
      setDisplay(display + e.key);
      removeLetter(e.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // Anything in here is fired on component unmount.
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return <div></div>;
};

export default KeyProcessor;
