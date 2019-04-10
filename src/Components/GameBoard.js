import React from 'react'; 
import './GameBoard.css'

class GameBaord extends React.Component{
    render(){
        return(
            <div className="gameBoard">
                <div className="gameRow1">
                    <button id="box0" value="0" onClick={this.props.select}>{this.props.board[0]}</button>
                    <button id="box1" value="1" onClick={this.props.select}>{this.props.board[1]}</button>
                    <button id="box2" value="2" onClick={this.props.select}>{this.props.board[2]}</button> 
                </div>
                <div className="gameRow2">
                    <button id="box3" value="3" onClick={this.props.select}>{this.props.board[3]}</button>
                    <button id="box4" value="4" onClick={this.props.select}>{this.props.board[4]}</button>
                    <button id="box5" value="5" onClick={this.props.select}>{this.props.board[5]}</button>
                </div>

                <div className="gameRow3">
                    <button id="box6" value="6" onClick={this.props.select}>{this.props.board[6]}</button>
                    <button id="box7" value="7" onClick={this.props.select}>{this.props.board[7]}</button>
                    <button id="box8" value="8" onClick={this.props.select}>{this.props.board[8]}</button>
                </div>

            </div>
        )
    }

}

export default GameBaord; 