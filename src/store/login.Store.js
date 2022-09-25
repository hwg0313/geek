import { makeAutoObservable } from "mobx";
import { http, setToken, getToken, remiveToken } from "@/utils";
class LoginStore {
    token = getToken() || ""
    constructor() {
        //响应式
        makeAutoObservable(this)
    }
    getToken = async ({ mobile, code }) => {
        const res = await http.post('/authorizations', {
            mobile,
            code
        })
        console.log(res);
        this.token = res.data.token
        setToken(this.token)

    }
    loginOut = () => {
        this.token = ''
        remiveToken()
    }
}
export default LoginStore