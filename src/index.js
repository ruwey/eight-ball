// much of the game logic comes from the react tutorial because I couldnt be asked
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
  if (props.props.played) {
    return (
      <button onClick={() => returnToSender(props.props)} >Commit Move</button>
    )
  }
  return (<p></p>);
}

function returnToSender(p) {
  let url = "http://localhost:3000/return/"+params.get('id')+"/"+p.squares.slice().map((i) => {if (i==null) return 'N'; else return i}).join('')+"/"+(p.xIsNext? 'X':'O');
  window.location.assign(url);
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: params.get('pos').split('').map((i) => {if (i === 'N') return null; else return i} ),
      xIsNext: params.get('turn') === 'X',
      played: false
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] || this.state.played || calculateWinner(squares)) return;
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

    if (calculateWinner(this.state.squares)) {
      fetch('http://localhost:3000/win/' + params.get('id') + '/' + (this.state.xIsNext? 'X':'O'))
      return (
        <h1>Congratultions Player {calculateWinner(this.state.squares)}!!!</h1>
      )
    }

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
      <Commit props={this.state} />
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

const params = new URLSearchParams(window.location.search);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1>Game Penguin</h1>
    <hr/>
    <Game />
  </div>
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
