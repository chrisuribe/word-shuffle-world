import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: "linear-gradient(180deg, #1BB12F 30%, #096B17 90%)",
    borderRadius: 100,
    //border: 0,
    color: "white",
    //height: '50%',
    //padding: '5px 5px',
    fontSize: "100%",
    textShadow: "0px 0px 2px #CEAC68",
    //margin: '5px',
  },
};

function RoundedButton(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children || "class names"}
    </Button>
  );
}

RoundedButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(RoundedButton);
