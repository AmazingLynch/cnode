import {hashHistory,Router,Route,IndexRoute} from 'react-router'
import React, { Component } from 'react';
import Edit from '../container/edit'
import HomePage from '../container/homepage'
import Notification from '../container/notification'
import UserCenter from '../container/usercenter'
import App from '../container/app'
import Detail from '../container/detail'
import NotFound from '../container/notfound'

class RouterMap extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={HomePage}></IndexRoute>
                    <Route path='home/:tab' component={HomePage}></Route>
                    <Route path='edit' component={Edit}></Route>
                    <Route path='notification' component={Notification}></Route>
                    <Route path='user' component={UserCenter}></Route>
                    <Route path='detail/:id' component={Detail}></Route>
                    <Route path='*' component={NotFound}></Route>
                </Route>
            </Router>
        );
    }
}

export default RouterMap;