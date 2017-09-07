import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {postAccessToken,getUserCollection} from '../../fetch'
import Header from '../../component/header'
import UserPage from './subpage/userpage'
import LoginPage from './subpage/loginpage'
import PageList from '../../component/pagelist'
import * as ActionType from '../../actions/userinfo'
import './usercenter.css'
import { setItemToLocalStorage } from '../../util/localstorage'

class UserCenter extends Component {
    constructor(){
        super()
        this.state = {
            accessToken: '',
            loginname: '',
            usercollection: []
        }
    }

    componentWillMount() {
        if(!this.props.userinfo.accessToken) {
            
        } else {
            getUserCollection(this.props.userinfo.loginname)
                .then( res => res.json())
                .then( json => {
                    this.setState({
                        usercollection: json.data
                    })
                })
        }
    }
    handleChange(e){
        this.setState({
            accessToken: e.target.value
        })
    }

    hanleClick(){
        this.login(this.state.accessToken)
        this.refs.tokenInput = ''   
    }
    login(token){
        postAccessToken(token)
            .then( res => {
                return res.json()
            })
            .then( json => {
                if(json.success){
                    //加入accessToken
                    let userData = {}
                    userData.loginname = json.loginname
                    userData.avatarUrl = json.avatar_url
                    userData.id = json.id
                    userData.accessToken = this.state.accessToken

                    //存入localStorage
                    setItemToLocalStorage('loginname',json.loginname)
                    setItemToLocalStorage('avatarUrl',json.avatar_url)
                    setItemToLocalStorage('id',json.id)
                    setItemToLocalStorage('accessToken',this.state.accessToken)
                    
                    this.props.userinfoActions.login(userData)
                    this.loadUserCollection(json.loginname)

                    

                }else{
                    alert('token错误，请重新输入')
                }
            })
            .catch( err => {
                alert('请求出错，请重新输入')
            })
    }
/*     componentWillMount(){
        if(this.props.userinfo){
            this.loadUserCollection
        }
    } */
    handleExit() {
        this.props.userinfoActions.logout()
        setItemToLocalStorage('loginname','')
        setItemToLocalStorage('avatarUrl','')
        setItemToLocalStorage('id','')
        setItemToLocalStorage('accessToken','')
    }
    loadUserCollection(userLoginName){     
        if(userLoginName){
            getUserCollection(userLoginName)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        usercollection: json.data
                    })
                })
        }
    }
    render() {
        return (
            <div> 
                {
                    this.props.userinfo.loginname
                    ?
                    <div className='usercenter'>
                        <Header title='用户中心'></Header>
                        <div className='userinfo'>      
                            <img src={this.props.userinfo.avatarUrl} alt='用户头像'/>
                            <p>{this.props.userinfo.loginname}</p>
                            <a onClick={this.handleExit.bind(this)}><i className="fa fa-power-off fa-2x" aria-hidden="true"></i></a>
                        </div>
                        <div className='usercollection'>
                            <span className='title'>收藏的主题</span>
                            <br/>
                            <PageList data={this.state.usercollection}></PageList>
                        </div>
                    </div>
                    :
                    <div className='login-page'>
                        <Header title={'登录'}></Header>
                        <div className='login-input'>
                            <input ref='tokenInput' className='access-token' type='text' onChange={this.handleChange.bind(this)} placeholder='Access Token'/>
                            <br/>
                            <input className='btn' type='submit' value='登录' onClick={this.hanleClick.bind(this)}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
function mapPropsToState(state) {
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(ActionType,dispatch)
    }
}
export default connect(
    mapPropsToState,
    mapDispatchToProps
)(UserCenter)