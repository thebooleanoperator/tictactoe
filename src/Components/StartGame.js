import React from 'react';
import './StartGame.css';

class StartGame extends React.Component{
    render(){
        return(
            <div className="startBoard"> 

                <h3 id="selectTitle">Select Your Game Marker</h3>

                <div className="startButtons">
                    <button id="X" value="X" onClick={this.props.selectMarker}>X</button>
                    <button id="O" value="O" onClick={this.props.selectMarker}>O</button>
                </div>
            </div>

        );
    }
}

export default StartGame; 