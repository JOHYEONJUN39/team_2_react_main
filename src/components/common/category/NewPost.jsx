import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Eye } from 'react-bootstrap-icons';
import { Col, Container, Row } from 'react-bootstrap';
import '../../../styles/NewPost.css'


const NewPost = (props) => {
    return (
        <Container className='post-box'>
        <Link to={`/board/${props.category}/${props.post_id}`} className='link-style'>
            <Row className='title mb-2' ><Col>{props.title}</Col></Row>
            <Row className='content mb-4'><Col>{props.content}</Col></Row>
            <Row><Col>작성자 : {props.name}</Col></Row>
            <Row><Col>작성일 : {props.created_at}</Col></Row>
            <Row>
                <Col className=''>{props.category}</Col>
                <Col/>
                <Col>
                    <div><Eye className='me-2' /><span>{props.views} views</span></div>
                </Col>
            </Row>
        </Link>
        </Container>
    )
}

export default NewPost;