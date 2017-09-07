import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import Header from '../../component/header'
import MessageList from '../../component/message/messagelist'
import { getMessage , postMarkOneMessage } from '../../fetch'

class Notification extends Component {
    constructor() {
        super()
        this.state = {
            hasRead: [],
            notRead: []
        }
    }
    //如果点击了某一个消息的话,则将此消息标记为已读
    handleClickLink(accessToken,id) {
        postMarkOneMessage(accessToken,id)
            .then( res => res.json())
            .then( json => {
                if(json.success) {
                    console.log('发送标记消息已读成功')
                }
            })
            .catch( err => {
                console.log('出错啦')
            })
    }
    componentWillMount() {
        if(!this.props.userinfo.accessToken) {
            hashHistory.push('/user')
        } else {
            getMessage(this.props.userinfo.accessToken)
                .then( res => res.json())
                .then( json => {
                    if( json.success) {
                        this.setState({
                            hasRead: json.data.has_read_messages,
                            notRead: json.data.hasnot_read_messages
                        })
                        console.log('获取成功')
                    } else {
                        console.log(json.error_msg)
                    }
                })
                .catch( err => {
                    console.log('请求消息出错' + err)
                })
        }
    }
    render() {
        return (
            <div className='notification'>
                <Header title='消息'></Header>
                <MessageList accessToken={this.props.userinfo.accessToken} handleClickLink={this.handleClickLink} notRead={this.state.notRead} hasRead={this.state.hasRead}></MessageList>
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
    }
}
export default connect(
    mapPropsToState,
    mapDispatchToProps
)(Notification)