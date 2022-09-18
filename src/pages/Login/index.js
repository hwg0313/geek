import { Card, Button, Checkbox, Form, Input, message, } from 'antd'
import logo from '@/assets/logo.png'
import { useNavigate, } from 'react-router-dom';
import './index.scss'
import { useStore } from '@/store'

const Login = () => {
    const { loginStore } = useStore()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        await loginStore.getToken({
            mobile: values.username,
            code: values.password
        })
        navigate('/', { replace: true })
        message.success('登录成功');
        console.log('Success:', values);

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form validateTrigger={['onBlur', 'onChange']} onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        name="username"
                        rules={[{
                            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                            message: '请输入正确的手机号!',
                            validateTrigger: 'onBlur'
                        }, { required: true, message: '请输入手机号!' }]}>
                        <Input size="large" placeholder="请输入手机号" maxLength="11" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }, { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },]}
                    >
                        <Input size="large" placeholder="请输入验证码" maxLength="6" />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox className="login-checkbox-label">
                            我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>

                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login