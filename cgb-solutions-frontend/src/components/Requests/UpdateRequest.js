import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import getAPI from "../../Api/axiosGet";
import "./Requests.css";
import { format } from "date-fns";

const UpdateRequest = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAPI("/update-request");
        if (response.data && !response.data.hasError) {
          const modifiedBlogs = response.data.data.map((blog) => ({
            ...blog,
            date: format(new Date(blog.date), "yyyy-MM-dd HH:mm:ss"),
          }));
          setRequests(modifiedBlogs);
        } else {
          setError(response.data.message || "Error fetching requests");
        }
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
        {error && <p className="error">Error: {error}</p>}
        {requests.length > 0 ? (
          requests.map((blog) => (
            <div key={blog._id} className="blog">
              <div className="row">
                <div className="col-md-4">
                  <div className="image-container">
                    <Link
                      to={{
                        pathname: `/blog/${blog._id}`,
                      }}
                      state={{ from: "update-request" }}
                    >
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
                      <Link
                        to={{
                          pathname: `/blog/${blog._id}`,
                        }}
                        state={{ from: "update-request" }}
                      >
                        {blog.title}
                      </Link>
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
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateRequest;
