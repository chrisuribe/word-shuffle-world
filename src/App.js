
import './App.css';

import React, { useState } from 'react';

import {getRandomWord} from "./services/Dictionary";

function App() {

  const [word, setWord] = useState("-");

  const newWord = async () => {
    setWord(await getRandomWord());
   }

  return (
    <div className="App">
      <p>{word}</p>

      <button onClick={() => newWord()}>
        Get New Word
      </button>
    </div>
  );
}

export default App;
