import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { getToken, removeToken } from "../services/LocalStorageService"
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import Pending from "../components/Pending";
import { setDocId } from "../actions/actions";
import { useDispatch } from "react-redux";
import Shared from "../components/Shared";

const CombineEditor = () => {
  const [title, setTitle] = useState("")
  const [editorContent, setEditorContent] = useState("");
  const [showTextEditor, setShowTextEditor] = useState(false);
  const { access_token } = getToken()
  const { data } = useGetLoggedUserQuery(access_token)
  const [pendingDocuments, setPendingDocuments] = useState([]);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [sharedId, setSharedID] = useState(null)
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const dropdownRef = useRef(null);


  useEffect(() => {
    setIsSearchButtonDisabled(searchQuery.trim() === "");
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/auth/search/?search=${searchQuery}`
      );
      setSearchResults(response.data.results);
      setSelectedId(response.data.results || [])
      setShowDropdown(true);
      if (response.data.results && response.data.results.length > 0) {
        setSharedID(response.data.results[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropdownClick = (id) => {
    const selectedResult = searchResults.find(result => result.id === id);
    setSelectedEmail(selectedResult.email); // Set the selected email
    setSelectedId(id);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const handleShareDocument = async (docId) => {
    console.log("The document ID: ", docId);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/shared-documents/",
        {
          sender_id: data.id, // Replace with the actual sender ID
          recipient_id: selectedId,// Use the selected email as recipient
          document: docId, // Use the passed docId here
        }
      );
      console.log("Document shared successfully", response.data);
      // Add any additional logic after sharing the document
    } catch (error) {
      console.error("Error sharing document", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };


  const handleSave = () => {
    try {
      axios
        .post("http://localhost:8000/auth/document/", {
          title: title,
          content: editorContent,
          user: data.id, // sending the userID
        })
        .then((response) => {
          const docId = response.data.docId;
          console.log("Document saved successfully with ID:", docId);
          alert("Document saved successfully");
          dispatch(setDocId(docId));
          console.log("The setDocId is: ", setDocId(docId));

          // Check if handleShareDocument is a function and not empty
          if (handleShareDocument && typeof handleShareDocument === 'function') {
            // Call handleShareDocument and pass the docId
            handleShareDocument(docId);
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Error saving document");
        });
    } catch (error) {
      console.error(error);
    }
  };



  const handlePending = () => {
    if (title && editorContent) {
      const existingDocumentIndex = pendingDocuments.findIndex(document => document.title === title);

      if (existingDocumentIndex !== -1) {
        // Update existing document
        const updatedDocuments = [...pendingDocuments];
        updatedDocuments[existingDocumentIndex] = {
          title: title,
          content: editorContent,
        };
        setPendingDocuments(updatedDocuments);
      } else {
        // Add new document to pendingDocuments
        const newDocument = {
          title: title,
          content: editorContent,
        };
        setPendingDocuments([...pendingDocuments, newDocument]);
      }

      setTitle("");
      setEditorContent("");
    } else {
      alert("Title and content cannot be empty.");
    }
  };


  const handleDocumentClick = (document) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTitle(document.title);
    setEditorContent(document.content);
  };

  const openSharedDocumentInEditor = (document) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setTitle(document.title);
    setEditorContent(document.content);
  };
  return (
    <div>
      <div className="relative">
        <div className="dropdown-menu absolute top-62 right-80 mt-2 bg-white p-2 rounded shadow" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded mr-2"
          />
          <button
            className={`bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded ${isSearchButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleSearch}
            disabled={isSearchButtonDisabled}
          >
            Search
          </button>
          <div>
            {showDropdown && searchResults && searchResults.length > 0 && (
              <div className="absolute z-10 mt-3 ml-[-5px] w-full bg-green-300 border border-gray-300 rounded">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleDropdownClick(result.id)} // Pass id instead of email
                  >
                    {result.email}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
        <div className="mt-5 ml-10 text-green-700 w-full text-xl right-80 font-extrabold">
          {selectedEmail && (
            <button disabled
              className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleShareDocument}
            >
              Share Document with {selectedEmail}
            </button>
          )}
        </div>

      </div>
      <div className="container mx-auto p-8 h-96">
        <input className="text-4xl font-semibold mb-4 outline-none " value={title} onChange={handleTitleChange} placeholder="Title Here" />
        <div>
          <ReactQuill className="h-96" value={editorContent} onChange={setEditorContent} />
        </div>
        <button
          className="bg-green-400 hover:bg-green-500  mt-20  text-white font-bold py-2 px-4 rounded"
          onClick={handleSave}
        >
          Save Text
        </button>
        <button
          className="bg-green-400 hover:bg-green-500 mt-10 ml-10 text-white font-bold py-2 px-4 rounded"
          onClick={handlePending}
        >
          Add to Pending
        </button>
        <Pending pendingDocuments={pendingDocuments} onDocumentClick={handleDocumentClick} />
        <Shared
            sharedDocuments={pendingDocuments}
            openInEditor={openSharedDocumentInEditor}
          />
      </div>
    </div>
  );
};

export default CombineEditor;
