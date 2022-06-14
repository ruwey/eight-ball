// much of the game logic comes from the react tutorial because I couldnt be asked
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className={`${props.value? props.value == "X"? 'X': 'O':'n'} w-[3rem] h-[3rem] text-3xl border-2 rounded shadow` }
            onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Commit(props) {
  if (props.props.played) {
    return (
      <button className='bg-green-500 border-2 border-green-200 rounded m-4 py-1 px-2'
      onClick={() => returnToSender(props.props)} >
        Commit Move
      </button>
    )
  }
  return (<p></p>);
}

function returnToSender(p) {
  let newSquares = p.squares.slice();
  newSquares[p.sel] = p.player;
  let url = "http://localhost:3000/return/"+params.get('id')+"/"+newSquares.map((i) => {if (i==null) return 'N'; else return i}).join('')+"/"+(p.xIsNext? 'X':'O');
  window.location.assign(url);
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: params.get('pos').split('').map((i) => {if (i === 'N') return null; else return i} ),
      sel: null,
      player: params.get('turn'),
      played: false
    };
  }

  handleClick(i) {
    if (this.state.squares[i] || calculateWinner(this.state.squares)) return;
    this.setState({
      sel: i,
      played: true
    });
  }

  renderSquare(i) {
    return (
      <Square
        num={i}
        value={(this.state.sel != i)? this.state.squares[i] : this.state.player}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.player);

    if (calculateWinner(this.state.squares)) {
      fetch('http://localhost:3000/win/' + params.get('id') + '/' + (this.state.player))
      return (
        <h1>Congratultions Player {calculateWinner(this.state.squares)}!!!</h1>
      )
    }

    return (
      <div className='flex flex-col place-items-center h-screen pt-5'>
        <div className='inline-grid grid-cols-3 gap-3 max-w-fit'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
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
      <div>
        <div>
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
    <h1 className='text-3xl font-bold bg-red-100 text-center py-2'>Game Penguin</h1>
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
