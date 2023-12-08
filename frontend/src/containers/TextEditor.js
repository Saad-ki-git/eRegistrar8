import React, { useState, useEffect } from "react";
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
const TextEditor = () => {
    const [title, setTitle] = useState("")
    const [editorContent, setEditorContent] = useState("");
    const { access_token } = getToken()
    const { data } = useGetLoggedUserQuery(access_token)
    const [pendingDocuments, setPendingDocuments] = useState([]);
    const dispatch = useDispatch();


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };


    const handleSave = () => {
        try {
            axios
                .post("http://localhost:8000/auth/document/", {
                    title: title,
                    content: editorContent,
                    user: data.id, //sending the userID
                })
                .then((response) => {
                    const docId = response.data.docId;
                    console.log("Document saved successfully with ID:", docId);
                    alert("Document saved successfully");
                    dispatch(setDocId(docId));
                    console.log("The setDocId is: ", setDocId(docId))
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
        setTitle(document.title);
        setEditorContent(document.content);
    };



    return (
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
    );
};

export default TextEditor;
