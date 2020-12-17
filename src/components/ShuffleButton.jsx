import React from "react";
import Shuffle from "@material-ui/icons/Shuffle";
import RoundedButton from "./RoundedButton.jsx";

function ShuffleButton({ shuffleKeyboard }) {
  return (
    <RoundedButton
      onClick={() => {
        shuffleKeyboard();
      }}
    >
      <Shuffle />
    </RoundedButton>
  );
}

export default ShuffleButton;
