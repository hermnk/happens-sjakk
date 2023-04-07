import React, {Component} from 'react'

class Sidebar extends Component {
    constructor(props){
        super(props);


    }
    render(){
        const { menulist } = this.props
        return(
            <div className="sidebar">
                {menulist.map((item, index) =>(
                    <div className="sidebar-child">{item}</div>
                ))}



            </div>
        )
    }
}
export default Sidebar;