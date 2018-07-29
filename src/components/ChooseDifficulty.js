import PropTypes from "prop-types";
import React from "react";
import { Button, Container } from "reactstrap";

const ChosseDifficulty = ({ setMode }) => (
  <Container className="d-flex justify-content-around">
    <Button size="lg" color="success" onClick={() => setMode("easy")}>
      EASY
    </Button>
    <Button size="lg" color="warning" onClick={() => setMode("medium")}>
      MEDIUM
    </Button>
    <Button size="lg" color="danger" onClick={() => setMode("hard")}>
      HARD
    </Button>
  </Container>
);

ChosseDifficulty.propTypes = {
  setMode: PropTypes.func.isRequired
};

export default ChosseDifficulty;
