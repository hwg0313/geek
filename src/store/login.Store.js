import { makeAutoObservable } from "mobx";
import { http, setToken, getToken, } from "@/utils";
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
}
export default LoginStore