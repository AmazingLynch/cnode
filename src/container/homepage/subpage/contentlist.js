import React, { Component } from 'react';
import {getDataWithTab} from '../../../fetch'
import PageList from '../../../component/pagelist/index'
import LoadMore from '../../../component/loadmore'

class ContentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success: false,
            data:[],
            page: 1,
            tab: '',
            isLoadingMore: true
        }
    }
    componentWillMount(){
        this.setState({
            tab:this.props.currentTab
        })
    }
    componentDidMount(){
        var option = {
            page: this.state.page,
            tab: this.props.currentTab,
            limit:12,
            mdrender: false
        }
        this.loadData(option)
        this.setState({
            isLoadingMore: false
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            tab: nextProps.currentTab,
            page:1,
            data:[]
        })
        var option = {
            page: this.state.page,
            tab: nextProps.currentTab,
            limit:12,
            mdrender: false
        }
        this.loadData(option)
    }
/*     //这里还有点问题，如果加入这个函数的话，第一次加载不出来
    shouldComponentUpdate(nextProps) {
        return this.props.currentTab !== nextProps.currentTab
        
    }
     */
    loadData(option) {
        var result = getDataWithTab(option)
        result.then(res => res.json())
              .then(json => {
                  this.setState({
                    data:json.data
                  })
              })
              .catch(err => {
                  console.log(`发生错误${err}`)
              })
    }
 
    loadMoreData(){
        this.setState({
            isLoadingMore: true
        })
        let currentPage = this.state.page
        var option = {
            page: currentPage + 1,
            tab: this.state.tab,
            limit:9,
            mdrender: false
        }

        getDataWithTab(option)
            .then( res => res.json())
            .then( json => {
                this.setState({
                    data: this.state.data.concat(json.data)
                })
            })
            .catch( err => {
                console.log(err)
            })
        this.setState({
            isLoadingMore: false,
            page: currentPage + 1
        })
    } 
    
    render() {
        return (
            <div>
                <PageList data={this.state.data}></PageList>
                <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}></LoadMore>
            </div>
        );
    }
}

export default ContentList;