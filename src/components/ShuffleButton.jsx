import React from "react";
import Shuffle from "@material-ui/icons/Shuffle";
import RoundedButton from "./RoundedButton";

function ShuffleButton({ shuffleTiles }) {
  return (
    <RoundedButton
      onClick={(e) => {
        shuffleTiles();
      }}
    >
      <Shuffle />
    </RoundedButton>
  );
}

export default ShuffleButton;
