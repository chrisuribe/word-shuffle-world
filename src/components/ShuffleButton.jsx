import React from "react";
import Shuffle from "@material-ui/icons/Shuffle";
import RoundedButton from "./RoundedButton.jsx";

function ShuffleButton({ shuffleLetters }) {
  return (
    <RoundedButton
      onClick={() => {
        shuffleLetters();
      }}
    >
      <Shuffle />
    </RoundedButton>
  );
}

export default ShuffleButton;
