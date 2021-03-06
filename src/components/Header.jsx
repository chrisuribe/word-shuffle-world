//import { Menu } from '@material-ui/core';
import { Pause } from "@material-ui/icons";
import React from "react";
import RoundedButton from "./RoundedButton.jsx";

function Header({ round, score }) {
  return (
    <div className="header">
      <div className="header__status">
        Round: &nbsp;
        <div className="header__status--data"> {round} </div>
      </div>
      <div className="header__status">
        Score:&nbsp;
        <div className="header__status--data">{score}</div>
      </div>
    </div>
  );
}

export default Header;

/*
<div className="header__status">
        Time:&nbsp;
        <div className="header__status--data">04:33</div>
      </div>
      <div className="header__pause">
        <RoundedButton>
          <Pause />
        </RoundedButton>
      </div> 
      */

/*
<section className="header">
        <div className="status">
          Round: <span className="status data">{round}</span>
        </div>
        <div className="status data">
          Score: <span className="data">{score}</span>
        </div>
        <div className="status data">
          Time: <span className="data">04:50</span>
        </div>
        <div className="pause"></div>
      </section>



*/
