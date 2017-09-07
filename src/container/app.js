import React, { Component } from 'react';

class App extends Component {
    constructor(){
        super()
        this.state = {
            initDone: false
        }
    }
    componentDidMount(){
        this.setState({
            initDone:true
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone===true
                    ?
                    this.props.children
                    :
                    <div><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></div>                    
                }
            </div>
        );
    }
}

export default App;