import React from "react";
import "./index.css";
import { Board, BackButton } from "./components.js";
import { calculateWinner } from "./utils.js";
import { IoMdArrowBack } from "react-icons";

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
			this.jumpTo(this.state.stepNumber - 1)
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

    const moves = history.map((_, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (this.state.winner) {
      status = "Winner is " + this.state.winner;
    } else {
      status = "Player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {
              this.handleClick(i);
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
					<BackButton onClick={() => this.goBack()}/>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
