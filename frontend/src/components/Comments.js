import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from "../services/LocalStorageService"
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const AddComment = ({ sharedDocumentId, sortedDocuments, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  // Check if sortedDocuments is defined before iterating over it
  if (sortedDocuments) {
    sortedDocuments.forEach(doc => {
      console.log('Document Title here:', doc.document.title);
      console.log('Document Content here:', doc.document.content);
      console.log('------------------------'); // Separator for better readability
    });
  }

  const handleCommentSubmit = () => {
    // You might want to add validation for commentText here

    axios.post(
      'http://localhost:8000/auth/comments/', 
      {
        shared_document: sharedDocumentId,
        text: commentText,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then(response => {
        setCommentText('');  // Clear the comment input after successful submission
        // You can update the UI by fetching comments again or updating the state
        onCommentAdded(response.data);
      })
      .catch(error => {
        console.error('Error adding comment:', error);
        // Handle error here, show a message to the user, etc.
      });
  };

  return (
    <div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add your comment..."
        rows="3"
        className="border border-gray-300 p-2 w-full mb-2"
      />
      <button
        onClick={handleCommentSubmit}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;

