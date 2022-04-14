import allwords from "./resources/allwords.txt";
import answers from "./resources/words.txt";

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(answers)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      //wordSet = new Set(wordArr);
    });
    await fetch(allwords)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      //todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });
    
  return { wordSet, todaysWord };
};