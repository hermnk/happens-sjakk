import React, {Component} from 'react'
import Theme from './media/theme_icon.png'
import Puzzle from './media/puzzle_icon.png'
import Profile from './media/profile_icon.png'
import Friends from './media/friends_icon.png'

class Hotbar extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <div className="hotbar-top">
                <div className="hotbar-top-element">
                    <img src={Theme}/>
                    <p className="hotbar-text">Themes</p>
                </div>
                <div className="hotbar-top-element">
                    <img src={Puzzle}/>
                    <p className="hotbar-text">Puzzles</p>
                </div>
                <div className="hotbar-top-element play-button">
                    <h1>Play Online</h1>
                </div>
                <div className="hotbar-top-element">
                    <img src={Profile}/>
                    <p className="hotbar-text">Profile</p>
                </div>
                <div className="hotbar-top-element">
                    <img src={Friends}/>
                    <p className="hotbar-text">Friends</p>
                </div>
            </div>
        )
    }
}
export default Hotbar;