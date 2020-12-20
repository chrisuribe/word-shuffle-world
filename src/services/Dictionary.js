import axios from "axios";

const DATA_URL =
  "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=verb&excludePartOfSpeech=auxiliary-verb&minCorpusCount=50000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=7&api_key=" +
  process.env.REACT_APP_WORDNIK_KEY;

const DATA_URL_WORDS =
  "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=adjective%2Cverb%2Cadverb%2Cconjunction&minCorpusCount=30000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=6&limit=10&api_key=" +
  process.env.REACT_APP_WORDNIK_KEY;

export const getRandomWord = async () => {
  try {
    const { data } = await axios.get(DATA_URL);
    return data.word;
  } catch (ex) {
    if (ex.response && ex.response.status === 429) {
      alert("SLOW DOWN! Too many word requests. Try again in a few minutes.");
    } else {
      //console.log("Log ERROR: ", ex);
      alert("An unexpected error occured.");
    }
    return "Error. Try again later.";
  }
};
export const getRandomWords = async () => {
  console.log("getting random words...");
  try {
    const { data } = await axios.get(DATA_URL_WORDS);

    //return data.map((w) => w.word);
    // test data for now... restore the above line when ready.
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
  } catch (ex) {
    if (ex.response && ex.response.status === 429) {
      alert("SLOW DOWN! Too many word requests. Try again in a few minutes.");
    } else {
      console.log("Log ERROR: ", ex);
      alert("An unexpected error occured.");
    }
    return "Error. Try again later.";
  }
};

export const checkWord = async (word) => {
  console.log("Received word: ", word);
  const SCORE_URL =
    "https://api.wordnik.com/v4/word.json/" +
    word +
    "/scrabbleScore?api_key=" +
    process.env.REACT_APP_WORDNIK_KEY;

  try {
    const { data } = await axios.get(SCORE_URL);
    //console.log("Got data:", data)
    return data.value;
  } catch (ex) {
    if (ex.response && ex.response.status === 429) {
      alert("Too many word requests... trying again in a bit...");
    } else if (ex.response && ex.response.status === 404) {
      return 0;
    } else {
      //console.log("Log ERROR: ", ex);
      alert("An unexpected error occured.");
    }
    return "Error. Try again later.";
  }
};
