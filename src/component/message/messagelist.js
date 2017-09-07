import React, { Component } from 'react'
import MessageItem from './messageitem'

class MessageList extends Component {
    render() {
        const notReadItemList = this.props.notRead.length === 0 ? '' : this.props.notRead.map((notReadItem , index) => {
            let hasRead = notReadItem.has_read
            let id = notReadItem.id
            let author = notReadItem.author
            let topic = notReadItem.topic
            let createTime = notReadItem.create_at.split('T')[0]
            let content = notReadItem.type === 'reply' ? '回复了你,在' : '@了你,在'
            return (<MessageItem accessToken={this.props.accessToken} handleClickMessageItem={this.props.handleClickLink} key={index} hasRead={hasRead} id={id} author={author} topic={topic} createTime={createTime} content={content}></MessageItem>)
        })
        const hasReadItemList = this.props.hasRead.length === 0 ? '' : this.props.hasRead.map((hasReadItem , index) => {
            let hasRead = hasReadItem.has_read
            let id = hasReadItem.id
            let author = hasReadItem.author
            let topic = hasReadItem.topic
            let createTime = hasReadItem.create_at.split('T')[0]
            let content = hasReadItem.type === 'reply' ? '回复了你,在' : '@了你,在'
            return (<MessageItem key={index} hasRead={hasRead} id={id} author={author} topic={topic} createTime={createTime} content={content}></MessageItem>)
        })
        return (
            <div>
                {notReadItemList}
                {hasReadItemList}
            </div>
        );
    }
}

export default MessageList;