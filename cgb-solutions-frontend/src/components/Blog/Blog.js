// components/Blog/Blog.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Blog.css";
import getAPI from "../../Api/axiosGet";
import Navbar from "../Navbar/Navbar.js";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getAPI(`/blog/${id}`, false);
        if (response.data && !response.data.hasError) {
          setBlog(response.data.data);
        } else {
          setError(response.data.message || "Error fetching blog");
        }
      } catch (err) {
        setError(err.message || "Error fetching blog");
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  const renderSummaryWithContentImage = (summary) => {
    const paragraphs = summary.split("<br>");

    let splitIndex = Math.ceil(paragraphs.length / 2);

    if (paragraphs.length <= 3) {
      splitIndex = 1;
    }

    const firstPart = paragraphs.slice(0, splitIndex).join("<br>");

    const secondPart = paragraphs.slice(splitIndex).join("<br>");

    return (
      <div className="summary">
        <div dangerouslySetInnerHTML={{ __html: firstPart }} />

        {blog && blog.contentImageUrl && (
          <div className="contentImage">
            <img src={blog.contentImageUrl} alt="Blog Content" />
          </div>
        )}

        <div dangerouslySetInnerHTML={{ __html: secondPart }} />
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="blog-container">
        {error && <p className="error">Error: {error}</p>}
        {blog ? (
          <div className="blog">
            <h2>{blog.title}</h2>
            <p>
              <strong>{blog.userName}</strong> |{" "}
              {new Date(blog.date).toISOString().split("T")[0]}
            </p>
            <div className="bannerImage">
              <img src={blog.bannerImageUrl} alt="Blog Banner" />
            </div>

            {renderSummaryWithContentImage(blog.summary)}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
