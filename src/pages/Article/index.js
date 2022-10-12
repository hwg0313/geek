import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Card, Popconfirm, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { http } from '@/utils'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import img404 from '@/assets/error.png'
import { history } from '@/utils/history'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    // 获取频道列表
    // const [channels, setChannels] = useState([])
    // useEffect(() => {
    //     async function fetchChannels() {
    //         const res = await http.get('/channels')
    //         setChannels(res.data.channels)
    //     }
    //     fetchChannels()
    // }, [])
    // 文章列表
    // 文章列表数据管理
    const { channelStore } = useStore()
    const [article, setArticleList] = useState({
        list: [],
        count: 0
    })
    // 参数管理
    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    })

    // 发送接口请求
    useEffect(() => {
        async function fetchArticleList() {
            const res = await http.get('/mp/articles', { params })
            const { results, total_count } = res.data
            setArticleList({
                list: results,
                count: total_count
            })
        }
        fetchArticleList()
    }, [params])
    // 筛选按钮
    const onFinish = (values) => {
        console.log(values);
        const { status, channel_id, date } = values
        // 格式化表单数据
        const _params = {}
        // 格式化status
        _params.status = status
        if (channel_id) {
            _params.channel_id = channel_id
        }
        if (date) {
            _params.begin_pubdate = date[0].format('YYYY-MM-DD')
            _params.end_pubdate = date[1].format('YYYY-MM-DD')
        }
        // 修改params参数 触发接口再次发起
        setParams({
            ...params,
            ..._params
        })
        console.log("123213");
    }
    const pageChange = (page) => {
        // 拿到当前页参数 修改params 引起接口更新
        setParams({
            ...params,
            page
        })
    }
    // 删除回调
    const delArticle = async (data) => {
        await http.delete(`/mp/articles/${data.id}`)
        // 更新列表
        setParams({
            page: 1,
            per_page: 10
        })
    }

    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color="green">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (

                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => history.push(`/publish?id=${data.id}`)}
                        />
                        <Popconfirm
                            title="确认删除该条文章吗?"
                            onConfirm={() => delArticle(data)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    return (
        <div>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form onFinish={onFinish}
                    initialValues={{ status: null }}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={null}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            // defaultValue=""
                            style={{ width: 120 }}
                        >{channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}


                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* 文章列表数据 */}
            <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
                <Table
                    dataSource={article.list}
                    columns={columns}
                    pagination={{
                        position: ['bottomCenter'],
                        current: params.page,
                        pageSize: params.per_page,
                        onChange: pageChange
                    }}
                />
            </Card>
        </div>
    )
}

export default observer(Article)