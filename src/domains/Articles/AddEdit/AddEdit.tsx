import { Row, Col, Typography, Button, Divider, Form, Input, message } from 'antd'
import { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UserContext from '../../../contexts/UserContext'
import { Article, requestUpdateArticleById, requestCreateArticle, requestArticleById } from '../../../hooks/article'
const { Title } = Typography
const { TextArea } = Input

interface DomainArticlesAddEditParams {
    id?: string
}

const DomainArticlesAddEdit = () => {
    const history = useNavigate()
    const { id }: DomainArticlesAddEditParams = useParams()
    const { accessToken } = useContext(UserContext)
    const [ formCreateEdit ] = Form.useForm()

    const handleFormSubmit =async (doc: Article) => {
        // console.log("doc => ", doc);
        if( id ) {
            await requestUpdateArticleById(id, doc, accessToken)
            message.success('The article has been updated')
            return history(`/articles`)
        } else {
            const data = await requestCreateArticle(doc, accessToken)
            message.success('The article has been created')
            return history(`/articles/add-edit/${data._id}`)
        }
    }

    const getArticleById =async (id: string) => {
        const data = await requestArticleById(id, accessToken)
        // formCreateEdit.setFieldValue({
        //     ...data
        // })
        formCreateEdit.setFieldValue("title", data.title)
        formCreateEdit.setFieldValue("description", data.description)
    }

    useEffect(() => {
        if( id ) {
            getArticleById(id)
        }
    }, [id])

    return (
        <>
            <Row justify='space-between' align='middle'>
                <Col span={18}>
                    <Title level={1} className="no-margin">{id ? 'Edit' : 'Create'} Article</Title>
                </Col>
                <Col span={6} className="text-right">
                    <Button type="primary">
                        <Link to="/articles">Back</Link>
                    </Button>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={24}>
                    <Form
                        form={formCreateEdit}
                        name="formCreateEdit"
                        onFinish={handleFormSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter article title'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter article description'
                                }
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item>
                            <Divider />
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default DomainArticlesAddEdit