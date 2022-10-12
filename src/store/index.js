//统一处理，导出统一方法
import LoginStore from "./login.Store";
import UserStore from "./user.Store";
import ChannelStore from "./channel.Store";
import React from "react";
//本质上就是全局数据
class RootStroe {

    constructor() {
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.channelStore = new ChannelStore()
    }
}

const rootStroe = new RootStroe()
const context = React.createContext(rootStroe)
const useStore = () => React.useContext(context)
export { useStore }