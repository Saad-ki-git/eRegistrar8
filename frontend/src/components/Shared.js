import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from "../services/LocalStorageService"
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import AddComment from './Comments';

const Shared = ({ openInEditor }) => {
  const [fetchedDocuments, setFetchedDocuments] = useState([]);
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(null);
  const [documentComments, setDocumentComments] = useState({});

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        'recipient_email': data.email,
      }));

      axios.get('http://localhost:8000/auth/shared-documents/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then(response => {
          const documents = response.data;
          const sortedDocuments = documents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

          setFetchedDocuments(sortedDocuments);
          setFetchError(null);
        })
        .catch(function (error) {
          setFetchError('Error fetching shared documents');
          console.error('Fetch error:', error);
        });
    }
  }, [data, isSuccess, access_token, dispatch]);

  const handleCommentSubmit = (documentId) => {
    const userEmail = data ? data.email : '';

    const documentData = fetchedDocuments.find(doc => doc.document.id === documentId);
    const commentText = documentComments[documentId] || '';

    axios.post(
      'http://localhost:8000/auth/comments/',
      {
        text: commentText,
        shared_document: [{ title: documentData.document.title }],
        user: userEmail,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then(response => {
        setDocumentComments(prevComments => ({
          ...prevComments,
          [documentId]: '', // Clear the commentText for the submitted document
        }));
        // Uncomment the next line if 'onCommentAdded' is defined
        // onCommentAdded(response.data);
      })
      .catch(error => {
        console.error('Error adding comment:', error);
        // Handle error here, show a message to the user, etc.
      });
  };


  return (
    <div>
      <div className="flex items-center justify-center mt-10 mb-10 ">
        <h2 className="text-5xl font-bold text-green-600">Shared Documents</h2>
      </div>
      {fetchError && (
        <div className="text-red-600 font-bold mb-4">
          {fetchError}
        </div>
      )}
      {fetchedDocuments.length === 0 ? (
        <p className="text-xl font-bold text-green-600 mb-20">No shared documents available.</p>
      ) : (
        <ul>
          {fetchedDocuments.map((document, index) => (
            <li key={`${index}_${document.sender_id || 'defaultSenderID'}`}>
              <p className='text-xl mt-5 font-bold text-green-600'>Sender: {document.sender_id}</p>
              {document.document && (
                <>
                  <p className='text-xl font-bold text-green-600'>Document Title: {document.document.title}</p>
                  <p className='text-xl font-bold text-green-600'>Document ID: {document.document.docId}</p>
                  {document.created_at && (
                    <p className='text-xl font-bold text-green-600'>
                      shared at: {new Date(document.created_at).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}
                    </p>
                  )}

                  <button className='bg-green-600 text-white p-2 mt-2 rounded-md' onClick={() => openInEditor(document.document)}>
                    Open in Editor
                  </button>
                  <div>
                    <textarea
                      value={documentComments[document.document.id] || ''}
                      onChange={(e) => setDocumentComments(prevComments => ({
                        ...prevComments,
                        [document.document.id]: e.target.value,
                      }))}
                      placeholder="Add your comment..."
                      rows="3"
                      className="border border-gray-300 p-2 w-full mb-2"
                    />

                    <button
                      onClick={() => handleCommentSubmit(document.document.id)}
                      className="bg-blue-500 text-white p-2 rounded-md"
                    >
                      Add Comment
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Shared;
