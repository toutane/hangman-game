import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const GameManager = ({ gameState, colorStatus, score }) => (
  <span>
    <Button color={colorStatus} size="lg" className="ml-4">
      {gameState}
    </Button>
    <Button color="info" size="lg" className="ml-4">
      SCORE: {score}
    </Button>
  </span>
);

GameManager.propTypes = {
  score: PropTypes.number.isRequired,
  gameState: PropTypes.oneOf(["IN GAME", "GAME OVER", "YOU WON!"]).isRequired
};

export default GameManager;
