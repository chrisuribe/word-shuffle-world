
import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import './App.css';
import useSound from 'use-sound';
import boopSfx from './sounds/239523__cmdrobot__computer-beep-sfx-for-videogames.wav';

import {getRandomWord, checkWord} from "./services/Dictionary";
import {wordShuffle} from "./services/StringManipulator";
import Display from './components/Display';
import ButtonWSW from './components/ButtonWSW';
import KeyProcessor from './components/KeyProcessor';
import Success from './components/Success';


function App() {
  
  const [playNewWordSound] = useSound(boopSfx);

  const [display, setDisplay] = useState("");
  const [displayStatus, setDisplayStatus] = useState("Playing...");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  


  const [currentWord, setCurrentWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");

  const getNewWord = async () => {
    const newWord = await getRandomWord();
    setCurrentWord(newWord);
    setShuffledWord(wordShuffle(newWord));
    playNewWordSound();
    setDisplay("");
    setDisplayStatus("Playing...");
    setRound(round+1);
   }

   const processDisplayWord = async (word) => {
     const isWord = await checkWord(word);
     setDisplay("");
     if(isWord>0){
      setDisplayStatus("SUCCESS!");
      setScore(score+isWord);
     }
   }

  return (
    <div className="App">
      <p>Round: {round}</p>
      <p>Score: {score} </p>
      <Success displayStatus={displayStatus} />
      
      <Display text={display} /> 

      <p>Current word: {currentWord}</p>


      
      <ButtonWSW word={shuffledWord} setDisplay={setDisplay} getDisplay={display} />

      <Button variant="contained" color="default" onClick={() => getNewWord()}>
        Get New Word
      </Button>

      <Button variant="contained" color="secondary" onClick={() => processDisplayWord(display)}>
        Enter
      </Button>

      <KeyProcessor setDisplay={setDisplay} display={display} currentWord={currentWord} processDisplayWord={processDisplayWord}/>

    </div>
  );
}

export default App;
