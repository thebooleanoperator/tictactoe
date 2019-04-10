import React from 'react';
import './App.css';
import GameBoard from './Components/GameBoard'; 
import Status from './Components/Status';
import StartGame from './Components/StartGame';

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      gameStarted: false,
      gameOver: false,
      turn: '',
      userMark: '',
      computerMark: '',
      gameBoard: ["", "", "", "", "", "", "", "", ""],
      endGameMessage: ""
    }
   
    this.handleSelectMarker = this.handleSelectMarker.bind(this);
    this.whoGoesFirst = this.whoGoesFirst.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.isAvailable = this.isAvailable.bind(this);
    this.isBoardFull = this.isBoardFull.bind(this);
    this.computerMove = this.computerMove.bind(this);
    this.setGameOver = this.setGameOver.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleSelectMarker(e){
    e.preventDefault()

    const userChoice = e.target.value 

    this.setState({
      userMark: userChoice, 
      computerMark: userChoice === "X" ? "O" : "X",
      gameStarted: true
    })

    this.whoGoesFirst();
  }

  whoGoesFirst(){
    const rando = Math.floor(Math.random() * 11)
    if (rando < 5){
      this.setState({
        turn: "user"
      })
    }
    else{
      this.setState({
        turn: "computer"
      })
    }
  }

  handleSelect(e){ 
    e.preventDefault()
    if (!this.state.gameOver){

      if(this.isBoardFull()){return this.setGameOver("Draw")}

      const idx = e.target.value; 
      const mark = this.state.userMark
      
      if (this.isAvailable(idx)){
         this.updateBoard(idx, mark)
         this.changeTurn()
      }
    }

  }

  updateBoard(idx, mark){
    this.state.gameBoard.splice(idx, 1, mark)
    
    this.setState({
      gameBoard: this.state.gameBoard,
      mostRecentMove: idx,
    })
    console.log(this.state.gameBoard)
  }

  computerMove(userCanWin, computerCanWin){
    if(this.isBoardFull()){return this.setGameOver("Draw")}

    let spaceFound = false; 

    while (!spaceFound){
      let pick; 
      if (typeof computerCanWin === 'number'){
        pick = computerCanWin
        console.log(pick)
      }
      else if(typeof userCanWin === 'number'){
        pick = userCanWin
        console.log(pick)
      }
      else if(this.isAvailable(4)){
        pick = 4
      }
      else{
        pick = Math.floor(Math.random() * 9);
      }
   
      if (this.isAvailable(pick)){
        this.updateBoard(pick, this.state.computerMark);
        spaceFound = true;
      }
    }
    if(this.isBoardFull()){return this.setGameOver("Draw")}

    this.changeTurn()
  }
  
  isAvailable(idx){
    return this.state.gameBoard[idx] === ""; 
  }
  
  isBoardFull(){
    const res = this.state.gameBoard.filter((element)=>{
      return element !== ""
    })
    return res.length === 9;
  }

  changeTurn(){
    this.setState({
      turn: this.state.turn === "user" ? "computer" : "user"
    })
  }

  setGameOver(msg){
    this.setState({
      gameOver: true,
      endGameMessage: msg
    })
  }

  reset(){
    this.setState({
      gameStarted: false, 
      gameOver: false,
      userMark: '',
      computerMark: '',
      turn: "",
      gameBoard: ["", "", "", "", "", "", "", "", ""],
      endGameMessage: ""
    })
  }



  render() {
    if(!this.state.gameStarted){
      return(
        <div className="App">

          <h1 id="title">Tic Tac Toe</h1>

          <StartGame 
          selectMarker={this.handleSelectMarker}
          turn={this.state.turn}
          />
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <h1 id="title">Tic Tac Toe</h1>

          <h3 id="endGame">{this.state.endGameMessage !== "" ? this.state.endGameMessage : "Your Marker: " + this.state.userMark}</h3>

          <GameBoard 
          select={this.handleSelect} 
          board={this.state.gameBoard}
          />  
  
          <Status 
            board={this.state.gameBoard} 
            setGameOver={this.setGameOver}
            gameOver={this.state.gameOver}
            userMark={this.state.userMark}
            computerMark={this.state.computerMark}
            computerMove={this.computerMove}
            turn={this.state.turn}
            endGameMessage={this.state.endGameMessage}
            reset={this.reset}
          />
        </div>
      );
    }
  }
}

export default App;

