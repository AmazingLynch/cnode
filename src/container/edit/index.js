import React, { Component } from 'react'
import { connect } from 'react-redux'
import {hashHistory} from 'react-router'
import { postCreateTopic } from '../../fetch'
import Header from '../../component/header'
import './index.css'

class Edit extends Component {
    constructor(){
        super()
        this.state = {
            tab: 'notSelect',
            title: '',
            content: ''
        }
    }
    handleSelectChange(e) {
        this.setState({
            tab: e.target.value
        })
    }
    handleTitleInputChange(e) {
        this.setState({
            title: e.target.value
        })
    }
    handleContentInputChange(e) {
        this.setState({
            content: e.target.value
        })
    }
    handleSubmit() {
        //提交数据
        let accessToken = this.props.userinfo.accessToken
        let tab = this.state.tab
        let title = this.state.title
        let content = this.state.content
        if(!accessToken) {//用户还没有登录
            hashHistory.push('/user')
        } else {
            if(tab === 'notSelect') {//没有选择要发表类型
                alert('请选择要发表的类型')
            } else {
                postCreateTopic(accessToken,title,tab,content)
                    .then( res => res.json())
                    .then( json => {
                        if(json.success) {
                            hashHistory.push(`/detail/${json.topic_id}`)
                        } else {
                            console.log(json.error_msg)
                        }
                    })
                    .catch( err => {
                        console.log('出错了')
                    })
            }
        }
    }
    render() {
        return (
            <div className='edit'>
                <Header title='发表主题'></Header>
                <div className='input-area'>
                   <select onChange={this.handleSelectChange.bind(this)}>
                        <option value='notSelect'>请选择</option>
                        <option value='share' disabled>分享</option>
                        <option value='ask' disabled>问答</option>
                        <option value='job' disabled>招聘</option>
                        <option value='dev'>客户端测试</option>
                    </select>
                    <br/>
                    <input type='text' placeholder='标题字数十字以上' onChange={this.handleTitleInputChange.bind(this)}/>
                    <br/>
                    <textarea placeholder='请输入主题内容' onChange={this.handleContentInputChange.bind(this)}></textarea>
                    <br/>
                    <input className='submitBtn' type='submit' value='发表' onClick={this.handleSubmit.bind(this)}/>
                </div>
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
)(Edit)