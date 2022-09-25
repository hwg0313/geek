// 导入路由
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@/App.css'

// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Publish from './pages/Publish'
import Home from './pages/Home'
import Article from '@/pages/Article'
import { AuthComponents } from "@/components/AuthComponents";
// 配置路由规则
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 需要鉴权的路由 */}
          <Route path="/" element={
            <AuthComponents>
              <Layout />
            </AuthComponents>
          } >
            <Route path="/" element={<Home />} />
            <Route path="/article" element={<Article />} />
            <Route path="/publish" element={<Publish />} />
          </Route>
          {/* 不需要鉴权的路由 */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App