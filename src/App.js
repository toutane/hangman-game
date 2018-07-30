import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Confetti from "react-dom-confetti";

import Keyboard from "./components/Keyboard";
import Letter from "./components/Letter";
import GameManager from "./components/GameManager";
import Hangman from "./components/Hangman";
import HallOfFame from "./components/HallOfFame";
import HighScoreInput from "./components/HighScoreInput";
import MainMenuModal from "./components/MainMenuModal";

import { allword } from "./db/AllWords";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const allplayer = [{}, {}];
// const allword = ["REACT", "HANGMAN", "JAVASCRIPT", "SKITTLES", "VERMEIL", "GIRANDOLE", "SANGUINE", "BEJAUNE", "ACCASTILLAGE", "EMPYREE"]

const configLeft = {
  angle: 0,
  spread: 150,
  startVelocity: 60,
  elementCount: 120,
  decay: 0.9
};

const configRight = {
  angle: 180,
  spread: 150,
  startVelocity: 60,
  elementCount: 120,
  decay: 0.9
};

class App extends Component {
  state = {
    selection: [],
    gameState: "IN GAME",
    hallOfFame: null,
    difficulty: "easy",
    difficultyModal: true,
    colorStatus: "warning",
    score: 0,
    mode: null,
    hideNav: false,
    letters: this.generateWords(),
    keyboard: this.generateKeyboard()
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ hideNav: window.innerWidth <= 760 });
    console.log("RESIZE");
  }

  // Arrow fx for binding
  displayHallOfFame = hallOfFame => {
    this.setState({ hallOfFame });
  };

  generateKeyboard() {
    const result = [];
    const size = 26;
    const allLetters = alphabet.split("");
    while (result.length < size) {
      const letter = allLetters.shift();
      result.push(letter);
    }
    return result;
  }

  generateWords() {
    const { difficulty } = this.state || { difficulty: "easy" };
    const filterAllWord = allword.filter(obj => obj.difficulty === difficulty);
    const result = [];
    let oneWord = Math.floor(Math.random() * filterAllWord.length);
    oneWord = filterAllWord[oneWord].word;
    const word = oneWord.split("");
    while (word.length > 0) {
      const letter = word.shift();
      result.push(letter);
    }
    return result;
  }

  // Arrow fx for binding
  newGame = difficulty => {
    this.setState({
      difficulty: difficulty,
      selection: [],
      letters: this.generateWords(),
      gameState: "IN GAME",
      colorStatus: "warning",
      hallOfFame: null,
      difficultyModal: false,
      score: 0
    });
  };

  // Arrow fx for binding
  handleClick = letter => {
    const { selection, gameState } = this.state;
    if (gameState == "IN GAME") {
      this.setState(
        { selection: [...selection, letter] },
        this.gameState,
        this.setScore(letter)
      );
    }
  };

  // Arrow fx for binding
  setScore = letter => {
    const { letters, score } = this.state;
    if (letters.includes(letter)) {
      this.setState({ score: score + 1 });
    } else {
      this.setState({ score: score - 1 });
    }
  };

  // Arrow fx for binding
  setMode = mode => {
    this.setState({ mode: mode });
  };

  getFeedback(letter) {
    const { selection } = this.state;
    return selection.includes(letter);
  }

  trying = () => {
    const { letters, selection } = this.state;
    return selection.filter(elt => !letters.includes(elt)).length;
  };

  gameState = () => {
    const { letters, selection } = this.state;
    const lastTests = 10 - this.trying();
    const findWord =
      letters.filter(elt => selection.includes(elt)).length === letters.length;
    if (lastTests > 0 && findWord) {
      this.setState({ gameState: "YOU WON!", colorStatus: "success" });
    } else if (lastTests > 0) {
      return;
    } else {
      this.setState({ gameState: "GAME OVER", colorStatus: "danger" });
    }
  };

  render() {
    const { letters, keyboard, hallOfFame } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 85, color: "white", background: "#222" }}>
          HANGMAN <a className={`text-${this.state.colorStatus}`}>GAME</a>
        </h1>
        <GameManager
          hideNav={this.state.hideNav}
          score={this.state.score}
          gameState={this.state.gameState}
          colorStatus={this.state.colorStatus}
          activeMenu={() => this.setState({ difficultyModal: true })}
        />
        {this.state.hideNav ? (
          <Row>
            <Col>
              <Hangman counter={this.trying()} hideNav={this.state.hideNav} />
            </Col>
            <Col>
              {this.state.gameState === "YOU WON!" ? (
                hallOfFame ? (
                  <HallOfFame entries={hallOfFame} />
                ) : null
              ) : null}
            </Col>
          </Row>
        ) : null}
        <Row className="mt-5">
          <Col className="ml-3">
            <ButtonGroup
              size={this.state.hideNav ? "md" : "lg"}
              // className="ml-3"
            >
              {letters.map((letter, i) => (
                <Letter
                  letter={letter}
                  feedback={this.getFeedback(letter) ? "visible" : "hidden"}
                  key={i}
                />
              ))}
            </ButtonGroup>
            <div className="mt-5 ml-2 mr-2">
              {keyboard.map((letter, i) => (
                <Keyboard
                  hideNav={this.state.hideNav}
                  letter={letter}
                  key={i}
                  onClick={this.handleClick}
                  feedback={this.getFeedback(letter) ? "secondary" : "info"}
                />
              ))}
            </div>
          </Col>
          {this.state.hideNav ? null : (
            <Col className="d-flex justify-content-around">
              {this.state.hideNav ? null : <Hangman counter={this.trying()} />}
              <div>
                {this.state.gameState === "YOU WON!" ? (
                  hallOfFame ? (
                    <HallOfFame entries={hallOfFame} />
                  ) : null
                ) : null}
              </div>
            </Col>
          )}
        </Row>
        <div className="d-flex justify-content-between">
          <Confetti
            active={this.state.gameState === "YOU WON!" ? true : false}
            config={configLeft}
          />
          <Confetti
            active={this.state.gameState === "YOU WON!" ? true : false}
            config={configRight}
          />
        </div>
        <MainMenuModal
          difficultyModal={this.state.difficultyModal}
          newGame={difficulty => this.newGame(difficulty)}
          setMode={mode => this.setMode(mode)}
        />
        <Modal
          isOpen={this.state.gameState === "GAME OVER" ? true : false}
          toggle={this.newGame}
        >
          <ModalHeader
            toggle={this.newGame}
            color="danger"
            className="text-danger"
          >
            GAME OVER
          </ModalHeader>
          <ModalBody style={{ fontSize: 40 }}>
            SORRY... YOU <a className="text-danger">LOSE</a> !
            <p>SCORE: {this.state.score}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() =>
                this.setState({ difficultyModal: true, gameState: "IN GAME" })
              }
            >
              NEW GAME
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={
            this.state.gameState === "YOU WON!"
              ? hallOfFame
                ? null
                : true
              : false
          }
          toggle={this.newGame}
        >
          <ModalHeader
            toggle={this.newGame}
            color="success"
            className="text-success"
          >
            YOU WON!
          </ModalHeader>
          <ModalBody style={{ fontSize: 40 }}>
            WELL DONE ! YOU <a className="text-success">WON</a> !
            <p>SCORE: {this.state.score}</p>
            <HighScoreInput
              score={this.state.score}
              onStored={this.displayHallOfFame}
              newGame={this.newGame}
              hideNav={this.state.hideNav}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default App;
