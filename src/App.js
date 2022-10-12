// 导入路由
import { Route, Routes } from 'react-router-dom'
import { AuthComponents } from "@/components/AuthComponents";
import { HistoryRouter, history } from './utils/history'
import '@/App.css'
// 导入必要组件//路由懒加载
import { lazy, Suspense } from 'react'
// // 导入页面组件
// import Login from '@/pages/Login'
// import Layout from '@/pages/Layout'
// import Publish from './pages/Publish'
// import Home from './pages/Home'
// import Article from '@/pages/Article'

// 按需导入路由组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))
// 配置路由规则
function App() {
  return (
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      >
        {/* <BrowserRouter> */}
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
        {/* </BrowserRouter> */}
      </Suspense>
    </HistoryRouter >

  )
}

export default App