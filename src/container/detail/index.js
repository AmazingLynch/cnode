import React, { Component } from 'react';
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import Header from '../../component/header'
import DetailHeader from '../../component/detailheader'
import DetailContent from '../../component/detailcontent'
import {getContentById,postCreateReply} from '../../fetch'
import ReplyList from './subpage/replylist'


class Detail extends Component {
    constructor(){
        super()
        this.state = {
            data: {},
            inputValue: ''
        }
    }
    componentWillMount(){
        getContentById(this.props.params.id,this.props.userinfo.accessToken)
            .then( res => res.json())
            .then( json => {
                this.setState({
                    data: json.data
                })
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
            let topicId = this.state.data.id
            let accessToken = this.props.userinfo.accessToken
            let content = this.state.inputValue
            let replyId = ''
            postCreateReply(topicId,accessToken,replyId,content)
                .then( res => res.json())
                .then( json => {
                    if(json.success) {
                        this.setState({
                            inputValue: ''
                        })
                    }
                })
                .catch( err => {
                    console.log('发生错误')
                })
        }
    }
    render() {
        const {id,title,author,author_id,content,create_at,visit_count,replies,tab } = this.state.data
        let loginname = author === undefined ? '' : author.loginname
        let avatalUrl = author === undefined ? '' : author.avatal_url
        let isCollect = this.state.data.hasOwnProperty('is_collect') ? this.state.data.is_collect : false
        let createTime = create_at === undefined ? '' : create_at.split('T')[0]
        return (
            <div>
                <Header title='详情'></Header>
                <DetailHeader handleCollect={this.handleCollect} userinfo={this.props.userinfo} id={id} title={title} isCollect={isCollect} loginname={loginname} avatalUrl={avatalUrl} author={author} createTime={createTime} tab={tab} visitCount={visit_count}></DetailHeader>
                <DetailContent content={content}></DetailContent>
                <ReplyList replies={replies} id={id} userinfo={this.props.userinfo}></ReplyList>
                <div className='reply-input'style={{paddingLeft:'1em',paddingRight:'1em'}}>
                    <textarea className='content' type='text' onChange={this.handleTextAreaChange.bind(this)} value={this.state.inputValue}/>
                    <input className='submitBtn' type='submit' onClick={this.handleClickSubmit.bind(this)} value='回复'/>
                </div>
                {/* <p>{this.state.loginname}</p> */}
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
)(Detail)