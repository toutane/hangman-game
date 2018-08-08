import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Form, Label, Input } from "reactstrap";
import { postScore } from "../api/API";
import moment from "moment";

class HighScoreInput extends Component {
  state = {
    player: "",
    errorType: false
  };

  componentDidMount() {
    this.setState(
      {
        player: this.props.currentPlayer
      },
      () => console.log(`${this.state.player} is the currentPlayer`)
    );
  }

  componentWillUnmount() {
    this.props.setCurrentPlayer(this.state.player);
    console.log(`Set ${this.state.player} as the currentPlayer`);
  }

  // Arrow fx for binding
  handlePlayerUpdate = e => {
    this.setState({ player: e.target.value.toUpperCase() });
  };

  // Arrow fx for binding
  persitPlayer = e => {
    e.preventDefault();
    if (this.state.player !== "") {
      postScore({
        score: this.props.score,
        player: this.state.player,
        date: moment().format("L")
      }).then(data => {
        console.log("retour ", data), this.props.setHallOfFame();
      });
    } else {
      this.setState({ errorInput: true });
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.persitPlayer}>
          <Label style={{ fontSize: 22 }}>Enter your name !</Label>
          <Input
            value={this.state.player}
            onChange={this.handlePlayerUpdate}
            type="text"
          />
          <Button color="success">CONTINUE</Button>
        </Form>
      </div>
    );
  }
}

HighScoreInput.propTypes = {
  score: PropTypes.number.isRequired
};

export default HighScoreInput;
