import React, { useState } from "react";
//import useSound from "use-sound";

import { CloseOutlined, SettingsBackupRestore } from "@material-ui/icons";

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
import useKeyBoard from "./hooks/useKeyboard";

function App() {
  // Timer starts gooing down
  // Guess 1 word NOT on the board... get BONUS TIME! get FREE LETTER!
  // Guess 2 words NOT on the board... get FREE DEFINITION BUTTON! (button appears)
  // Guess 3 wrods NOT on the board... get FREE 3X BOARD LETTERS! + BONUS TIME!
  // Guess 4 words NOT on the board... get NEW WORD! (button appears)
  // As time goes down, letters start to fill in spaces for NEGATIVE points

  // Guess once and miss... get a FREE LETTER

  // ANOTHER PART OF THE GAME
  // As you earn points, you get to build a larger city.
  // with each game win you get to buy a new building or sell a building to buy anohter one

  // ANOHTER IDEA
  // once you get the word, you have to pick the correct definition.
  // so, we'll get 4 random definitions and one real defenition.
  // words you get wrong will be used in future games.

  // THE MAIN IDEA
  // It is that this game will help you learn new words.

  //const [playNewWordSound] = useSound(boopSfx);

  // SINGLE WORD VARIABLES
  const [currentWord, setCurrentWord] = useState("");

  const refreshButtons = (newButtonLetter) => addDisplayLetter(newButtonLetter);
  const refreshDisplay = (newDisplayLetter) => addLetter(newDisplayLetter);

  // 10X WORD VARIABLES START
  const [displayStatus, setDisplayStatus] = useState("Playing...");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [currentWords, setCurrentWords] = useState([""]);
  // 10X WORD VARIABLES END

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

  // 10X WORD VARIABLES START
  const [
    BuildKeyboard,
    shuffleKeyboard,
    addKey,
    removeKey,
    setKeyboard,
    getKeyboard,
  ] = useKeyBoard(refreshButtons);

  const getNewWord = async () => {
    /*
    await getRandomWord().then((recievedWord) => {
      const word = recievedWord.toLowerCase();
      setCurrentWord(word);
      setLetters(word);
      shuffleLetters(word);
      //playNewWordSound();
      setDisplayLetters("");
      setRound(round + 1);
    });
*/
    await getRandomWords()
      .then((recievedWords) => {
        //console.log("fresh: ", recievedWords.join(""));
        //const words = recievedWords.map((i) => i.toLowerCase());
        // make sure to do this later
        setCurrentWords(recievedWords);
        setKeyboard(recievedWords.join(""));

        shuffleKeyboard(recievedWords.join(""));
        setDisplayLetters("");
        // playNewWordSound();
        setRound(round + 1);
      })
      .catch(console.error);
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

  /////Updated start for many words
  const displayToButtons = () => {
    addKey(displayLetters);
    clearDisplay();
  };
  const oneDisplayToButtons = () => {
    addKey(displayLetters.slice(displayLetters.length - 1));
    removeDisplayLetter(); //delete one ispljay number
  };
  // updated end for many words

  return (
    <div className="App">
      <Header round={round} score={score} />

      <TileBoard currentWords={currentWords} />

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
      <BuildKeyboard />

      <div className="footer">
        <ShuffleButton shuffleKeyboard={shuffleKeyboard} />

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
        removeKey={removeKey}
        oneDisplayToButtons={oneDisplayToButtons}
        getKeyboard={getKeyboard}
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
