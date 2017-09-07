import React, { Component } from 'react';
import ReplyItem from '../../../component/replyitem'
import './index.css'

class ReplyList extends Component {
    
    render() {
        var replylist = this.props.replies
        ?
        this.props.replies.map((reply,index) => (<ReplyItem reply={reply} id={this.props.id} index={index} key={index} userinfo={this.props.userinfo}></ReplyItem>))
        :
        '没有任何评论'
        var length = this.props.replies ? this.props.replies.length : ''
        return (
            <div className='replylist'>
                <p className='title'>{length}回复</p>
                {replylist}
            </div>
        );
    }
}

export default ReplyList;