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
    letters: this.generateWords(),
    keyboard: this.generateKeyboard()
  };

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
        <Container className="mt-3">
          <Button
            color="info"
            size="lg"
            onClick={() => this.setState({ difficultyModal: true })}
          >
            NEW GAME
          </Button>
          <GameManager
            score={this.state.score}
            gameState={this.state.gameState}
            colorStatus={this.state.colorStatus}
          />
        </Container>
        <Row className="mt-5">
          <Col>
            <ButtonGroup size="lg">
              {letters.map((letter, i) => (
                <Letter
                  letter={letter}
                  feedback={this.getFeedback(letter) ? "visible" : "hidden"}
                  key={i}
                />
              ))}
            </ButtonGroup>
            <div className="mt-5 ml-5 mr-5">
              {keyboard.map((letter, i) => (
                <Keyboard
                  letter={letter}
                  key={i}
                  onClick={this.handleClick}
                  feedback={this.getFeedback(letter) ? "secondary" : "info"}
                />
              ))}
            </div>
          </Col>
          <Col className="d-flex justify-content-around">
            <Hangman counter={this.trying()} />
            <div>
              {this.state.gameState === "YOU WON!" ? (
                hallOfFame ? (
                  <HallOfFame entries={hallOfFame} />
                ) : null
              ) : null}
            </div>
          </Col>
        </Row>
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
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default App;
