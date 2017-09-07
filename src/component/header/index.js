import React, { Component } from 'react'
import './index.css'

class Header extends Component {
    handleClick(){
        history.back()
    }
    render() {
        return (
            <div className='common-header'>
                <i className="left fa fa-chevron-left" aria-hidden="true" onClick={this.handleClick.bind(this)}></i>
                {this.props.title}
            </div>
        );
    }
}

export default Header;