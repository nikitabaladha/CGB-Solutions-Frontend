// src/components/BookForm.js

import React, { useState } from "react";
import "./BookForm.css";
import postAPI from "../../Api/axiosPost.js";

const BookForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    yearPublished: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    author: "",
    genre: "",
    yearPublished: "",
  });

  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });

    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI("/book ", formData);

      if (!response.hasError) {
        alert(response.data.message);
        console.log(
          "Book successful submission Message:",
          response.data.message
        );
        onSuccess();
      } else {
        setGeneralError(response.data.message);
        console.error("Submission Error 1:", response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Submission Error 2:", error.response.data.message);

        setGeneralError(error.response.data.message);
      } else {
        console.error("Submission Error 3:", error);

        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {formErrors.title && <p className="error">{formErrors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          {formErrors.author && <p className="error">{formErrors.author}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
          {formErrors.genre && <p className="error">{formErrors.genre}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="yearPublished">Year Published</label>
          <input
            type="number"
            className="form-control"
            id="yearPublished"
            name="yearPublished"
            value={formData.yearPublished}
            onChange={handleChange}
            required
          />
          {formErrors.yearPublished && (
            <p className="error">{formErrors.yearPublished}</p>
          )}
          {generalError && <p className="error">{generalError}</p>}
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookForm;
