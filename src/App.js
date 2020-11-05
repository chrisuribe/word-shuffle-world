
import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import './App.css';
import useSound from 'use-sound';
import boopSfx from './sounds/239523__cmdrobot__computer-beep-sfx-for-videogames.wav';

import {getRandomWord} from "./services/Dictionary";
import {wordShuffle, wordToArray} from "./services/StringManipulator";

function App() {

  const [webpageWord, setWebpageWord] = useState("-");
  const [shuffledWebpageWord, setShuffledWebpageWord] = useState("-");
  const [play] = useSound(boopSfx);

  const getNewWord = async () => {
    const theNewWord = await getRandomWord();
    setWebpageWord(theNewWord);
    setShuffledWebpageWord(wordShuffle(theNewWord));
    play();
   }

  return (
    <div className="App">
      <p>{webpageWord}</p>
      <p>{shuffledWebpageWord}</p>
      <p>{wordToArray(shuffledWebpageWord)}</p>

      <Button variant="contained" color="primary" onClick={() => getNewWord()}>
        Get New Word
      </Button>

    </div>
  );
}

export default App;
