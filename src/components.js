import React from "react";
import "./index.css";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { MdRestartAlt } from "react-icons/md";

export function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}				

export function BackButton(props) {
	return (
			<TiArrowLeft size={50} onClick={props.onClick}/>
	);
}

export function ForwardButton(props) {
	const color = props.clickable ? "" : "grey";
	return (
		<TiArrowRight size={50} color={color} onClick={props.onClick}/>
	);
}

export function RestartButton(props) {
	return (
		<MdRestartAlt size={35} onClick={props.onClick}/>
	);
}

export function Moves(props) {
	const moves = props.history.map((_, move) => {
      return (
        <li key={move}>
          <button onClick={() => {props.onClick(move)}}>#{move}</button>
        </li>
      );
  });
	return (
		<div className="moves">
		<h5>Moves</h5>
		<ol>
			{moves}
		</ol>
		</div>
	);
}
			

