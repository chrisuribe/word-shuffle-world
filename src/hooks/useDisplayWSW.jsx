import React, {useState} from 'react';

const useDisplayWSW = (addButtonLetter) => {
    const [displayLetters, setDisplayLetters] = useState("");
    //const [displayLetterRemoved, setDisplayLetterRemoved] = useState("");    

    const addDisplayLetter = (newLetter) => setDisplayLetters(displayLetters + newLetter);

    const clearDisplay = () => setDisplayLetters("");



    const removeDisplayLetter = () => {
      addButtonLetter(displayLetters.slice(-1)); // store the last letter
      setDisplayLetters(displayLetters.slice(0,displayLetters.length-1)); // update letter removed state
    };

    const BuildDisplay = () => (
        <div className="display" >
            {displayLetters} &nbsp;
        </div>
    );

    return ([displayLetters, setDisplayLetters, BuildDisplay, addDisplayLetter, removeDisplayLetter, clearDisplay]);
};

export default useDisplayWSW;