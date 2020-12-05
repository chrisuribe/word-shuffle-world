import React, { useState } from "react";
import useSound from "use-sound";

import { SettingsBackupRestore } from "@material-ui/icons";

import boopSfx from "./sounds/239523__cmdrobot__computer-beep-sfx-for-videogames.wav";
import "./css/styles.min.css";

import { getRandomWord, checkWord } from "./services/Dictionary";
import { wordShuffle } from "./services/StringManipulator";

import Display from "./components/Display";
import ButtonWSW from "./components/ButtonWSW";
import KeyProcessor from "./components/KeyProcessor";
import Success from "./components/Success";
import RoundedButton from "./components/RoundedButton";
import ShuffleButton from "./components/ShuffleButton";
import ClearButton from "./components/ClearButton";
import TileBoard from "./components/TileBoard";
import Header from "./components/Header";

function App() {
  // Timer starts gooing down
  // Guess 1 word NOT on the board... get BONUS TIME! get FREE LETTER!
  // Guess 2 words NOT on the board... get FREE DEFINITION BUTTON! (button appears)
  // Guess 3 wrods NOT on the board... get FREE 3X BOARD LETTERS! + BONUS TIME!
  // Guess 4 words NOT on the board... get NEW WORD! (button appears)
  // As time goes down, letters start to fill in spaces for NEGATIVE points

  // Guess once and miss... get a FREE LETTER

  const [playNewWordSound] = useSound(boopSfx);

  const [display, setDisplay] = useState("");
  const [displayStatus, setDisplayStatus] = useState("Playing...");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const [currentWord, setCurrentWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");

  const getNewWord = async () => {
    const newWord = await getRandomWord();
    setCurrentWord(newWord.toLowerCase());
    setShuffledWord(wordShuffle(newWord));
    playNewWordSound();
    setDisplay("");
    setDisplayStatus("Playing...");
    setRound(round + 1);
  };

  const shuffleTiles = () => {
    setShuffledWord(wordShuffle(currentWord));
  };

  const processDisplayWord = async (word) => {
    const isWordScore = await checkWord(word);
    setDisplay("");
    if (isWordScore > 0) {
      setDisplayStatus(`+${isWordScore} points!`);
      setScore(score + isWordScore);
    }
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
        <ClearButton />
        <Display text={display} />
        <RoundedButton>
          <SettingsBackupRestore />
        </RoundedButton>
      </div>

      <ButtonWSW
        word={shuffledWord}
        setDisplay={setDisplay}
        getDisplay={display}
      />

      <div className="footer">
        <ShuffleButton
          setShuffleWord={setShuffledWord}
          wordShuffle={wordShuffle}
          shuffledWord={shuffledWord}
          shuffleTiles={shuffleTiles}
        />

        <RoundedButton
          variant="contained"
          color="secondary"
          onClick={() => processDisplayWord(display)}
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
        setDisplay={setDisplay}
        display={display}
        currentWord={currentWord}
        processDisplayWord={processDisplayWord}
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
