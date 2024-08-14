import React from 'react';

function CommentForm({ newComment, handleInputChange, handleAddComment }) {
  return (
    <div className="comment-form">
      <input
        name="name"
        value={newComment.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <textarea
        name="text"
        value={newComment.text}
        onChange={handleInputChange}
        placeholder="Comment"
      />
      <button onClick={handleAddComment}>POST</button>
    </div>
  );
}

export default CommentForm;
