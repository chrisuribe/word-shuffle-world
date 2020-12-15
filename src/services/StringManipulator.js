export function wordShuffle(str) {
  let word = str.slice();
  word = word.split("");

  //Shuffle letters
  for (let i = word.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [word[i], word[j]] = [word[j], word[i]];
  }

  return word.join("");
}
