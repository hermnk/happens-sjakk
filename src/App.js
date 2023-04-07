import React, {props} from 'react'
import Board from './components/board'
import Hotbar from './components/hotbar'
import Sidebar from './components/sidebar'

const App = () =>{
    const profileList = ["Game history", "Rating", "Jeg", "kult"]
    const playList = ["10 min", "3 min", "1 min"]

    return(
    <div> 
        <Hotbar/>
        <Sidebar menulist={playList}/>

    </div>
    )
}

export default App;