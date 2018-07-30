import React from "react";
import { Button, Card, CardImg, CardBody } from "reactstrap";
import PropTypes from "prop-types";

const HANGMAN_PARTS = [
  "",
  "/img/Hangman-01.png",
  "/img/Hangman-02.png",
  "/img/Hangman-03.png",
  "/img/Hangman-04.png",
  "/img/Hangman-05.png",
  "/img/Hangman-06.png",
  "/img/Hangman-07.png",
  "/img/Hangman-08.png",
  "/img/Hangman-09.png",
  "/img/Hangman-10.png"
];

const Hangman = ({ counter, hideNav }) => (
  <div className="d-flex flex-column ml-3">
    <Card
      style={
        hideNav ? { width: 137, height: 160 } : { width: 250, height: 290 }
      }
    >
      <CardBody>
        <CardImg src={counter === 0 ? null : HANGMAN_PARTS[counter]} />
      </CardBody>
    </Card>
    {hideNav ? null : (
      <Button color="info" size="lg" className="mt-4 mb-2">
        {10 - counter} remaining attempts
      </Button>
    )}
  </div>
);

Hangman.propTypes = {
  counter: PropTypes.number.isRequired,
  hideNav: PropTypes.bool.isRequired
};

export default Hangman;
