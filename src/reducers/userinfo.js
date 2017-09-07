import { getItemFromLocalStorage } from '../util/localstorage'

const initialState = {
    loginname: getItemFromLocalStorage('loginname') ? getItemFromLocalStorage('loginname') : '',
    avatarUrl: getItemFromLocalStorage('avatarUrl') ? getItemFromLocalStorage('avatarUrl') : '',
    accessToken: getItemFromLocalStorage('accessToken') ? getItemFromLocalStorage('accessToken') : '',
    id: getItemFromLocalStorage('id') ? getItemFromLocalStorage('id') : ''
}

export default function userinfo(state = initialState , action){
    switch (action.type){
        case "LOGIN":
            return Object.assign({},state,action.data)
        case "LOGOUT":
            return ''
        default:
            return state
    }
}