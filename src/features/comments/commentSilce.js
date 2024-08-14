import { createSlice } from '@reduxjs/toolkit';

const loadComments = () => {
  const storedComments = localStorage.getItem('comments');
  return storedComments ? JSON.parse(storedComments) : [];
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: loadComments(),
  reducers: {
    addComment: (state, action) => {
      state.unshift(action.payload);
      localStorage.setItem('comments', JSON.stringify(state));
    },
    addReply: (state, action) => {
      const { parentId, reply } = action.payload;
      const parentComment = state.find(comment => comment.id === parentId);
      if (parentComment) {
        parentComment.replies.unshift(reply);
        localStorage.setItem('comments', JSON.stringify(state));
      }
    },
    editComment: (state, action) => {
      const { id, newText } = action.payload;
      const comment = state.find(c => c.id === id);
      if (comment) {
        comment.text = newText;
      } else {
        for (let c of state) {
          const reply = c.replies.find(r => r.id === id);
          if (reply) {
            reply.text = newText;
            break;
          }
        }
      }
      localStorage.setItem('comments', JSON.stringify(state));
    },
    deleteComment: (state, action) => {
      const id = action.payload;
      const newState = state.filter(c => c.id !== id).map(c => ({
        ...c,
        replies: c.replies.filter(r => r.id !== id)
      }));
      localStorage.setItem('comments', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addComment, addReply, editComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
