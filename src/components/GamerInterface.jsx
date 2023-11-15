import { useState, useRef } from "react";
import "./GamerInterface.css";
const GamerInterface = ({
  verifyLetter,
  wordsLetter,
  pickedWords,
  categoryWords,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  };
  return (
    <div className="game_screen">
      <h1 id="title">Advinhe a Palavra</h1>
      <h2 id="pont">
        Pontuação <span>{score}</span>
      </h2>
      <h3 id="dica">dica sobre a palavra: {categoryWords}</h3>
      <h4>Você ainda tem {guesses} Tentativa(s)</h4>
      <div id="myster_words">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} id={`letter{i}`} className="myster_box">
              {letter}
            </span>
          ) : (
            <span key={i} className="myster_box"></span>
          )
        )}
      </div>
      <h4>Tente advinhar uma letra da palavra</h4>
      <form id="gameLogic" onSubmit={handleSubmit}>
        <div id="ajust_form">
          <input
            id="inp"
            maxLength={1}
            type="text"
            name="letter"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            required
            ref={letterInputRef}
          />
          <button id="submit" type="submit">
            Jogar
          </button>
        </div>
      </form>
      <p>Letras já utilizadas</p>
      <div>
        <p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter} </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default GamerInterface;
