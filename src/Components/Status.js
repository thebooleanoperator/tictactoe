import React from 'react'; 
import './Status.css'

class Status extends React.Component{
    constructor(props){
        super(props)

        this.moves = {
            "user": [],
            "computer": []
        }; 
        this.winningCombos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]]; 
      
        this.updateMoves = this.updateMoves.bind(this)
        this.isWin = this.isWin.bind(this)
        this.userCanWin = this.userCanWin.bind(this)
        this.computerCanWin = this.computerCanWin.bind(this)
        this.clearMoves = this.clearMoves.bind(this)
    }

    isWin(){
        const userTest = (element) => {
            return this.moves["user"].includes(element[0]) && this.moves["user"].includes(element[1]) && this.moves["user"].includes(element[2])
        }
        const computerTest = (element) => {
            return this.moves["computer"].includes(element[0]) && this.moves["computer"].includes(element[1]) && this.moves["computer"].includes(element[2])
        }

        const userWins = this.winningCombos.some(userTest);
        const computerWins = this.winningCombos.some(computerTest); 
        if(userWins){
            this.props.setGameOver("Congratulations! You Win!")
            return "user" 
        }

        if(computerWins){
            this.props.setGameOver("Uh oh, you lost :(")
            return "computer"
        }

        return false;

    }


    updateMoves(board, playerMark, computerMark){
        for (let i=0; i<board.length; i++){
            if (board[i] === playerMark && !this.moves["user"].includes(i)){
                this.moves["user"].push(i)
            }
            else if(board[i] === computerMark && !this.moves["computer"].includes(i)){
                this.moves["computer"].push(i)
            }
        }
    }

    computerCanWin(winningCombos){
        for (let i=0; i<winningCombos.length; i++){
            if (this.moves["computer"].includes(winningCombos[i][0]) && this.moves["computer"].includes(winningCombos[i][1]) && this.props.board[winningCombos[i][2]] === ""){
                return winningCombos[i][2]
            }
            else if (this.moves["computer"].includes(winningCombos[i][0]) && this.moves["computer"].includes(winningCombos[i][2]) && this.props.board[winningCombos[i][1]] === ""){
                return winningCombos[i][1]
            }
            else if (this.moves["computer"].includes(winningCombos[i][1]) && this.moves["computer"].includes(winningCombos[i][2]) && this.props.board[winningCombos[i][0]] === ""){
                return winningCombos[i][0]
            }
        }
        return false; 
      }
      
      userCanWin(winningCombos){
        for (let i=0; i<winningCombos.length; i++){
            if (this.moves["user"].includes(winningCombos[i][0]) && this.moves["user"].includes(winningCombos[i][1]) && this.props.board[winningCombos[i][2]] === ""){
                return winningCombos[i][2]
            }
            else if (this.moves["user"].includes(winningCombos[i][0]) && this.moves["user"].includes(winningCombos[i][2]) && this.props.board[winningCombos[i][1]] === ""){
                return winningCombos[i][1]

            }
            else if (this.moves["user"].includes(winningCombos[i][1]) && this.moves["user"].includes(winningCombos[i][2]) && this.props.board[winningCombos[i][0]] === ""){
                return winningCombos[i][0]
            }
          }
          return false; 
      }

      clearMoves(){
          this.moves = {
              "user": [],
              "computer": []
          }
      }

    render(){
        if(!this.props.gameOver){
            this.updateMoves(this.props.board, this.props.userMark, this.props.computerMark)

            if(!this.isWin() && this.props.turn==="computer"){
                let userCanWin = this.userCanWin(this.winningCombos)
                let computerCanWin = this.computerCanWin(this.winningCombos)
                this.props.computerMove(userCanWin, computerCanWin)
            }
        }
        else{
            
            this.moves["user"] = []
            this.moves["computer"] = []
        }
        
        return(
            <div className="statusDisplay">
                <button id="resetButton" onClick={() => {this.props.reset(); this.clearMoves()}}>Reset Game</button>
            </div>
        )
    }


}

export default Status;