import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom' 
import { message } from 'antd'
// import * as jwt from 'jsonwebtoken'

import { AccessTokenDecoded } from '../../types/components/PrivateRoute'
import { getCurrentTimestamp } from '../../utils/date'
import UserContext from '../../contexts/UserContext'
import {requestRefreshToken} from '../../hooks/auth'

const b64DecodeUnicode = (str: string) =>
  decodeURIComponent(
    Array.prototype.map.call(atob(str), c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''))

const parseJwt = (token: string) =>
  JSON.parse(
    b64DecodeUnicode(
      token.split('.')[1].replace('-', '+').replace('_', '/')
    )
  )

const getExpFromToken = (token: string): number => {
    try {
        // const { exp }: AccessTokenDecoded = Object(jwt.decode(token))
        const { exp }: AccessTokenDecoded = Object(parseJwt(token))

        console.log("exp : " + exp);
        

        return +exp // + is for parse string to number
    } catch( error ) {
        return -1
    }
}


const PrivateRoute = () => {
    // const auth = null; // determine if authorized, from context or however you're doing it

    const {
        isLoggedIn,
        accessToken,
        setIsLoggedIn,
        setAccessToken,
        setUser
    } = useContext(UserContext)
    const history = useNavigate()

    const accessTokenExp = getExpFromToken(accessToken)
    const currentTimestamp = getCurrentTimestamp()

    const toDoRefreshToken = async () => {
        try {
            const data = await requestRefreshToken(accessToken)
            setAccessToken(data.data!.accessToken)
            setIsLoggedIn(true)
            setUser(data)
        } catch( error ) {
            setAccessToken('')
            setIsLoggedIn(true)
            setUser({})
            message.error('Unauthorized')
            history('/login')
        }
        
    }

    useEffect(() => {
        if (currentTimestamp > accessTokenExp) {
            message.error('Session has expired')
            setAccessToken('')
            setUser({})
            setIsLoggedIn(false)
            return
        }

        const needToRefreshToken = ((accessTokenExp - currentTimestamp) < 40)
        console.log('needToRefreshToken => ', needToRefreshToken);
        console.log('accessTokenExp => ', accessTokenExp);
        console.log('currentTimestamp => ', currentTimestamp);
        
        if( needToRefreshToken ) {
            // console.log('needToRefreshToken now');
            
            toDoRefreshToken()
        }
    })

    return isLoggedIn ? <Outlet/> : <Navigate to="/login" />;
}

export default PrivateRoute

