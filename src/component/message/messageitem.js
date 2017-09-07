import React, { Component } from 'react';
import { Link } from 'react-router'
import './index.css'
class MessageItem extends Component {
    render() {
        const { hasRead , id , author , topic , createTime , content } = this.props
        return (
            <div className='message-item'>
                <div className='img-wrap'>
                    <img src={author.avatar_url}/>
                </div>
                <div className='content-wrap'>
                    <h4>{author.loginname}&nbsp;&nbsp;<span>{createTime}</span></h4>
                    <p className='content'>
                        {
                        hasRead 
                        ?
                        ''
                        :
                        <span className='read-flag'></span>
                        }
                        {
                            content
                        }
                        <Link to={`/detail/${topic.id}`} onClick={this.props.handleClickMessageItem ? this.props.handleClickMessageItem.bind(this,this.props.accessToken,id) : null}>{topic.title}</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default MessageItem;