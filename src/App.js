
import './App.css';

import React, { useState } from 'react';

import {getRandomWord} from "./services/Dictionary";
import {wordShuffle} from "./services/StringManipulator";

function App() {

  const [webpageWord, setWebpageWord] = useState("-");
  const [shuffledWebpageWord, setShuffledWebpageWord] = useState("-");
  
  const getNewWord = async () => {
    const theNewWord = await getRandomWord();

    setWebpageWord(theNewWord);
    setShuffledWebpageWord(wordShuffle(theNewWord));
   }

  return (
    <div className="App">
      <p>{webpageWord}</p>
      <p>{shuffledWebpageWord}</p>

      <button onClick={() => getNewWord()}>
        Get New Word
      </button>
    </div>
  );
}

export default App;
