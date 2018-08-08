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
  ModalFooter,
  Fade
} from "reactstrap";
import Confetti from "react-dom-confetti";

import Keyboard from "./components/Keyboard";
import Letter from "./components/Letter";
import GameManager from "./components/GameManager";
import Hangman from "./components/Hangman";
import HallOfFame from "./components/HallOfFame";
import HighScoreInput from "./components/HighScoreInput";
import ChooseDifficulty from "./components/ChooseDifficulty";
import AddWordInput from "./components/AddWordInput";

import { getWords } from "./api/API";

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
    currentPlayer: "",
    selection: [],
    gameState: "IN GAME",
    hallOfFame: null,
    hallOfFameModal: null,
    difficulty: null,
    difficultyModal: true,
    AddWordModal: false,
    colorStatus: "warning",
    score: 0,
    hideNav: false,
    letters: null,
    keyboard: this.generateKeyboard(),
    validMessageAddWord: ""
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  getAllWords(difficulty) {
    const words = [];
    getWords(difficulty).then(word =>
      this.setState({
        letters: this.generateWords(words.concat(word))
      })
    );
  }

  resize() {
    this.setState({ hideNav: window.innerWidth <= 760 });
  }

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

  generateWords(words) {
    const result = [];
    const word = words[Math.floor(Math.random() * words.length)].word.split("");
    while (word.length > 0) {
      const letter = word.shift();
      result.push(letter);
    }
    return result;
  }

  // Arrow fx for binding
  newGame = difficulty => {
    this.setState(
      {
        difficulty: difficulty,
        selection: [],
        gameState: "IN GAME",
        colorStatus: "warning",
        // hallOfFame: null,
        hallOfFameModal: null,
        difficultyModal: false,
        score: 0,
        validMessageAddWord: ""
      },
      () => this.getAllWords(difficulty)
    );
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
  // setMode = mode => {
  //   this.setState({ mode: mode });
  // };

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

  setCurrentPlayer = newPlayer => {
    this.setState({ currentPlayer: newPlayer });
  };

  render() {
    const { letters, keyboard, hallOfFame, hallOfFameModal } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        <h1
          style={
            this.state.hideNav
              ? { fontSize: 50, color: "white", background: "#222" }
              : { fontSize: 85, color: "white", background: "#222" }
          }
        >
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
              {/* {this.state.gameState === "YOU WON!" ? ( */}
              {hallOfFame ? <HallOfFame hideNav={this.state.hideNav} /> : null}
              {/* ) : null} */}
            </Col>
          </Row>
        ) : null}
        <Row className="mt-5">
          <Col>
            <ButtonGroup
              size={this.state.hideNav ? "sm" : "lg"}
              // className="ml-3"
            >
              {letters !== null
                ? letters.map((letter, i) => (
                    <Letter
                      letter={letter}
                      feedback={this.getFeedback(letter) ? "visible" : "hidden"}
                      key={i}
                    />
                  ))
                : null}
            </ButtonGroup>
            <Container className="mt-5">
              {keyboard.map((letter, i) => (
                <Keyboard
                  hideNav={this.state.hideNav}
                  letter={letter}
                  key={i}
                  onClick={this.handleClick}
                  feedback={this.getFeedback(letter) ? "secondary" : "info"}
                />
              ))}
            </Container>
          </Col>
          {this.state.hideNav ? null : (
            <Col className="d-flex justify-content-around">
              {this.state.hideNav ? null : <Hangman counter={this.trying()} />}
              <div>{hallOfFame ? <HallOfFame /> : null}</div>
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
        <ChooseDifficulty
          difficultyModal={this.state.difficultyModal}
          newGame={difficulty => this.newGame(difficulty)}
          // setMode={mode => this.setMode(mode)}
        />
        <Modal isOpen={this.state.gameState === "GAME OVER" ? true : false}>
          <ModalHeader
            style={{ fontSize: 30 }}
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
              ? hallOfFameModal
                ? null
                : true
              : false
          }
        >
          <ModalHeader
            style={{ fontSize: 30 }}
            color="success"
            className="text-success"
            toggle={() =>
              this.setState({ hallOfFame: true, hallOfFameModal: true })
            }
          >
            YOU WON!
          </ModalHeader>
          <ModalBody style={{ fontSize: 40 }}>
            WELL DONE ! YOU <a className="text-success">WON</a> !
            <p>SCORE: {this.state.score}</p>
            <HighScoreInput
              score={this.state.score}
              setCurrentPlayer={this.setCurrentPlayer}
              currentPlayer={this.state.currentPlayer}
              setHallOfFame={() =>
                this.setState({ hallOfFame: true, hallOfFameModal: true })
              }
              hideNav={this.state.hideNav}
            />
          </ModalBody>
          <ModalFooter>
            <Fade
              in={this.state.validMessageAddWord !== "" ? true : false}
              className="text-success"
              style={{ fontSize: 16 }}
            >
              {this.state.validMessageAddWord}
            </Fade>
            <Button
              color="warning"
              size="lg"
              onClick={() => this.setState({ AddWordModal: true })}
            >
              PARTICIPATE IN THE GAME
            </Button>
          </ModalFooter>
        </Modal>
        <AddWordInput
          activeAddModal={this.state.AddWordModal}
          addWordInputFunction={message =>
            this.setState({
              AddWordModal: !this.state.AddWordModal,
              // validMessageAddWord: message + "🎉"
              validMessageAddWord: message
            })
          }
        />
        <div
          className="d-flex justify-content-center text-muted"
          style={{
            position: "absolute",
            bottom: "10px",
            width: "100%",
            fontSize: this.state.hideNav ? 11 : 17
          }}
        >
          Made with <i className="fas fa-heart text-danger mt-1 ml-1 mr-1" /> by{" "}
          <a href="https://github.com/toutane" className="ml-1 mr-1">
            @toutane
          </a>{" "}
        </div>
      </div>
    );
  }
}

export default App;
