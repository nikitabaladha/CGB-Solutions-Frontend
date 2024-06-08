// components/Home.js

import React, { useEffect, useState } from "react";
import "./Home.css";
import getAPI from "../../Api/axiosGet";
import Navbar from "../Navbar/Navbar.js";

const convertPath = (path) => {
  return path.replace(/\\/g, "/");
};

const Home = () => {
  const [blog, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAPI("/blog", false);
        const blogsWithForwardSlashes = response.data.data.map((blog) => ({
          ...blog,
          bannerImageUrl: convertPath(blog.bannerImageUrl),
        }));
        console.log(response.data.data);
        setBlogs(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching banners:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="blog-container">
        {error && <p className="error">Error: {error}</p>}
        {blog.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          blog.map((blog) => (
            <div key={blog._id} className="blog">
              <img src={blog.bannerImageUrl} alt={blog.title} />

              <h2>{blog.title}</h2>
              <p>{blog.summary}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
