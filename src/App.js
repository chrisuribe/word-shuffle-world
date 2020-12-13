import React, { useState } from "react";
//import useSound from "use-sound";

import { SettingsBackupRestore } from "@material-ui/icons";

//import boopSfx from "./sounds/239523__cmdrobot__computer-beep-sfx-for-videogames.wav";
import "./dist/css/styles.min.css";

import {
  getRandomWord,
  checkWord,
  getRandomWords,
} from "./services/Dictionary";

import KeyProcessor from "./components/KeyProcessor";
import Success from "./components/Success";
import RoundedButton from "./components/RoundedButton";
import ShuffleButton from "./components/ShuffleButton";

import TileBoard from "./components/TileBoard";
import Header from "./components/Header";
import useButtonsWSW from "./hooks/useButtonsWSW";
import useDisplayWSW from "./hooks/useDisplayWSW";
import ClearButton from "./components/ClearButton";

function App() {
  // Timer starts gooing down
  // Guess 1 word NOT on the board... get BONUS TIME! get FREE LETTER!
  // Guess 2 words NOT on the board... get FREE DEFINITION BUTTON! (button appears)
  // Guess 3 wrods NOT on the board... get FREE 3X BOARD LETTERS! + BONUS TIME!
  // Guess 4 words NOT on the board... get NEW WORD! (button appears)
  // As time goes down, letters start to fill in spaces for NEGATIVE points

  // Guess once and miss... get a FREE LETTER

  //const [playNewWordSound] = useSound(boopSfx);

  const [displayStatus, setDisplayStatus] = useState("Playing...");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const [currentWord, setCurrentWord] = useState("");

  const refreshButtons = (newButtonLetter) => addDisplayLetter(newButtonLetter);
  const refreshDisplay = (newDisplayLetter) => addLetter(newDisplayLetter);

  const [
    setLetters,
    getButtonLetters,
    BuildLetters,
    addLetter,
    shuffleLetters,
    removeLetter,
  ] = useButtonsWSW(refreshButtons);

  const [
    displayLetters,
    setDisplayLetters,
    BuildDisplay,
    addDisplayLetter,
    clearDisplay,
    removeDisplayLetter,
  ] = useDisplayWSW(refreshDisplay);

  const getNewWord = async () => {
    await getRandomWord().then((recievedWord) => {
      const word = recievedWord.toLowerCase();
      setCurrentWord(word);
      setLetters(word);
      shuffleLetters(word);
      //playNewWordSound();
      setDisplayLetters("");
      //setDisplayStatus("Playing...");
      setRound(round + 1);
      //console.log(`current word: ${currentWord}.`);
    });
    console.log(await getRandomWords());
  };

  const processDisplayWord = async (word) => {
    await checkWord(word).then((isWordScore) => {
      if (isWordScore > 0) {
        setDisplayStatus(`+${isWordScore} points!`);
        setScore(score + isWordScore);
      } else setDisplayStatus(`Not word! Keep playing...`);
    });
    clearDisplay();
    getNewWord();
  };

  const displayToButtons = () => {
    addLetter(displayLetters);
    clearDisplay();
  };
  const oneDisplayToButtons = () => {
    addLetter(displayLetters.slice(displayLetters.length - 1));
    removeDisplayLetter(); //delete one ispljay number
  };

  return (
    <div className="App">
      <section className="header">
        <div className="status">
          Round: <span className="status data">{round}</span>
        </div>
        <div className="status data">
          Score: <span className="data">{score}</span>
        </div>
        <div className="status data">
          Time: <span className="data">04:50</span>
        </div>
        <div className="pause"></div>
      </section>

      <Header round={round} score={score} />

      <TileBoard currentWord={currentWord} />

      <Success displayStatus={displayStatus} />

      <div className="display-component">
        <ClearButton displayToButtons={displayToButtons} />

        <BuildDisplay />
        <RoundedButton
          onClick={() => {
            oneDisplayToButtons();
          }}
        >
          <SettingsBackupRestore />
        </RoundedButton>
      </div>

      <BuildLetters />

      <div className="footer">
        <ShuffleButton shuffleLetters={shuffleLetters} />

        <RoundedButton
          variant="contained"
          color="secondary"
          onClick={() => processDisplayWord(displayLetters)}
        >
          Enter
        </RoundedButton>

        <RoundedButton
          className="mybutton"
          variant="contained"
          color="default"
          onClick={() => getNewWord()}
        >
          Get New Word
        </RoundedButton>
      </div>

      <KeyProcessor
        setDisplay={setDisplayLetters}
        display={displayLetters}
        processDisplayWord={processDisplayWord}
        removeLetter={removeLetter}
        oneDisplayToButtons={oneDisplayToButtons}
        getButtonLetters={getButtonLetters}
      />
    </div>
  );
}

export default App;

// puth this in the return section to use this demo of how to organize code for tiles.
// <div className="scrabble-container">
// <span className="scrabble-tile__letter">C
//   <span className="scrabble-tile__number">1</span>
// </span>
// <span className="scrabble-tile__letter">H
//   <span className="scrabble-tile__number">1</span>
// </span>
// <span className="scrabble-tile__letter">R
//   <span className="scrabble-tile__number">1</span>
// </span>
// <span className="scrabble-tile__letter">I
//   <span className="scrabble-tile__number">1</span>
// </span>
// <span className="scrabble-tile__letter">S
//   <span className="scrabble-tile__number">1</span>
// </span>
// </div>
