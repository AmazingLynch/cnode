import React, { Component } from 'react';
import PageItem from './item'
class PageList extends Component {
    render() {
        var data = this.props.data
        var list = data
        ?
        this.props.data.map((item,index) => (
            <PageItem data={item} key={index}></PageItem>
        ))
        :
        <div>没有加载到任何内容</div>
        return (
            <div>
                {
                    list
                }
            </div>
        );
    }
}

export default PageList;