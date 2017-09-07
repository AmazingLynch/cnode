import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import RouterMap from './router/routermap'
import './static/css/font-awesome.min.css'
import './reset.css'

class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterMap></RouterMap>
            </Provider>
        );
    }
}

ReactDOM.render(<Index/>,document.getElementById('container'));