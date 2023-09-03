import React, {useContext} from 'react'
import { Form, Button, Input, Space, Divider, message } from 'antd'
import { LoginFormSubmitValues } from '../../types/domains/Login'
import { requestAuthLogin } from '../../hooks/auth'
import UserContext from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const DomainLogin: React.FC = () => {
    const history = useNavigate()
    const { setIsLoggedIn, setAccessToken, setUser } = useContext(UserContext)
    
    const [formLogin] = Form.useForm()

    const handleSubmitForm = async (values: LoginFormSubmitValues) => {
        try {
            const { username, password } = values
            const data = await requestAuthLogin(username, password)
            setAccessToken(data.data!.accessToken)
            setUser(data)
            setIsLoggedIn(true)
            message.success('Login Sucessful')
            return history('/users/me')
        } catch ( error:any ) {
            setAccessToken('')
            setUser({})
            setIsLoggedIn(false)

            // console.error(error)
            const code = error.code ?? ''
            message.error(`${error.message} ${code ? ` (${code})` : ''}`)
      
        }
    }

    return (
        <Form
            form={formLogin}
            name="formLogin"
            layout="vertical"
            onFinish={handleSubmitForm}
            onReset={() => formLogin.resetFields()}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Plese enter your username'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Plese enter your password'
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Divider />
                <Space>
                    <Button type="primary" htmlType="submit">
                        Sign In
                    </Button>
                    <Button htmlType="reset">
                        Reset Form
                    </Button>
                    <Button onClick={
                        () => (
                            // formLogin.setFieldValue({
                            //     username: 'chao102',
                            //     password: 'password102'
                            // })
                            formLogin.setFieldValue('username', 'user01'),
                            formLogin.setFieldValue('password', 'password')
                        )
                    }>
                        Auto Fill Data
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default DomainLogin