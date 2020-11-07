import React from 'react';

function Display(props) {
    return (
        <div style={{backgroundColor: "grey", width: 400, textAlign: "center", margin: "auto"}}>
            {props.currentWord}
        </div>
    );
}

export default Display;