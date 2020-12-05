import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

let numberOfLetters;

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: 'linear-gradient(180deg, #FEDA75 30%, #DB904A 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    //width: "100%",
    paddingTop: '1%', 
    fontSize: 'large',
    boxShadow: '0px 8px 0px 0px #ac5942, 0px -1px 0px 0px #FFFFFF',
    textShadow: '0px 0px 2px #CEAC68',
    margin: '5px',
  },
};

function ClassNames(props) {
  const { classes, children, className, ...other } = props;
  numberOfLetters = props.word;
  

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children || 'class names'}
    </Button>
  );
}

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);
