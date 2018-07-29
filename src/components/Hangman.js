import React from "react";
import { Button, Card, CardImg, CardBody } from "reactstrap";
import PropTypes from "prop-types";

const HANGMAN_PARTS = [
  "",
  "http://localhost:3000/img/Hangman-01.png",
  "http://localhost:3000/img/Hangman-02.png",
  "http://localhost:3000/img/Hangman-03.png",
  "http://localhost:3000/img/Hangman-04.png",
  "http://localhost:3000/img/Hangman-05.png",
  "http://localhost:3000/img/Hangman-06.png",
  "http://localhost:3000/img/Hangman-07.png",
  "http://localhost:3000/img/Hangman-08.png",
  "http://localhost:3000/img/Hangman-09.png",
  "http://localhost:3000/img/Hangman-10.png"
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
