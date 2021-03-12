import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//component is a class/type, takes parameters/"props"
//returns hierarchy of views to display via render method
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        }; //stores "state" aka remembers that X was clicked
    }      //this.state is considered private thing of class Square
    
    render() {          //render returns a React element, a description of what to render
        return (        //using JSX makes structures easier to write
            <button
                className="Square"
                onClick={()=> this.setState({value: 'X'})}
                >
                    {this.state.value}
            </button> //on click, current states value is displayed
        ); //takes values passed by Board
    }
} //Square renders a single button

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i}/>;
    }

    render() {
        const status = 'Next Player: X';

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

ReactDOM.render(
    <Game />, //this div tag is transformed at build time to React.createELement('div')
              //essentially acts as a shortcut instead of much longer code
    document.getElementById('root')
);