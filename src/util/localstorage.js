//向localStorage里写数据
export function setItemToLocalStorage(key,value) {
    localStorage.setItem(key,value)
}
//从localStorage里读数据
export function getItemFromLocalStorage(key) {
    return localStorage.getItem(key) ? localStorage.getItem(key): undefined
}