import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useRef, useState, useEffect } from 'react'
import { http } from '@/utils'
const { Option } = Select

const Publish = () => {
    const navigate = useNavigate()
    //编辑功能
    const [params] = useSearchParams()
    const articleId = params.get('id')
    //获取from的dom
    const form = useRef(null)
    useEffect(() => {
        async function getArticle() {
            const res = await http.get(`/mp/articles/${articleId}`)
            console.log(res);
            const { cover, ...formValue } = res.data
            // 动态设置表单数据
            form.current.setFieldsValue({ ...formValue, type: cover.type })
            const imageList = cover.images.map(url => ({ url }))
            setFileList(imageList)
            setImgCount(cover.type)
            cacheImgList.current = imageList
        }
        if (articleId) {
            // 拉取数据回显
            getArticle()
        }
    }, [articleId])

    //使用useRef声明一个暂存仓库
    const cacheImgList = useRef()
    // 频道数据获取
    const { channelStore } = useStore()
    //发布文章
    const onFinish = async (e) => {
        console.log(e);
        const { channel_id, content, title, type } = e
        const params = {
            channel_id, content, title, type,
            cover: {
                type: type,
                images: fileList.map(item => item.url)
            }
        }

        if (articleId) {
            // 编辑
            await http.put(`/mp/articles/${articleId}?draft=false`, params)
        } else {
            // 新增
            await http.post('/mp/articles?draft=false', params)
        }
        navigate('/article')
        message.success(articleId ? "更新文章" : "发布成功")
    }
    // 图像数组
    const [fileList, setFileList] = useState([])
    // 上传成功回调
    const onUploadChange = ({ fileList }) => {
        const formatList = fileList.map(file => {
            if (file.response) {
                return { url: file.response.data.url }
            } else {
                return file
            }
        })

        setFileList(formatList)
        //图片存入暂存仓库
        cacheImgList.current = formatList
    }
    // 图像数量
    const [imgCount, setImgCount] = useState(1)
    // 切换图片
    const radioChange = (e) => {
        const count = e.target.value
        setImgCount(count)
        if (count === 1) {
            const img = cacheImgList.current ? cacheImgList.current[0] : []
            setFileList([img])
        } else if (count === 3) {
            setFileList(cacheImgList.current)
        }
    }
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item key="/">
                            <Link to={"/"}>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{articleId ? "编辑" : "发布"}文章</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1, content: "请输入文章内容" }}
                    ref={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={radioChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imgCount > 0 && (
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList
                                action="http://geek.itheima.net/v1_0/upload"
                                onChange={onUploadChange}
                                fileList={fileList}
                                maxCount={imgCount}
                                multiple={imgCount}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                {articleId ? "更新" : "发布"}文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default observer(Publish)