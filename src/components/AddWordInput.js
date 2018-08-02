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
    activeAddModal: true
  };

  addWordFunction(word, difficulty) {
    this.setState({ activeAddModal: !this.state.activeAddModal });
    console.log("brevet"),
      postWords({
        word: word,
        difficulty: difficulty
      }).then(data => {
        console.log("retour ", data);
      });
  }

  // Arrow fx for binding
  handleWordUpdate = e => {
    this.setState({ word: e.target.value.toUpperCase() });
  };

  render() {
    return (
      <Modal isOpen={this.state.activeAddModal}>
        <ModalHeader className="text-warning">HELP US</ModalHeader>
        <ModalBody style={{ fontSize: 40 }}>
          <Form onSubmit={this.addWordFunction}>
            <Label style={{ fontSize: 22 }}>Add word !</Label>
            <InputGroup>
              <Input
                value={this.state.word}
                onChange={this.handleWordUpdate}
                type="text"
              />
              <InputGroupButtonDropdown
                addonType="append"
                isOpen={this.state.difficultyDropdown}
                toggle={() =>
                  this.setState({
                    difficultyDropdown: !this.state.difficultyDropdown
                  })
                }
              >
                <DropdownToggle caret>{this.state.difficulty}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => this.setState({ difficulty: "easy" })}
                  >
                    EASY
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.setState({ difficulty: "medium" })}
                  >
                    MEDIUM
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.setState({ difficulty: "hard" })}
                  >
                    HARD
                  </DropdownItem>
                </DropdownMenu>
              </InputGroupButtonDropdown>
            </InputGroup>
            <Button
              color="warning"
              onClick={() =>
                this.addWordFunction(this.state.word, this.state.difficulty)
              }
            >
              ADD
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

AddWordInput.propTypes = {};

export default AddWordInput;
