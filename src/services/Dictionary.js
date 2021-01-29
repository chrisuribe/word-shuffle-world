import axios from "axios";

const RANDOM_WORDS_API_URL =
  "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=adjective%2Cverb%2Cadverb%2Cconjunction&minCorpusCount=30000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=6&limit=10&api_key=" +
  process.env.REACT_APP_WORDNIK_KEY;

export const getRandomWords = async () => {
  console.log("Getting random words...");
  try {
    const { data } = await axios.get(RANDOM_WORDS_API_URL);
    const words = data.map((w) => w.word);

    //TASK: Make sure to return only words retrieved from the service which
    // are in our dictionary.

    return words;
  } catch (ex) {
    if (ex.response && ex.response.status === 429) {
      console.error("SLOW DOWN! Too many word requests.");
    } else {
      console.error("Unexpected error occured: ", ex);
    }
    // backup data (in the future get random words from my own API)
    return [
      "harsh",
      "tan",
      "biting",
      "rose",
      "season",
      "hybrid",
      "ardent",
      "cure",
      "prod",
      "chop",
    ];
  }
};

// get scrabble score for word
export const checkWord = async (word) => {
  const SCRABBLE_SCORE_API_URL =
    "https://scrabble-score-wsw.herokuapp.com/api/scrabbleScore?word=" + word;

  // send word to server and retrun score
  try {
    const { data } = await axios.get(SCRABBLE_SCORE_API_URL);
    const score = data.value;
    return score;
  } catch (ex) {
    console.error(ex.response);
  }
};
