import { makeAutoObservable } from "mobx";
import { http } from "@/utils";
class LoginStore {
    token = ""
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

    }
}
export default LoginStore