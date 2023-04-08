import React, {props} from 'react'
import Board from './components/board'
import Hotbar from './components/hotbar'
import Sidebar from './components/sidebar'

const App = () =>{
    const profileList = ["Game history", "Rating", "Jeg", "kult"]
    const playList = [{title: "Game length:"}, {categories: ["10 min", "3 min", "1 min"]}]

    return(
    <div className="game-page"> 
        <Hotbar/>
        <div className="sidebar-board">
            <div className="sidebar-scaled">
                <Sidebar menulist={playList}/>
            </div>
            <Board/>
        </div>
    </div>
    )
}

export default App;