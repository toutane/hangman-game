import React from "react";
import { Button, Card, CardImg, CardBody } from "reactstrap";
import PropTypes from "prop-types";

const URL = "https://hangman-game-qtjbeiiruz.now.sh";

const HANGMAN_PARTS = [
  "",
  `${URL}/img/Hangman-01.png`,
  `${URL}/img/Hangman-02.png`,
  `${URL}/img/Hangman-03.png`,
  `${URL}/img/Hangman-04.png`,
  `${URL}/img/Hangman-05.png`,
  `${URL}/img/Hangman-06.png`,
  `${URL}/img/Hangman-07.png`,
  `${URL}/img/Hangman-08.png`,
  `${URL}/img/Hangman-09.png`,
  `${URL}/img/Hangman-10.png`
];

const Hangman = ({ counter }) => (
  <div className="d-flex flex-column">
    <Card style={{ width: 250, height: 290 }}>
      <CardBody>
        <CardImg src={counter === 0 ? null : HANGMAN_PARTS[counter]} />
      </CardBody>
    </Card>
    <Button color="info" size="lg" className="mt-4 mb-2">
      {10 - counter} remaining attempts
    </Button>
  </div>
);

Hangman.propTypes = {
  counter: PropTypes.number.isRequired
};

export default Hangman;
