import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Blog.css";
import getAPI from "../../Api/axiosGet";

import Navbar from "../Navbar/Navbar.js";
import postAPI from "../../Api/axiosPost.js";

const Blog = ({ showButtons, onDelete }) => {
  const { id } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  console.log("isAdmin:", isAdmin);
  console.log("location.state.from:", location);
  console.log("location.state:", location.state);

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

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails?.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const handleCreateApprove = async () => {
    try {
      const response = await postAPI(`/approve-create/${id}`);
      if (response.data && !response.data.hasError) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          status: "approved",
        }));
        alert(response.data.message);
        console.log("Blog creation approved successfully");
      } else {
        setError(response.data.message || "Error approving blog creation");
      }
    } catch (error) {
      setError(error.message || "Error approving blog creation");
      console.error("Error approving blog creation:", error);
    }
  };

  const handleCreateReject = () => {
    // Implement reject functionality
    console.log("Create Rejected");
  };

  const handleEdit = () => {
    // Redirect to UpdateBlogForm component with the blog ID
    navigate(`/update-blog-form/${id}`);
  };

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

            {showButtons && (
              <div className="edit-delete-buttons">
                <button className="edit-button" onClick={handleEdit}>
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(blog)}
                >
                  Delete
                </button>
              </div>
            )}

            {isAdmin && location.state && (
              <div className="approval-buttons">
                <button
                  className="approve-button"
                  onClick={handleCreateApprove}
                >
                  Approve
                </button>
                <button className="reject-button" onClick={handleCreateReject}>
                  Reject
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
