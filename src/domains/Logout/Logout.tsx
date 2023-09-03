import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const Logout: React.FC = () => {
    const {
        setIsLoggedIn,
        setAccessToken,
        setUser
    } = useContext(UserContext)
    const history = useNavigate()

    useEffect(() => {
        setAccessToken('')
        setIsLoggedIn(false)
        setUser({})

        return history('/')
    })

    return <>Logout...</>
}

export default Logout