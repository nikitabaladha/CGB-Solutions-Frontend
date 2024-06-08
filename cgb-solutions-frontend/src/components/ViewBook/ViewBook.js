import React, { useState, useEffect } from "react";
import getAPI from "../../Api/axiosGet";
import deleteAPI from "../../Api/axiosDelete";
import "./ViewBook.css";
import EditModal from "../EditModal/EditModal.js";

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await getAPI("/book");
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    console.log("Edit button clicked");
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await deleteAPI(`/book/${bookId}`);

      if (response && !response.hasError) {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
        console.log("Response:", response.data.message);
      } else {
        console.error("View Book Error:", response.message);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const updateBookList = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        return book._id === updatedBook._id ? updatedBook : book;
      })
    );
  };

  return (
    <div className="container mt-4">
      <h3>All Books</h3>
      <div className="books-list">
        {books.map((book, index) => (
          <div key={book._id} className="book-card">
            <div className="book-header">
              <h3>{book.title}</h3>
            </div>
            <div className="book-content">
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Year Published: {book.yearPublished}</p>
            </div>
            <div className="book-footer">
              <button onClick={() => handleEdit(book)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <EditModal
          book={selectedBook}
          onClose={closeModal}
          updateBookList={updateBookList}
        />
      )}
    </div>
  );
};

export default ViewBook;
