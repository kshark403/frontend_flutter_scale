import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Typography, Button, Divider } from 'antd'
import { Link } from 'react-router-dom'
import UserContext from '../../../contexts/UserContext'
import ArticleContext from '../../../contexts/ArticleContext'
import { Article, requestArticles } from '../../../hooks/article'
import ArticleList from '../../../components/ArticleList'

// const DomainArticlesList: React.FC = () => <>Domain List</>

const { Title } = Typography

const DomainArticlesList = () => {
    const { accessToken } = useContext(UserContext)
    const { needLoadArticles, setNeedLoadArticles } = useContext(ArticleContext)
    const [ articles, setArticles ] = useState<Article[]>([])

    const getArticles = async () => {
        const data = await requestArticles({}, accessToken)

        setArticles(data)
    }

    useEffect(() => {
        getArticles()
    }, [])

    useEffect(() => {
        if( needLoadArticles ) {
            getArticles()
            setNeedLoadArticles(false)
        }
    }, [needLoadArticles])

    return (
        <>
            <Row justify='space-between' align='middle'>
                <Col span={18}>
                    <Title level={1} className="no-margin">Articles</Title>
                </Col>
                <Col span={6} className="text-right">
                    <Button type="primary">
                        <Link to="/articles/add-edit">Create new</Link>
                    </Button>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={24}>
                    <ArticleList articles={articles} />
                </Col>
            </Row>
        </>
    )
}

export default DomainArticlesList