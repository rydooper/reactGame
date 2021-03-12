import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//function to make the squares, to use later
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button> //on click, function (handleClick) in Board is called
    );
}

//component is a class/type, takes parameters/"props"
//returns hierarchy of views to display via render method

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    } //a square now either has X, O or null
    
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        } //if a winner is found, stops game and declares 
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        }); //creates copy of array + slices square wanted for editing
    } //sets value in square to O or X depending on xIsNext state (true=X, false=Y)

    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={()=> this.handleClick(i)}
            />
        ); //parenthesis added so JS doesnt add ; n break it
    } //calls handleClick 

//render returns a React element, a description of what to render
//using JSX makes structures easier to write        
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNex ? 'X' : 'O');
        }

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
            </div>
        );
    }
} //Board renders 9 Squares

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div> { /* status */} </div>
                    <ol> {/* todo */} </ol>
                </div>
            </div>
        );
    }
} //Game renders Board with placeholder values

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]; //winning combinations
    
    for (let i=0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; //returns winner
        }
    }
    return null; //safety return
}

ReactDOM.render(
    <Game />, //this div tag is transformed at build time to React.createELement('div')
              //essentially acts as a shortcut instead of much longer code
    document.getElementById('root')
);