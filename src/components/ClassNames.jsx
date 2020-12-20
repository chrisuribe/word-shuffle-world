import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import { FormatColorTextSharp } from "@material-ui/icons";

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: "linear-gradient(180deg, #FEDA75 30%, #DB904A 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    //width: "100%",
    paddingTop: "1%",
    fontSize: "large",
    boxShadow: "0px 8px 0px 0px #ac5942, 0px -1px 0px 0px #FFFFFF",
    textShadow: "0px 0px 2px #CEAC68",
    margin: "5px",
  },
  letter: {
    //fontSize: "small",
    position: "relative",
    top: "-2.5px",
  },
  number: {
    fontSize: "small",
    position: "relative",
    top: "2.5px",
  },
};

function ClassNames(props) {
  const {
    classes,
    children,
    className,
    keysAvailable,
    value,
    ...other
  } = props;

  const finalLetter = children;

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      <span className={clsx(classes.letter, className)}>
        {children || "class names"}
        <span className={clsx(classes.number, className)}>
          <sub className="numberArea">{keysAvailable}</sub>
        </span>
      </span>
    </Button>
  );
}

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);
