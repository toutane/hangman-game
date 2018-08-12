import PropTypes from "prop-types";
import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const ChooseDifficulty = ({ newGame, difficultyModal, hideNav }) => (
  <Modal isOpen={difficultyModal}>
    <ModalHeader className="d-flex justify-content-center">
      <span style={{ fontSize: hideNav ? 30 : 50 }}>CHOOSE DIFFICULTY:</span>
    </ModalHeader>
    <ModalBody className="d-flex justify-content-around">
      <Button
        size={hideNav ? "md" : "lg"}
        color="success"
        onClick={() => newGame("easy")}
      >
        EASY
      </Button>
      <Button
        size={hideNav ? "md" : "lg"}
        color="warning"
        onClick={() => newGame("medium")}
      >
        MEDIUM
      </Button>
      <Button
        size={hideNav ? "md" : "lg"}
        color="danger"
        onClick={() => newGame("hard")}
      >
        HARD
      </Button>
    </ModalBody>
  </Modal>
);

ChooseDifficulty.propTypes = {
  newGame: PropTypes.func.isRequired
};

export default ChooseDifficulty;
