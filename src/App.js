
import './App.css';

import React, { useState } from 'react';

import {getRandomWord} from "./services/Dictionary";
import {wordShuffle} from "./services/StringManipulator";

function App() {

  const [word, setWord] = useState("-");
  const [shuffledWord, setShuffledWord] = useState("-");
  
  const newWord = async () => {
    word = await getRandomWord();

    setWord(word);
    setShuffledWord(wordShuffle(word));
   }

  return (
    <div className="App">
      <p>{word}</p>
      <p>{shuffledWord}</p>

      <button onClick={() => newWord()}>
        Get New Word
      </button>
    </div>
  );
}

export default App;
