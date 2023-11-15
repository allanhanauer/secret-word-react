import "./InitMenu.css";

const InitMenu = ({startGame}) => {
  return (
    <div className="first_menu">
      <h1 id="title_init">Secret World</h1>
      <p id="tip_init">Clique no botão, para iniciar o jogo</p>
      <button type="button" id="init_button" onClick={startGame}>
        INICIAR JOGO
      </button>
    </div>
  );
};


export default InitMenu;
