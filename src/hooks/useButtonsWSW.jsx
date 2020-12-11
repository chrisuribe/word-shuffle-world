import React, {useState} from 'react';
import ClassNames from '../components/ClassNames';
import { wordShuffle } from '../services/StringManipulator';

const useButtonsWSW = (addDisplayLetter) => {
  const [letters, setLetters] = useState("");
  //const [letterRemoved, setLetterRemoved] = useState("");
  
  const addLetter = (newLetter) => setLetters(letters + newLetter);

  const removeLetter = (letterClicked) => {
    setLetters(letters.replace(letterClicked, ""));
    addDisplayLetter(letterClicked);
  };

  const shuffleLetters = (newWord) => {
    newWord ? 
    setLetters(wordShuffle(newWord)) : 
    setLetters(wordShuffle(letters));
  };

    const BuildLetters = () => (

      <div className="tile-holder">
      <div className="tile-holder__side"></div>
      <div className="tile-holder__tiles">


      {letters.split("").map((letter, index)=> (
              <ClassNames
                key={letter + index}
                value={letter}
                onClick={(button) => {
                  const {data: letterClicked} = button.target.firstChild;
                  removeLetter(letterClicked);
                }}
                >
                  {letter}
                </ClassNames>
            ))}


      </div>
      <div className="tile-holder__side"></div>
    </div>


    );

    return [letters, setLetters, BuildLetters, addLetter, shuffleLetters];
};

export default useButtonsWSW;

