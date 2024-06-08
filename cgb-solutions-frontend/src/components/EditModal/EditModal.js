// components/EditModal/EditModal.js

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import putAPI from "../../Api/axiosPut.js";
import "./EditModal.css";

const EditModal = ({ book, onClose, updateBookList: onUpdate }) => {
  const [editedDetails, setEditedDetails] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    yearPublished: book.yearPublished,
    _id: book._id,
  });

  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    setGeneralError("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...editedBook } = editedDetails;

      const response = await putAPI(`/book/${book._id}`, editedBook);

      if (response.data.hasError) {
        setGeneralError(response.data.message);
        console.error("Book Edition Error:", response.data.message);
      } else {
        alert(response.data.message);
        console.log("Book Edited Successful Message:", response.data.message);

        onUpdate(editedDetails);
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Book Edition Error:", error.response.data.message);

        setGeneralError(error.response.data.message);
      } else {
        console.error("Book Edition Error:", error);
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleEditSubmit}>
          <label>
            Title:
            <input
              className="form-control"
              type="text"
              name="title"
              value={editedDetails.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              className="form-control"
              value={editedDetails.author}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Genre:
            <input
              type="text"
              name="genre"
              className="form-control"
              value={editedDetails.genre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Year Published:
            <input
              type="text"
              name="yearPublished"
              className="form-control"
              value={editedDetails.yearPublished}
              onChange={handleChange}
              required
            />
          </label>
          {generalError && <p className="error">{generalError}</p>}
          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
