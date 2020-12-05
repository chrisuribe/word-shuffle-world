import React from "react";
import ClassNames from "./ClassNames";

function ButtonWSW({ setDisplay, getDisplay, word }) {
  const updateButton = (e) => {
    setDisplay(getDisplay + e.target.textContent);
  };

  var buttons = word.split("").map((element) => (
    <ClassNames
      name={element}
      key={element + Math.random()}
      variant="contained"
      color="primary"
      onClick={(e) => {
        updateButton(e);
      }}
      word={word}
    >
      {element}
    </ClassNames>
  ));

  return (
    <div className="tile-holder">
      <div className="tile-holder__side"></div>
      <div className="tile-holder__tiles">{buttons}</div>
      <div className="tile-holder__side"></div>
    </div>
  );
}

export default ButtonWSW;
