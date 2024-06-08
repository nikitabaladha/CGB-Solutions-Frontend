// App.js

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import BookForm from "./components/BookForm/BookForm";
import ViewBook from "./components/ViewBook/ViewBook";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/view-book" element={<ViewBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
