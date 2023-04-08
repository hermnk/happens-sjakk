import React, {Component} from 'react'

class Sidebar extends Component {
    constructor(props){
        super(props);


    }
    render(){
        const { menulist } = this.props
        return(
            <div className="sidebar smaller">
                <h2>{menulist[0].title}</h2>
                {(menulist[1].categories).map((item, index) =>(
                    <div className="sidebar-child">{item}</div>
                ))}
            </div>
        )
    }
}
export default Sidebar;