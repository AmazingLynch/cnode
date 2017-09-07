import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomepageHeader from '../../component/homepageheader'
import ContentList from './subpage/contentlist'
import { getMessageCount } from '../../fetch'

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            tab:'all',
            messageCount: 0
        }
    }
    componentWillMount() {
        if(!this.props.userinfo.accessToken) {

        } else {
            getMessageCount(this.props.userinfo.accessToken)
                .then( res => res.json())
                .then( json => {
                    if(json.success) {
                        this.setState({
                            messageCount: json.data
                        })
                    }
                })
                .catch( err => {
                    console.log('获取未读消息失败')
                })
        }
    }
    handleClick(event){
        if(event.target.href){//点击的是a标签
            var tab = event.target.href.split('#')[1].split('/')[2]
            this.setState({
                tab:tab
            })
        }
    }
    render() {
        return (
            <div>
                <HomepageHeader messageCount={this.state.messageCount} handleClick={this.handleClick.bind(this)}/>
                <ContentList currentTab={this.state.tab}/>
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
)(HomePage)