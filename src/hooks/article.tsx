import axios from "axios";

const url_article = 'http://localhost:4000'

export interface Article {
    _id: string
    title: string
    description: string
    author: string
    status: string
}
const handleResponseError = (error: any) => {
    if (error?.response?.data?.error) {
        throw error.response.data.error
    }
    throw error
}

export const requestCreateArticle =async (doc: Article, accessToken:  string): Promise<Article> => {
    const data: Article = await axios
    .post(`${url_article}/articles/`, doc, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(response => response.data)
    .catch(error => handleResponseError(error))

    return data
}

export const requestArticles = async (considions: object = {}, accessToken: string): Promise<Article[]> => {
    const data: Article[] = await axios
        .get(`${url_article}/articles`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.data)
        .catch(error => handleResponseError(error))
    
    return data
}

export const requestArticleById = async (id: string, accessToken: string): Promise<Article> => {
    const data: Article = await axios
        .get(`${url_article}/articles/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.data)
        .catch(error => handleResponseError(error))
    
    return data
}

export  const requestUpdateArticleById = async (id: string, doc: Article, accessToken: string): Promise<boolean> => {
    await axios
        .patch(`${url_article}/articles/${id}`, doc, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.data)
        .catch(error => handleResponseError(error))
    
    return true
}

export const requestDeleteArticleById =async (id: string, accessToken: string): Promise<boolean> => {
    await axios
        .delete(`${url_article}/articles/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.data)
        .catch(error => handleResponseError(error))
    
    return true
}