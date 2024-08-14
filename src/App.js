import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, addReply, editComment, deleteComment } from './features/comments/commentSilce';
import CommentForm from './components/CommentForm';
import Comment from './components/Comment';
import './App.css';
import ReplyForm from './components/ReplyForm'


function App() {
  const comments = useSelector(state => state.comments);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [replyTo, setReplyTo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  const handleAddComment = () => {
    if (!newComment.name.trim() || !newComment.text.trim()) {
      alert('Please enter both name and comment');
      return;
    }
    const comment = {
      id: Date.now(),
      ...newComment,
      date: new Date().toISOString(),
      replies: []
    };
    dispatch(addComment(comment));
    setNewComment({ name: '', text: '' });
  };

  const handleAddReply = (parentId) => {
    if (!newComment.name.trim() || !newComment.text.trim()) {
      alert('Please enter both name and reply');
      return;
    }
    const reply = {
      id: Date.now(),
      ...newComment,
      date: new Date().toISOString()
    };
    dispatch(addReply({ parentId, reply }));
    setNewComment({ name: '', text: '' });
    setReplyTo(null);
  };

  const handleEditComment = (id, newText) => {
    dispatch(editComment({ id, newText }));
    setEditingId(null);
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };

  const sortedComments = [...comments].sort((a, b) => 
    sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="App">
      <h1>Comments Section</h1>
      <CommentForm
        newComment={newComment}
        handleInputChange={handleInputChange}
        handleAddComment={handleAddComment}
      />
      <div className="sort-controls">
        <span>Sort By: Date and Time </span>
        <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      {sortedComments.map(comment => (
        <React.Fragment key={comment.id}>
          <Comment
            comment={comment}
            onReply={setReplyTo}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
            onStartEditing={setEditingId}
            editingId={editingId}
            newComment={newComment}
            handleInputChange={handleInputChange}
          />
          {replyTo === comment.id && (
            <ReplyForm
              replyTo={replyTo}
              newComment={newComment}
              handleInputChange={handleInputChange}
              handleAddReply={handleAddReply}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
