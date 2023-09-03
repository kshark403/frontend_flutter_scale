import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Space, Divider } from 'antd'
import { If, Else, Then} from 'react-if'

import UserContext from '../../contexts/UserContext'

const Navbar: React.FC = () => {
    const { isLoggedIn } = useContext(UserContext)

    return (
        <Space split={<Divider type="vertical" />}>
            <Link to="/" >Homepage</Link>
            <Link to="/about" >About</Link>

            <If condition={isLoggedIn}>
                <Then>
                    <Space split={<Divider type="vertical" />}>
                        <Link to="/articles" >Articles</Link>
                        <Link to="/users/me" >Me</Link>
                        <Link to="/logout" >Logout</Link>
                    </Space>
                </Then>
                <Else>
                    <Then>
                        <Link to="/login" >Login</Link>
                    </Then>
                </Else>
            </If>
            
        </Space>
    )
}

export default Navbar