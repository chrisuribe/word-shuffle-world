import React from 'react';

function Display(props) {
    return (
        <div className="display" >
            {props.text} &nbsp;
        </div>
    );
}

export default Display;