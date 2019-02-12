import React, { Component } from 'react'
import {hashHistory} from 'react-router'
import {postUpReply,postCreateReply} from '../../fetch'
import './index.css'

class ReplyItem extends Component {
    constructor(){
        super()
        this.state = {
            inputShow: false,
            isUped: false,
            upLength: 0,
            inputValue: ''
        }
    }
    componentWillMount() {
        this.setState({
            isUped: this.props.reply.is_uped,
            upLength: this.props.reply.ups !== [] ? this.props.reply.ups.length : 0,
            inputValue: `@${this.props.reply.author.loginname} `
        })
    }
    handleClickUp() {
        //点击点赞按钮，发送点赞请求
        if(!this.props.userinfo.loginname){
            hashHistory.push('/user')
        }else{
            postUpReply(this.props.reply.id,this.props.userinfo.accessToken)
                .then( res => res.json())
                .then( json => {
                    if(json.success) {
                        if(json.action==='up'){//点赞
                            this.setState({
                                isUped: true,
                                upLength: this.state.upLength + 1
                            })
                        } else {                //取消点赞
                            this.setState({
                                isUped: false,
                                upLength: this.state.upLength - 1
                            })
                        }
                    }
                })
                .catch( err => {
                    console.log('出错了')
                })
            }
    }
    handleClickReply() {
        //点击回复按钮
        this.setState({
            inputShow: !this.state.inputShow
        })
    }
    handleTextAreaChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }
    handleClickSubmit() {
        if(!this.props.userinfo.loginname){
            hashHistory.push('/user')
        } else {
            let topicId = this.props.id
            let accessToken = this.props.userinfo.accessToken
            let replyId = this.props.reply.id
            let content = this.state.inputValue
            postCreateReply(topicId,accessToken,replyId,content)
                .then( res => res.json())
                .then( json => {
                    if(json.success) {
                        this.setState({
                            inputShow: false
                        })
                    }
                })
                .catch( err => {
                    console.log('发生错误')
                })
        }
    }
    render() {
        const {id,author,content,ups,create_at,is_uped} = this.props.reply
        const upStyle = {}
        upStyle.color = this.state.isUped ? 'red' : 'black'
        return (
            <div className='replyitem'>
                <div className='avatal-wrap'>
                    <img src={author.avatar_url}/>
                </div>
                <div className='right'>
                    <p className='index'>#{this.props.index}</p>
                    <p className='up-reply'>
                        <i style={upStyle}className="fa fa-thumbs-o-up fa-1x" aria-hidden="true" onClick={this.handleClickUp.bind(this)}></i>{this.state.upLength}
                        &nbsp;&nbsp;
                        <i className="fa fa-reply fa-1x" aria-hidden="true" onClick={this.handleClickReply.bind(this)}></i>
                    </p>
                </div>
                <div className='content-wrap'>
                    <h5 className='aurhor'>{author.loginname}</h5>
                    <div className='content' dangerouslySetInnerHTML={{__html:content}}></div>
                    {
                    this.state.inputShow 
                    ?
                    <div className='reply-input'>
                        <textarea className='content' type='text' onChange={this.handleTextAreaChange.bind(this)} value={this.state.inputValue}/>
                        <input className='submitBtn' type='submit' onClick={this.handleClickSubmit.bind(this)} value='回复'/>
                    </div>
                    :
                    ''
                }
                </div>
                
            </div>
        );
    }
}

export default ReplyItem;