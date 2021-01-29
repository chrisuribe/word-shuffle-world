import React from "react";
import { getRandomWords } from "../services/Dictionary";

const RandomWords = () => {
  const getNewWord = async () => {
    await getRandomWords().then((word) => {
      console.log(word);
    });
  };

  return <div>test</div>;
};

export default RandomWords;
