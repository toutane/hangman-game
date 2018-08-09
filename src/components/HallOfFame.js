import PropTypes from "prop-types";
import React, { Component } from "react";
import { Table } from "reactstrap";
import { getScores } from "../api/API";

class HallOfFame extends Component {
  state = {
    scores: []
  };

  componentDidMount() {
    this.getAllScores();
  }

  getAllScores() {
    getScores().then(score =>
      this.setState({
        scores: score
      })
    );
  }

  render() {
    const sortHallOfFame = (a, b) => {
      let x = a.score;
      let y = b.score;
      if (x > y) return -1;
      if (x < y) return 1;
    };

    return (
      <div className="mr-3">
        <b style={{ fontSize: this.props.hideNav }} className="mb-1">
          HALL OF <a className="text-info">FAME</a>
        </b>
        <Table size={this.props.hideNav <= 17 ? "sm" : "lg"}>
          <thead>
            {this.state.scores
              .sort(sortHallOfFame)
              .map(({ date, score, player }, index) => (
                <tr key={index}>
                  <td>
                    {this.props.hideNav <= 25
                      ? player.length >= 5
                        ? player.slice(0, 4) + ".."
                        : player
                      : player}
                  </td>
                  <td className="text-info">{score}</td>
                  <td>{date}</td>
                </tr>
              ))}
          </thead>
        </Table>
      </div>
    );
  }
}

export default HallOfFame;
