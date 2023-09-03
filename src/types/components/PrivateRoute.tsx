export interface AccessTokenDecoded {
    aud: string
    exp: string
    iat: number
}

export interface PrivateRouteProps {
    element: any
    path: string
}