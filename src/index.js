import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="cell" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Commit(props) {
  if (props.played) {
    return (
      <button>Commit Move</button>
    )
  }
  return (<p>h</p>);
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    console.log(params.get('pos'))
    this.state = {
      squares: params.get('pos').split('').map((i) => {if (i === 'N') return null; else return i} ),
      xIsNext: params.get('turn') == 'X',
      played: false
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] || this.state.played) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      played: true
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
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
      <Commit played={this.state.played} />
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1>Game Penguin</h1>
    <hr/>
    <Game />
  </div>
);
