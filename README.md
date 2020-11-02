# Word Shuffle World!

## If you run it on Heroku
- Make sure to use HTTP because Wordnik does not support HTTPS

## Remember to set dictionary API key
- Remember, NEVER store private data in source code.
 
- To get a key, sign up at https://developer.wordnik.com/
 (Yes, you'll need to use your own key. The one above is from the documentation.)
 
- On a local machine set the following environment variable by running:
REACT_APP_DICTIONARY_API_KEY=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5 npm start

- On Heroku CLI use this command to set the environment variable on Heroku:
 heroku config:set REACT_APP_DICTIONARY_API_KEY=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5

