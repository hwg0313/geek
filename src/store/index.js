//统一处理，导出统一方法
import LoginStore from "./login.Store";
import React from "react";

class RootStroe {

    constructor() {
        this.loginStore = new LoginStore()
    }
}

const rootStroe = new RootStroe()
const context = React.createContext(rootStroe)
const useStore = () => React.useContext(context)
export { useStore }