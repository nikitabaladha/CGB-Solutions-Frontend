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
      <div className="summary-blog">
        <div
          className="summary-part first-part"
          dangerouslySetInnerHTML={{ __html: firstPart }}
        />

        {blog && blog.contentImageUrl && (
          <div className="contentImage">
            <img src={blog.contentImageUrl} alt="Blog Content" />
          </div>
        )}

        <div
          className="summary-part second-part"
          dangerouslySetInnerHTML={{ __html: secondPart }}
        />
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
            <div className="title">
              <h2>{blog.title}</h2>
            </div>

            <p className="date-author">
              {new Date(blog.date).toISOString().split("T")[0]} | By{" "}
              <strong>{blog.userName}</strong>
            </p>

            <div className="bannerImage col-md-8">
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
