import React, { Component } from 'react';
import Header from '../../../component/header'
// import './usercenter.css'

class LoginPage extends Component {
    constructor(){
        super()
        this.state= {
            accessToken: ''
        }
    }
    hanleClick(e){
        this.props.handleLogin(this.state.accessToken)
        this.refs.tokenInput.value = ''
    }

    handleChange(e){
        this.setState({
            accessToken: e.target.value
        })
    }

    render() {
        return (
            <div className='login-page'>
                <Header title={'登录'}></Header>
                <div className='login-input'>
                    <input ref='tokenInput' className='access-token' type='text' onChange={this.handleChange.bind(this)} placeholder='Access Token'/>
                    <br/>
                    <input className='btn' type='submit' value='登录' onClick={this.hanleClick.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default LoginPage;