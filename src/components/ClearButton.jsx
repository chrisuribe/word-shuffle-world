import React from "react";
import Clear from "@material-ui/icons/Clear";
import RoundedButton from "./RoundedButton";

const ClearButton = ({ displayToButtons }) => {
  return (
    <RoundedButton
      onClick={() => {
        displayToButtons();
      }}
    >
      <Clear></Clear>
    </RoundedButton>
  );
};

export default ClearButton;
