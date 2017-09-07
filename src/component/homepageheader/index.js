import React, { Component } from 'react';
import {Link} from 'react-router'
import './index.css'

class HomepageHeader extends Component {
    render() {
        return (
            <header>
                <div className='header-nav-container'>
                    <ul onClick={this.props.handleClick.bind(this)}>
                        <li><Link to='/home/all'>全部</Link></li>
                        <li><Link to='/home/good'>精华</Link></li>
                        <li><Link to='/home/share'>分享</Link></li>
                        <li><Link to='/home/ask'>问答</Link></li>
                        <li><Link to='/home/job'>招聘</Link></li>
                    </ul>
                </div>
                <div className='header-icon-container' >
                    <Link to='/edit'>
                        <i className="fa fa-pencil fa-1x"></i>
                    </Link>
                    <Link to='/notification'>
                        <i className="fa fa-bell fa-1x"></i>
                        {
                            this.props.messageCount !== 0
                            ?
                            <span className='unreadmessage'>{this.props.messageCount}</span>
                            :
                            ''
                        }       
                    </Link>
                    <Link to='/user'>
                        <i className="fa fa-user fa-1x"></i>
                    </Link>
                </div>
            </header>
        );
    }
}

export default HomepageHeader;