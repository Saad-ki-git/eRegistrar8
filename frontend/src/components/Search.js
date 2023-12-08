import React, { useState, useEffect,useRef } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { getToken, removeToken } from "../services/LocalStorageService"
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { connect } from 'react-redux';
import { setDocId } from "../actions/actions";

function Search({docId,setDocId}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const { access_token } = getToken()
  const { data } = useGetLoggedUserQuery(access_token)
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Access updated docId here
    console.log('Updated docId in Search component:', docId);
  }, [docId]); // Run this effect whenever docId changes

  useEffect(() => {
    setIsSearchButtonDisabled(searchQuery.trim() === "");
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/auth/search/?search=${searchQuery}`
      );
      setSearchResults(response.data.results);
      setShowDropdown(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropdownClick = (email) => {
    setSelectedEmail(email);
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
  console.log("The document ID: ",docId)
  const handleShareDocument = async () => {
    console.log("The document ID: ",docId)
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/shared-documents/",
        {
          sender: data.email, // Replace with the actual sender ID
          recipient: selectedEmail, // Use the selected email as recipient
          document: docId, // Replace with the actual document ID you want to share
        }
      );
      console.log("Document shared successfully", response.data);
      // Add any additional logic after sharing the document
    } catch (error) {
      console.error("Error sharing document", error);
    }
  };


    return (
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
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute z-10 mt-3 ml-[-5px] w-full bg-green-300 border border-gray-300 rounded">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleDropdownClick(result.email)}
              >
                {result.email}
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
      <div className="mt-5 ml-10 text-green-700 w-full text-xl right-80 font-extrabold">
        {selectedEmail && <p>Selected Email: {selectedEmail}</p>}
        {selectedEmail && (
        <button
          className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleShareDocument}
        >
          Share Document with {selectedEmail}
        </button>
      )}
      </div>
    </div>
    );
}
const mapStateToProps = (state) => {
  return {
    docId: state.docId, // Map docId from Redux state to component props
  };
};

const mapDispatchToProps = {
  setDocId: setDocId, // Map setDocId action creator to component props
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
