import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Form,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { postWords } from "../api/API";

class AddWordInput extends Component {
  state = {
    word: "",
    difficulty: "difficulty",
    difficultyDropdown: false,
    errorInput: false,
    errorType: "You must enter a name and set a difficulty"
  };

  addWordFunction(word, difficulty) {
    // this.setState({ activeAddModal: !this.state.activeAddModal });
    if (word !== "" && difficulty !== "difficulty") {
      postWords({
        word: word,
        difficulty: difficulty
      }).then(data => {
        if (data.error) {
          this.setState({ errorInput: true, errorType: data.message });
        } else {
          this.props.addWordInputFunction(data.message);
          this.setState({
            word: "",
            difficulty: "difficulty",
            errorInput: false,
            errorType: "You must enter a name and set a difficulty"
          });
        }
        console.log("retour ", data);
      });
    } else {
      this.setState({ errorInput: true });
    }
  }

  // Arrow fx for binding
  handleWordUpdate = e => {
    this.setState({ word: e.target.value.toUpperCase(), errorInput: false });
  };

  render() {
    return (
      <Modal isOpen={this.props.activeAddModal}>
        <ModalHeader
          style={{ fontSize: 30 }}
          className="text-warning"
          toggle={this.props.addWordInputFunction}
        >
          IMPROVE THIS GAME
        </ModalHeader>
        <ModalBody style={{ fontSize: 40 }}>
          <a>
            <a className="text-warning">Participate</a> in this game by{" "}
            <a className="text-warning">adding</a> a word and specifying its{" "}
            <a className="text-warning">difficulty !</a>
          </a>
          <Form onSubmit={this.addWordFunction}>
            <Label style={{ fontSize: 22 }}>Add a word : </Label>
            <InputGroup>
              <Input
                invalid={this.state.errorInput}
                value={this.state.word}
                onChange={this.handleWordUpdate}
                type="text"
              />
              <InputGroupButtonDropdown
                addonType="append"
                isOpen={this.state.difficultyDropdown}
                toggle={() =>
                  this.setState({
                    difficultyDropdown: !this.state.difficultyDropdown,
                    errorInput: false
                  })
                }
              >
                <DropdownToggle
                  color={this.state.errorInput ? "danger" : "secondary"}
                  caret
                >
                  {this.state.difficulty}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => this.setState({ difficulty: "easy" })}
                    className="text-success"
                  >
                    EASY
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.setState({ difficulty: "medium" })}
                    className="text-warning"
                  >
                    MEDIUM
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.setState({ difficulty: "hard" })}
                    className="text-danger"
                  >
                    HARD
                  </DropdownItem>
                </DropdownMenu>
              </InputGroupButtonDropdown>
            </InputGroup>
            <Button
              color="warning"
              className="mr-2"
              onClick={() =>
                this.addWordFunction(this.state.word, this.state.difficulty)
              }
            >
              ADD
            </Button>
            {this.state.errorInput ? (
              <span className="text-danger" style={{ fontSize: 16 }}>
                {this.state.errorType}
              </span>
            ) : null}
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

AddWordInput.propTypes = {};

export default AddWordInput;
