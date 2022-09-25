import { makeAutoObservable } from "mobx"
import { http } from '@/utils/http'
import { useState } from "react"
class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }
    getUasrInfo = async () => {
        const res = await http.get('/user/profile')
        console.log(res);
        this.userInfo = res.data
    }
}

export default UserStore