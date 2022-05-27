import React from "react";
import "./index.css";
import {
  Board,
  BackButton,
  ForwardButton,
  RestartButton,
	Moves,
} from "./components.js";
import { calculateWinner } from "./utils.js";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      winner: null,
      stepNumber: 0,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    const winner = calculateWinner(squares);
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      winner: winner,
      stepNumber: history.length,
    });
  }

  goBack() {
    if (this.state.stepNumber > 0) {
      this.jumpTo(this.state.stepNumber - 1);
    }
  }

  goFoward() {
    if (this.state.stepNumber < this.state.history.length - 1) {
      this.jumpTo(this.state.stepNumber + 1);
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winner: null,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
   
    let status;
    if (this.state.winner) {
      status = "Winner is " + this.state.winner;
    } else {
      status = (this.state.xIsNext ? "X" : "O") + " to move";
    }

    const canGoForward =
      this.state.stepNumber + 1 === history.length ? false : true;

    return (
      <div className="game">
        <div className="game-box">
          <h3>{status}</h3>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => {
                this.handleClick(i);
              }}
            />
            <div className="game-bar">
              <BackButton onClick={() => this.goBack()} />
              <ForwardButton
                clickable={canGoForward}
                onClick={() => this.goFoward()}
              />
              <RestartButton onClick={() => this.jumpTo(0)} />
            </div>
          </div>
        </div>
        <div className="game-info">
						<Moves history={this.state.history} onClick={(step) => this.jumpTo(step)}/>
        </div>
      </div>
    );
  }
}
