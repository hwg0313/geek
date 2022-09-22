//封装ls存取token

const key = "pc-key"
const setToken = (token) => {
    return window.localStorage.setItem(key, token)
}

const getToken = () => {
    return window.localStorage.getItem(key)
}
const remiveToken = () => {
    return window.localStorage.removeItem(key)
}
export {
    setToken, getToken, remiveToken
}