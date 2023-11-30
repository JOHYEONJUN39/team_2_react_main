import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Card, Form, Dropdown, Modal } from 'react-bootstrap';
import '../styles/Comment.css'

const Comment = ({ comment, postId, user, created_at, onCommentChange }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.text);
    const [showModal, setShowModal] = useState(false);
    const textareaRef = useRef(null);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleDelete = async () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3300/comments/${comment.id}`);
            await onCommentChange();
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!editedComment.trim()) {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

        try {
            await axios.put(`http://localhost:3300/comments/${comment.id}`, { 
                postId,
                text: editedComment,
                userId: user.userId,
                created_at,
            });
            setIsEdit(false);
            onCommentChange();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsEdit(false);
        setEditedComment(comment.text);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // 엔터키를 눌렀을 때 (Shift 키를 누르지 않았을 경우)
            e.preventDefault(); // 개행 방지
            handleSave(e); 
        }
    };

    useEffect(() => {
        // textarea 의 높이를 조정
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [editedComment]);

    return (
        <Card className='rounded-0'>
            <Card.Body>
                {isEdit ? (
                    <Form.Group className='comment-edit-container' onCommit={handleSave}>
                        <Form.Control
                            as='textarea'
                            rows={editedComment.split('\n').length || 1}
                            ref={textareaRef}
                            value={editedComment}
                            onChange={e => {setEditedComment(e.target.value);}}
                            onKeyDown={handleKeyDown} />
                        <Button variant='success' onClick={handleSave}>저장</Button>
                        <Button variant='secondary' onClick={handleCancel}>취소</Button>
                    </Form.Group>
                ) : (
                    <div className='comment-container'>
                        <Card.Title>{comment.userId}</Card.Title>
                        <Card.Text>{comment.text}</Card.Text>
                        <Card.Text>{comment.created_at  }</Card.Text>
                        {user.userId === comment.userId ? (
                            <Dropdown>
                            <Dropdown.Toggle variant='primary' id='dropdown-basic'>더보기</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleEdit}>수정</Dropdown.Item>
                                <Dropdown.Item onClick={handleDelete}>삭제</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                        ) : ''}
                        
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>삭제 확인</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
                            <Modal.Footer>
                                <Button variant='secondary' onClick={() => setShowModal(false)}>취소</Button>
                                <Button variant='danger' onClick={handleConfirmDelete}>삭제</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Comment;