/**
 * 
 * @param {*} options 
 * options是一个配置对象
 * page:(Number)页数
 * tab:(String)主题分类
 * limit:(Number)每一页的主题数量
 * mdrender：(string),是否渲染出所有markdown，默认为'true'
 */

//将配置对象转化成字符串的形式
function formatOptions(options) {
    var optionsStr = ''
    for(var i in options) {
        optionsStr = `${optionsStr}&${i}=${options[i]}`
    }
    return optionsStr.slice(1)
}

//根据给定设置，获取相关的帖子信息
export function getDataWithTab(options) {
    if(options){
        var optionsStr = formatOptions(options)
        var url = `/api/v1/topics?${optionsStr}`
        var result = fetch(url,{
            method: 'GET'
        })
        return result
    }
    return 
}  

//根据access-token验证登录信息
export function postAccessToken(accessToken) {
    if(accessToken){
        var url = 'https://cnodejs.org/api/v1/accesstoken'
        var option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `accesstoken=${accessToken}`
        }
        var result = fetch(url,option)
        return result
    }
    return 
}

//根据用户登录名查看其收藏的帖子
export function getUserCollection(loginName) {
    if(loginName){
        var url = 'https://cnodejs.org/api/v1/topic_collect/'
        var result = fetch('https://cnodejs.org/api/v1/topic_collect/AmazingLynch',{
            method: 'GET'
        })
        return result
    }
    return 
}

//根据帖子id获取帖子内容
export function getContentById(id,accessToken) {
    if(id){
        var url = `https://cnodejs.org/api/v1/topic/${id}?accesstoken=${accessToken}`;
        var result = fetch(url,{
            method: 'GET'
        })
        return result
    }
    return
}
//收藏主题
export function postCollect(accessToken,tipicId) {
    var url = 'https://cnodejs.org/api/v1/topic_collect/collect'
    var para = {
        accesstoken: accessToken,
        topic_id: tipicId
    }
    var option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formatOptions(para)
    }
    var result = fetch(url,option)
    return result
}

//取消收藏
export function postDecollect(accessToken,topicId) {
    var url = 'https://cnodejs.org/api/v1/topic_collect/de_collect'
    var para = {
        accesstoken: accessToken,
        topic_id: topicId
    }
    var option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formatOptions(para)
    }
    var result = fetch(url,option)
    return result
}

//给评论点赞
export function postUpReply(replyId,accessToken) {
    var url = 'https://cnodejs.org/api/v1/reply/' + replyId + '/ups'
    var option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `accesstoken=${accessToken}`
    }
    var result = fetch(url,option)
    return result
}

//新建评论
//如果这个评论是对另一个评论的回复，带上replyId字段
export function postCreateReply(topicId,accessToken,replyId,content) {
    var url = 'https://cnodejs.org/api/v1/topic/' + topicId + '/replies'
    var para = {
        accesstoken: accessToken,
        content:content,
        reply_id: replyId
    }
    var option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formatOptions(para)
    }
    var result = fetch(url,option)
    return result
}

//新建主题
export function postCreateTopic(accessToken,title,tab,content) {
    var url = 'https://cnodejs.org/api/v1/topics'
    var para = {
        accesstoken: accessToken,
        title: title,
        tab: tab,
        content: content
    }
    var option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formatOptions(para)
    }
    var result = fetch(url,option)
    return result
}

//获取未读消息数数目
export function getMessageCount(accessToken) {
    var url = `https://cnodejs.org/api/v1/message/count?accesstoken=${accessToken}`
    var option = {
        method: 'GET'
    }
    var result = fetch(url,option)
    return result
}

//获取已读和未读的消息
export function getMessage(accessToken) {
    var url = `https://cnodejs.org/api/v1/messages?accesstoken=${accessToken}`
    var option = {
        method: 'GET'
    }
    var result = fetch(url,option)
    return result
}



//标记全部已读

export  function postMarkAll(accessToken) {
    var url = 'https://cnodejs.org/api/v1/message/mark_all'
    var option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `accesstoken=${accessToken}`
    }
    var result = fetch(url,option)
    return result
}


//标记当个消息为已读
export function postMarkOneMessage(accessToken,messageId) {
    var url = `https://cnodejs.org/api/v1/message/mark_one/${messageId}`
    var option = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `accesstoken=${accessToken}`
    }
    var result = fetch(url,option)
    return result
}