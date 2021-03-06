import React, { useEffect } from "react";

const KeyProcessor = (props) => {
  const handleKeyDown = (e) => {
    //console.log(props, e);
    const {
      display,
      setDisplay,
      processDisplayWord,
      removeKey,
      oneDisplayToButtons,
      getKeyboard,
      keyProcessorDisabled,
    } = props;

    if (e.key === "Enter" && display() !== "" && !keyProcessorDisabled)
      processDisplayWord(display());
    else if (e.key === "Backspace") {
      oneDisplayToButtons();
    }
    // process word
    // else if key is letterin word, then add to display.
    else if (
      getKeyboard() // !!!--- switch this
        .split("")
        .some((letter) => letter === e.key)
    ) {
      //console.log(`You typed: ${e.key} The word is: ${currentWord}`);
      setDisplay(display() + e.key);
      removeKey(e.key); // !!-- switch this
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
