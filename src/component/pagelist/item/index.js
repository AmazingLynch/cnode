import React, { Component } from 'react';
import {Link} from 'react-router'
import './index.css'

class PageItem extends Component {
    computeTag(top,good) {
        if(good){
            return '精华'
        }
        if(top){
            return '置顶'
        }
    }
    render() {
        const {id,author_id,tab,content,title,last_reply_at,good,top,reply_count,visit_count,create_at,author} = this.props.data
        
        return (
            <div className='list-item'>
                <Link to={`/detail/${id}`}>
                    <div className='left'>
                        <span>{this.computeTag(top,good)}</span>
                        <div className='imgwrap'>
                            <img src={author.avatar_url}/>
                        </div>
                    </div>
                    <div className='right'>
                        <span className='reply-visit'>{`${reply_count}/${visit_count}`}</span>
                        {/* <p className='last-reply'>{last_reply_at}</p> */}
                    </div>
                    <div className='content'>
                        <h3>{title}</h3>
                        <p className='loginname'>{author.loginname}</p>
                        {/* <p>{create_at}</p> */}
                    </div>
                </Link>
            </div>
        );
    }
}

export default PageItem;