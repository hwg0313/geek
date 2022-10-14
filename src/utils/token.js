//封装ls存取token

const key = "pc-key"
//储存token
const setToken = (token) => {
    return window.localStorage.setItem(key, token)
}
//获取token
const getToken = () => {
    return window.localStorage.getItem(key)
}
//删除token
const remiveToken = () => {
    return window.localStorage.removeItem(key)
}
//全部导出
export {
    setToken, getToken, remiveToken
}