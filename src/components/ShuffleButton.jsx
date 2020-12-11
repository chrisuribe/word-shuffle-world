import React from "react";
import Shuffle from "@material-ui/icons/Shuffle";
import RoundedButton from "./RoundedButton";

function ShuffleButton({ shuffleLetters }) {
  return (
    <RoundedButton
      onClick={(e) => {
        shuffleLetters();
      }}
    >
      <Shuffle />
    </RoundedButton>
  );
}

export default ShuffleButton;
