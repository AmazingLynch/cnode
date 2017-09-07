import React, { Component } from 'react';
import {hashHistory} from 'react-router'
import {postCollect,postDecollect} from '../../fetch'
import './index.css'

class DetailHeader extends Component {
    constructor(){
        super()
        this.state = {
            isCollect: false
        }
    }
    componentWillReceiveProps(np){
        this.setState({
            isCollect: np.isCollect
        })
    }

    handleCollect(e){
        if(!this.props.userinfo.loginname){//如果用户名为空的话，则说明没有登录，跳转到登录界面
            hashHistory.push('/user')
        }else{
            if(e.target.value === '收藏') {
                console.log('发送收藏请求')
                postCollect(this.props.userinfo.accessToken,this.props.id)//收藏
                    .then( res => res.json())
                    .then( json => {
                         if(json.success) {
                            this.setState({
                                isCollect: true
                            })
                        }else{
                            console.log('...')
                        } 
                    }) 
            } else {
                console.log('发送取消收藏请求')
                postDecollect(this.props.userinfo.accessToken,this.props.id)//取消收藏
                    .then( res => res.json())
                    .then( json => {
                        if(json.success){
                            this.setState({
                                isCollect: false
                            })
                        }else {
                            console.log('...')
                        }
                    })
            }
        }
   
    }
    render() {
        const {title,createTime,loginname,avatalUrl,tab,visitCount,content} = this.props
        var value =''
        var style = {}
        if(this.state.isCollect) {
            value = '取消收藏'
            style.backgroundColor = 'rgba(21,2,13,0.4)'
        }else {
            value = '收藏'
            style.backgroundColor = '#5F1854'
        }
        return (
            <div className='detail-header'>
                <h2 className='title'>{title}</h2>
                <p>{`作者:${loginname}\t发布于:${createTime}\t${visitCount}次浏览\t来自于${tab}`}</p>
                <input type='submit' value={value} style={style} onClick={this.handleCollect.bind(this)}/>
            </div>
        );
    }
}

export default DetailHeader;