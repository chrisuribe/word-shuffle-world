import React from 'react';
import { Button } from '@material-ui/core';

function ButtonWSW({setDisplay, getDisplay, word}) {

    const updateButton = (e) => {
        setDisplay(getDisplay + e.target.textContent);
        console.log(e);
    }

    var buttons = 
        word.split("")
            .map(element => 
            <Button 
                name={element} 
                key={element+Math.random()}
                variant="contained" 
                color="primary" 
                onClick={(e) => {updateButton(e)}}
                >
            {element}
            </Button>
    );

    return (
        <div>{buttons}</div>
    );
}

export default ButtonWSW;