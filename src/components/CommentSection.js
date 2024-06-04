import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import "../pages/Posts.css";

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editMode, setEditMode] = useState(null);

    const addComment = () => {
        if (commentText.trim() !== '') {
            const newComment = {
                id: Date.now(),
                text: commentText,
                postId: postId,
                createdAt: new Date().toLocaleString(),
            };
            setComments([...comments, newComment]);
            setCommentText('');
        }
    };

    const deleteComment = (commentId) => {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
    };

    const editComment = (commentId, newText) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, text: newText };
            }
            return comment;
        });
        setComments(updatedComments);
        setEditMode(null);
    };

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleEditChange = (event, commentId) => {
        const newText = event.target.value;
        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, text: newText };
            }
            return comment;
        }));
    };

    return (
        <div className="comments">
            <h6>Коментарі:</h6>
            {comments.map(comment => (
                <div key={comment.id} className="mb-3">
                    {editMode === comment.id ? (
                        <textarea
                            value={comment.text}
                            onChange={(event) => handleEditChange(event,
                                comment.id)}
                            className="form-control mb-2"
                            rows="3"
                        />
                    ) : (
                        <div>
                            <p><strong>{comment.createdAt}</strong></p>
                            <p>{comment.text}</p>
                        </div>
                    )}
                    {editMode === comment.id ? (
                        <button onClick={() => editComment(comment.id, comment.text)}
                                className="btn btn-sm btn-success me-2">Зберегти</button>
                    ) : (
                        <button onClick={() => setEditMode(comment.id)}
                                className="btn btn-sm btn-warning me-2">Редагувати</button>
                    )}
                    <button onClick={() => deleteComment(comment.id)}
                            className="btn btn-sm btn-danger">Видалити</button>
                </div>
            ))}
            <textarea
                value={commentText}
                onChange={handleCommentChange}
                className="form-control mb-2"
                placeholder="Напишіть коментар..."
                rows="3"
            />
            <Button variant="dark" className="post-button" onClick={addComment}>Коментувати</Button>
        </div>
    );
};

export default CommentSection;
