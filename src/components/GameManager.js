import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const GameManager = ({
  gameState,
  colorStatus,
  score,
  activeMenu,
  hideNav
}) => (
  <div className="mt-3 mb-3">
    <Button color="info" size={hideNav} className="mr-3" onClick={activeMenu}>
      NEW GAME
    </Button>
    <Button color={colorStatus} size={hideNav}>
      {gameState}
    </Button>
    <Button color="info" className="ml-3" size={hideNav}>
      SCORE: {score}
    </Button>
  </div>
);

GameManager.propTypes = {
  score: PropTypes.number.isRequired,
  activeMenu: PropTypes.func.isRequired,
  gameState: PropTypes.oneOf(["IN GAME", "GAME OVER", "YOU WON!"]).isRequired
};

export default GameManager;
