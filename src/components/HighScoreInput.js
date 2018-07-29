import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Form, Label, Input } from "reactstrap";

import { saveHOFEntry } from "./HallOfFame";

class HighScoreInput extends Component {
  state = {
    player: ""
  };

  // Arrow fx for binding
  handlePlayerUpdate = e => {
    this.setState({ player: e.target.value.toUpperCase() });
  };

  // Arrow fx for binding
  persitPlayer = e => {
    e.preventDefault();
    const newEntry = { score: this.props.score, player: this.state.player };
    saveHOFEntry(newEntry, this.props.onStored);
  };

  render() {
    return (
      <Form onSubmit={this.persitPlayer}>
        <Label style={{ fontSize: 22 }}>Enter your name !</Label>
        <Input
          value={this.state.player}
          onChange={this.handlePlayerUpdate}
          type="text"
        />
        <Button color="success">CONTINUE</Button>
      </Form>
    );
  }
}

HighScoreInput.propTypes = {
  score: PropTypes.number.isRequired,
  onStored: PropTypes.func.isRequired,
  newGame: PropTypes.func.isRequired
};

export default HighScoreInput;
