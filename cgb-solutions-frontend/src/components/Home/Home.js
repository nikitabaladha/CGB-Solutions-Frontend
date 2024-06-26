// components/Home/Home.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Home.css";
import getAPI from "../../Api/axiosGet";
import Navbar from "../Navbar/Navbar.js";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAPI("/blog", false);
        const modifiedBlogs = response.data.data.map((blog) => ({
          ...blog,

          date: format(new Date(blog.date), "yyyy-MM-dd HH:mm:ss"),
        }));
        setBlogs(modifiedBlogs);
        console.log(modifiedBlogs);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="blog-container">
        {blogs.length === 0 ? (
          <p className="no-blogs-message">No blogs available...</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog">
              <div className="row">
                <div className="col-md-4">
                  <div className="image-container">
                    <Link to={`/blog/${blog._id}`}>
                      <img
                        src={blog.bannerImageUrl}
                        alt={blog.title}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="blog-content">
                    <h3 className="blog-title">
                      <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                    </h3>
                    <p className="blog-userName">
                      {blog.date} | By <strong>{blog.userName}</strong>
                    </p>
                    <div
                      className="summary"
                      dangerouslySetInnerHTML={{ __html: blog.summary }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
