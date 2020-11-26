import React from 'react';

function Display(props) {
    return (
        <div className="display" style={{ width: 400, textAlign: "center"}}>
            {props.text} &nbsp;
        </div>
    );
}

export default Display;