import React from "react";

const Pending = ({ pendingDocuments, onDocumentClick }) => {
    return (
      <div className="pending-documents">
        <h2 className="bg-green-800 text-white mt-20 p-2 max-w-max border rounded-md text-5xl">Pending Documents</h2>
        {pendingDocuments.length === 0 ? (
          <p className="mt-4 text-3xl mb-20 ">No files in pending.</p>
        ) : (
          <ul className="mt-10">
            {pendingDocuments.map((document, index) => (
              <li key={index}>
                <button className="bg-green-400 hover:bg-green-500  ml-57 w-full mb-10 text-white  p-2 border rounded-md text-2xl" onClick={() => onDocumentClick(document)}>{document.title}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default Pending;
  
