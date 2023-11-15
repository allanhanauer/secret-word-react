import './EndGameInterface.css'
const EndGameInterface = ({retryGame , score}) => {
  return (
    <div className="end_menu">
      <h1 id="title_end">Secret World</h1>
      <p id="pont_end">Sua Pontuação foi <span>{score}</span></p>
      <button type="button" id="end_button" onClick={retryGame}>
        INICIAR JOGO
      </button>
    </div>
  )
}

export default EndGameInterface;