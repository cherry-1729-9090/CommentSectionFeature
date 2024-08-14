import React from 'react';
import '../App.css'

function Comment({ comment, onReply, onEdit, onDelete, onStartEditing, editingId }) {
  return (
    <div className="comment">
      <div className="comment-header">
        <span>{comment.name}</span>
        <span>{new Date(comment.date).toLocaleString()}</span>
      </div>
      {editingId === comment.id ? (
        <input
          value={comment.text}
          onChange={(e) => onEdit(comment.id, e.target.value)}
          onBlur={() => onStartEditing(null)}
        />
      ) : (
        <p>{comment.text}</p>
      )}
      <div className="comment-actions">
        <button onClick={() => onReply(comment.id)}>Reply</button>
        <button onClick={() => onStartEditing(comment.id)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(comment.id)}>🗑️</button>
      </div>
      {comment.replies.map(reply => (
        <div key={reply.id} className="reply">
          <div className="comment-header">
            <span>{reply.name}</span>
            <span>{new Date(reply.date).toLocaleString()}</span>
          </div>
          {editingId === reply.id ? (
            <input
              value={reply.text}
              onChange={(e) => onEdit(reply.id, e.target.value)}
              onBlur={() => onStartEditing(null)}
            />
          ) : (
            <p>{reply.text}</p>
          )}
          <div className="comment-actions">
            <button onClick={() => onStartEditing(reply.id)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(reply.id)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
