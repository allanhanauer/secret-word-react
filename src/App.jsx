//CSS
import "./App.css";
//DATA
import Words from "./data/Words";
//REACT
import { useState, useEffect, useCallback } from "react";
//COMPONENT
import InitMenu from "./components/InitMenu";
import GamerInterface from "./components/GamerInterface";
import EndGameInterface from "./components/EndGameInterface";

const guessesQty = 3;
const stages = [
  { id: 1, name: "startScreen" },
  { id: 2, name: "gameScreen" },
  { id: 3, name: "endScreen" },
];
const App = () => {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(Words);
  const [pickedWords, setPickedWords] = useState("");
  const [categoryWords, setCategoryWords] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickedWordsAndCategorys = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    //pick a random Word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);
  const startGame = useCallback(() => {
    clearLetterStates();
    const { word, category } = pickedWordsAndCategorys();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    setPickedWords(word);
    setCategoryWords(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickedWordsAndCategorys]);
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((e) => e - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses,setGameStage]);
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    console.log(guessedLetters.length)
    console.log(uniqueLetters.length)
    if (
      guessedLetters.length === uniqueLetters.length && gameStage != gameStage[0].name
    ) {
      setScore((actualScore) => (actualScore += 100));
      startGame();
    }
  }, [guessedLetters,letters,startGame,gameStage]);
  const retryGame = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };
  return (
    <>
      <header></header>
      <main>
        {gameStage === "startScreen" && <InitMenu startGame={startGame} />}
        {gameStage === "gameScreen" && (
          <GamerInterface
            verifyLetter={verifyLetter}
            words={words}
            pickedWords={pickedWords}
            categoryWords={categoryWords}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
          />
        )}
        {gameStage === "endScreen" && (
          <EndGameInterface retryGame={retryGame} score={score} />
        )}
      </main>
      <footer></footer>
    </>
  );
};
export default App;
