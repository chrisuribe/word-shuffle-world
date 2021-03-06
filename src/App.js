import React, { useState } from "react";
//import useSound from "use-sound";

import { SettingsBackupRestore } from "@material-ui/icons";

//import boopSfx from "./sounds/239523__cmdrobot__computer-beep-sfx-for-videogames.wav";
import "./dist/css/styles.min.css";

import { checkWord, getRandomWords } from "./services/Dictionary";

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

  const refreshButtons = (newButtonLetter) => addDisplayLetter(newButtonLetter);

  const [displayStatus, setDisplayStatus] = useState(
    "Guess the words on the board or create a bonus point word using available letters."
  );
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [currentWords, setCurrentWords] = useState([""]);
  const [guessedWords, setGuessedWords] = useState([]);
  const [bonusLetters, setBonusLetters] = useState(["c"]);
  const [keyProcessorDisabled, setKeyProcessorDisabled] = useState(false);
  const [started, setStarted] = useState(true);

  const [
    BuildDisplay,
    getDisplayLetters,
    setDisplayLetters,
    addDisplayLetter,
    removeDisplayLetter,
    clearDisplay,
  ] = useDisplayWSW();

  const [
    BuildKeyboard,
    getKeyboard,
    setKeyboard,
    addKey,
    removeKey,
    shuffleKeyboard,
  ] = useKeyBoard(refreshButtons);

  const getNewWord = async () => {
    await getRandomWords()
      .then((recievedWords) => {
        //console.log("fresh: ", recievedWords.join(""));
        //const words = recievedWords.map((i) => i.toLowerCase());
        // make sure to do this later
        setBonusLetters(["c", "e", "o"]);
        setCurrentWords(recievedWords);
        setGuessedWords([]);
        setKeyboard(recievedWords.join(""));

        shuffleKeyboard(recievedWords.join(""));
        setDisplayLetters("");

        // playNewWordSound();
        setRound(round + 1);
        getBonusLetter();
      })
      .catch(console.error);
  };

  function getBonusLetter() {
    let newBonusLetter = "";
    let letterBank = getDisplayLetters() + getKeyboard();

    let runTimes = 0;

    do {
      if (letterBank <= 0) return;
      //if (currentWords.length === guessedWords.length) return;

      newBonusLetter = letterBank.charAt(
        Math.floor(Math.random() * letterBank.length)
      );
      console.log(
        `ran:  ${runTimes++} letterBank: ${letterBank} | ${getDisplayLetters()}| ${getKeyboard()} | newBonusLetter: ${newBonusLetter} bonusLetters: ${bonusLetters}`
      );
      if (runTimes > 500) return;
    } while (bonusLetters.includes(newBonusLetter) && bonusLetters.length < 10);

    setBonusLetters(bonusLetters + newBonusLetter);
  }

  function tileBoardWord(word) {
    return currentWords.includes(word);
  }

  const processDisplayWord = async (word) => {
    setKeyProcessorDisabled(true);
    let multiplierBonus = 1;

    await checkWord(word)
      .then((isWordScore) => {
        if (tileBoardWord(word)) {
          let newGuessedWordsList = [word, ...guessedWords];
          setGuessedWords(newGuessedWordsList);
          multiplierBonus += 9;
        }

        if (isWordScore > 0) {
          setDisplayStatus(`+${isWordScore * multiplierBonus} points!`);
          setScore(score + isWordScore * multiplierBonus);

          if (tileBoardWord(word)) clearDisplay();
          else displayToButtons();

          getBonusLetter();
        } else setDisplayStatus(`Not word! Keep playing...`);

        setKeyProcessorDisabled(false);
      })
      .catch((e) => console.error("What do I do?", e));

    //getNewWord();
  };

  const displayToButtons = () => {
    addKey(getDisplayLetters());
    clearDisplay();
  };
  const oneDisplayToButtons = () => {
    addKey(getDisplayLetters().slice(getDisplayLetters().length - 1));
    removeDisplayLetter(); //delete one ispljay number
  };

  if (started) {
    getNewWord();
    setStarted(false);
  }

  return (
    <div className="App">
      <Header round={round} score={score} />

      <TileBoard
        currentWords={currentWords}
        guessedWords={guessedWords}
        bonusLetters={bonusLetters}
      />

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

      <BuildKeyboard />

      <div className="footer">
        <ShuffleButton shuffleKeyboard={shuffleKeyboard} />

        <RoundedButton
          variant="contained"
          color="secondary"
          disabled={keyProcessorDisabled}
          onClick={() => processDisplayWord(getDisplayLetters())}
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
        display={getDisplayLetters}
        processDisplayWord={processDisplayWord}
        removeKey={removeKey}
        oneDisplayToButtons={oneDisplayToButtons}
        getKeyboard={getKeyboard}
        keyProcessorDisabled={keyProcessorDisabled}
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
