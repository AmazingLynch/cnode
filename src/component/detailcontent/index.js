import React, { Component } from 'react';
import './index.css'

class DetailContent extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html:this.props.content}}>
                
            </div>
        );
    }
}

export default DetailContent;