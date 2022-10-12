import { http } from "@/utils"
import { makeAutoObservable } from "mobx"
// 频道数据全局
class ChannelStore {
    channelList = []
    constructor() {
        makeAutoObservable(this)
    }
    loadChannelList = async () => {
        const res = await http.get('/channels')
        this.channelList = res.data.channels
    }

}

export default ChannelStore