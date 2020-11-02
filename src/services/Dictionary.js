import axios from 'axios';
  
const DATA_URL = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=verb&excludePartOfSpeech=auxiliary-verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=7&api_key=" + process.env.REACT_APP_DICTIONARY_API_KEY;

// Remember to run the command below to set dictionary API key
// NEVER store private data in source code.
// To get a key, sign up at https://developer.wordnik.com/
// On a local machine set the following environment variable:
// REACT_APP_DICTIONARY_API_KEY=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5 npm start
// Use Heroku CLI:
// heroku config:set REACT_APP_DICTIONARY_API_KEY=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
// (Yes, you'll need to use your own key. The one above is from the documentation.)
export const getRandomWord = async () => {
  try {
    const {data} = await axios.get(DATA_URL);
    return data.word;
  }catch(ex){
    if(ex.response && ex.response.status === 429){
      alert("SLOW DOWN! Too many word requests. Try again in a few minutes.");
    } else {
      console.log("Log ERROR: ", ex);
      alert("An unexpected error occured.");
    }
    return "Error. Try again later.";
  }
};

