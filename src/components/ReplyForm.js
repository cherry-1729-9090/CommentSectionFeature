import React from 'react';

function ReplyForm({ replyTo, newComment, handleInputChange, handleAddReply }) {
  return (
    <div className="reply-form">
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
        placeholder="Reply"
      />
      <button onClick={() => handleAddReply(replyTo)}>POST</button>
    </div>
  );
}

export default ReplyForm;
