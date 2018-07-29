import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Form,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import ChooseDifficulty from "./ChooseDifficulty";

class MainMenuModal extends Component {
  state = {
    mode: null
  };

  render() {
    return (
      <Modal isOpen={this.props.difficultyModal}>
        <ModalHeader className="d-flex justify-content-center">
          <span style={{ fontSize: 50 }}>MAIN MENU</span>
        </ModalHeader>
        <ModalBody>
          {this.state.mode === null ? (
            <div className="d-flex justify-content-around">
              <Button
                size="lg"
                color="info"
                onClick={() =>
                  this.setState(
                    { mode: "SINGLE PLAYER" },
                    this.props.setMode("SINGLE PLAYER")
                  )
                }
              >
                SINGLE PLAYER
              </Button>
              <Button
                size="lg"
                color="warning"
                onClick={() =>
                  this.setState(
                    { mode: "MULTIPLAYER" },
                    this.props.setMode("MULTIPLAYER")
                  )
                }
              >
                MULTIPLAYER
              </Button>
            </div>
          ) : null}
          {this.state.mode !== null ? (
            <ChooseDifficulty
              setMode={difficulty => this.props.newGame(difficulty)}
            />
          ) : null}
        </ModalBody>
      </Modal>
    );
  }
}

MainMenuModal.propTypes = {
  difficultyModal: PropTypes.bool.isRequired,
  newGame: PropTypes.func.isRequired
};

export default MainMenuModal;
