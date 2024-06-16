// App.js

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Blog from "./components/Blog/Blog.js";
import CreateBlog from "./components/CreateBlog/CreateBlog.js";
import UpdateBlog from "./components/UpdateBlog/UpdateBlog.js";
import YourBlog from "./components/YourBlog/YourBlog.js";
import UpdateBlogForm from "./components/UpdateBlogForm/UpdateBlogForm.js";
import CreateRequest from "./components/Requests/CreateRequest.js";
import UpdateRequest from "./components/Requests/UpdateRequest.js";
import DeleteRequest from "./components/Requests/DeleteRequest.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/update-blog/:id" element={<UpdateBlog />} />
        <Route path="/your-blog" element={<YourBlog />} />
        <Route path="/update-blog-form/:id" element={<UpdateBlogForm />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/update-request" element={<UpdateRequest />} />
        <Route path="/delete-request" element={<DeleteRequest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
