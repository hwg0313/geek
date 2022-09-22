//1.判断token是否存在
//2.存在直接登录
//3.不存在 重新定向到登录路由

//高级组件:把一个组件当初另外一个主角的参数传入
//然后通过一定的判断 返回一个新的组件
import { getToken } from "@/utils/token";
import { Navigate } from "react-router-dom";

function AuthComponents({ children }) {
    const isToken = getToken()
    if (isToken) {
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace />
    }
}
export {
    AuthComponents
}