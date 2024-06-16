// import React, { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import "./Blog.css";
// import getAPI from "../../Api/axiosGet";
// import deleteAPI from "../../Api/axiosDelete";

// import Navbar from "../Navbar/Navbar.js";
// import postAPI from "../../Api/axiosPost.js";

// const Blog = ({ showButtons, onDelete }) => {
//   const { id } = useParams();
//   const location = useLocation();
//   const [blog, setBlog] = useState(null);
//   const [error, setError] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   console.log("isAdmin:", isAdmin);
//   console.log("location.state.from:", location);
//   console.log("location.state:", location.state);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await getAPI(`/blog/${id}`, false);
//         if (response.data && !response.data.hasError) {
//           setBlog(response.data.data);
//         } else {
//           setError(response.data.message || "Error fetching blog");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching blog");
//         console.error("Error fetching blog:", err);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     if (userDetails?.role === "admin") {
//       setIsAdmin(true);
//     }
//   }, []);

//   const handleDelete = async () => {
//     try {
//       const response = await deleteAPI(`/blog/${id}`);
//       if (response.data && !response.data.hasError) {
//         alert(response.data.message);
//         console.log("Blog deleted successfully", response.data.message);
//         navigate("/");
//       } else {
//         setError(response.data.message || "Error deleting blog");
//       }
//     } catch (error) {
//       setError(error.message || "Error deleting blog");
//       console.error("Error deleting blog:", error);
//     }
//   };

//   const handleApproveCreate = async () => {
//     try {
//       const response = await postAPI(`/approve-create/${id}`);
//       if (response.data && !response.data.hasError) {
//         setBlog((prevBlog) => ({
//           ...prevBlog,
//           status: "approved",
//         }));
//         alert(response.data.message);
//         console.log("Blog creation approved successfully");
//       } else {
//         setError(response.data.message || "Error approving blog creation");
//       }
//     } catch (error) {
//       setError(error.message || "Error approving blog creation");
//       console.error("Error approving blog creation:", error);
//     }
//   };

//   const handleApproveUpdate = async () => {
//     try {
//       const response = await postAPI(`/approve-update/${id}`);
//       if (response.data && !response.data.hasError) {
//         setBlog((prevBlog) => ({
//           ...prevBlog,
//           status: "approved",
//         }));
//         alert(response.data.message);
//         console.log("Blog update approved successfully");
//       } else {
//         setError(response.data.message || "Error approving blog creation");
//       }
//     } catch (error) {
//       setError(error.message || "Error approving blog update");
//       console.error("Error approving blog update:", error);
//     }
//   };

//   const handleApproveDelete = async () => {
//     try {
//       const response = await postAPI(`/approve-delete/${id}`);
//       if (response.data && !response.data.hasError) {
//         setBlog((prevBlog) => ({
//           ...prevBlog,
//           status: "rejected",
//         }));
//         alert(response.data.message);
//         console.log("Blog delete approved successfully");
//       } else {
//         setError(response.data.message || "Error approving blog deletion");
//       }
//     } catch (error) {
//       setError(error.message || "Error approving blog deletion");
//       console.error("Error approving blog deletion:", error);
//     }
//   };

//   const handleRejectCreate = async () => {
//     // Implement reject functionality
//     console.log("Create Rejected");
//   };

//   const handleRejectUpdate = async () => {
//     // Implement reject functionality
//     console.log("Update Rejected");
//   };

//   const handleRejectDelete = async () => {
//     // Implement reject functionality
//     console.log("Delete Rejected");
//   };

//   const handleEdit = () => {
//     // Redirect to UpdateBlogForm component with the blog ID
//     navigate(`/update-blog-form/${id}`);
//   };

//   const renderSummaryWithContentImage = (summary) => {
//     const paragraphs = summary.split("<br>");

//     let splitIndex = Math.ceil(paragraphs.length / 2);

//     if (paragraphs.length <= 3) {
//       splitIndex = 1;
//     }

//     const firstPart = paragraphs.slice(0, splitIndex).join("<br>");

//     const secondPart = paragraphs.slice(splitIndex).join("<br>");

//     return (
//       <div className="summary-blog">
//         <div
//           className="summary-part first-part"
//           dangerouslySetInnerHTML={{ __html: firstPart }}
//         />

//         {blog && blog.contentImageUrl && (
//           <div className="contentImage">
//             <img src={blog.contentImageUrl} alt="Blog Content" />
//           </div>
//         )}

//         <div
//           className="summary-part second-part"
//           dangerouslySetInnerHTML={{ __html: secondPart }}
//         />
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="blog-container">
//         {error && <p className="error">Error: {error}</p>}
//         {blog ? (
//           <div className="blog">
//             <div className="title">
//               <h2>{blog.title}</h2>
//             </div>

//             <p className="date-author">
//               {new Date(blog.date).toISOString().split("T")[0]} | By{" "}
//               <strong>{blog.userName}</strong>
//             </p>

//             <div className="bannerImage col-md-8">
//               <img src={blog.bannerImageUrl} alt="Blog Banner" />
//             </div>

//             {renderSummaryWithContentImage(blog.summary)}

//             {showButtons && (
//               <div className="edit-delete-buttons">
//                 <button className="edit-button" onClick={handleEdit}>
//                   Edit
//                 </button>
//                 <button className="delete-button" onClick={handleDelete}>
//                   Delete
//                 </button>
//               </div>
//             )}

//             {isAdmin && (
//               <div className="approval-buttons">
//                 <button
//                   className="approve-button"
//                   onClick={handleApproveCreate}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className="approve-button"
//                   onClick={handleApproveDelete}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Blog;

// =================================================================

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Blog.css";
import getAPI from "../../Api/axiosGet";
import deleteAPI from "../../Api/axiosDelete";

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

  const handleDelete = async () => {
    try {
      const response = await deleteAPI(`/blog/${id}`);
      if (response.data && !response.data.hasError) {
        alert(response.data.message);
        console.log("Blog deleted successfully", response.data.message);
        navigate("/");
      } else {
        setError(response.data.message || "Error deleting blog");
      }
    } catch (error) {
      setError(error.message || "Error deleting blog");
      console.error("Error deleting blog:", error);
    }
  };

  const handleApproveCreate = async () => {
    try {
      const response = await postAPI(`/approve-create/${id}`);
      if (response.data && !response.data.hasError) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          status: "approved",
        }));
        alert(response.data.message);
        navigate("/");
        console.log("Blog creation approved successfully");
      } else {
        setError(response.data.message || "Error approving blog creation");
      }
    } catch (error) {
      setError(error.message || "Error approving blog creation");
      console.error("Error approving blog creation:", error);
    }
  };

  const handleApproveUpdate = async () => {
    try {
      const response = await postAPI(`/approve-update/${id}`);
      if (response.data && !response.data.hasError) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          status: "approved",
        }));
        alert(response.data.message);
        navigate("/");
        console.log("Blog update approved successfully");
      } else {
        setError(response.data.message || "Error approving blog update");
      }
    } catch (error) {
      setError(error.message || "Error approving blog update");
      console.error("Error approving blog update:", error);
    }
  };

  const handleApproveDelete = async () => {
    try {
      const response = await postAPI(`/approve-delete/${id}`);
      if (response.data && !response.data.hasError) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          status: "rejected",
        }));
        alert(response.data.message);
        navigate("/");
        console.log("Blog delete approved successfully");
      } else {
        setError(response.data.message || "Error approving blog deletion");
      }
    } catch (error) {
      setError(error.message || "Error approving blog deletion");
      console.error("Error approving blog deletion:", error);
    }
  };

  const handleRejectCreate = async () => {
    try {
      const response = await postAPI(`/reject-create/${id}`);
      if (response.data && !response.data.hasError) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          status: "approved",
        }));
        alert(response.data.message);
        navigate("/");
        console.log("Blog delete rejected successfully");
      } else {
        setError(response.data.message || "Error rejecting blog creation");
      }
    } catch (error) {
      setError(error.message || "Error rejecting blog creation");
      console.error("Error rejecting blog creation:", error);
    }
  };

  const handleRejectUpdate = async () => {
    try {
      const response = await postAPI(`/reject-update/${id}`);
      if (response.data && !response.data.hasError) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          status: "approved",
        }));
        alert(response.data.message);
        navigate("/");
        console.log("Blog update rejected successfully");
      } else {
        setError(response.data.message || "Error rejecting blog update");
      }
    } catch (error) {
      setError(error.message || "Error rejecting blog update");
      console.error("Error rejecting blog update:", error);
    }
  };

  const handleRejectDelete = async () => {
    try {
      const response = await postAPI(`/reject-delete/${id}`);
      if (response.data && !response.data.hasError) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          status: "approved",
        }));
        alert(response.data.message);
        navigate("/");
        console.log("Blog delete rejected successfully");
      } else {
        setError(response.data.message || "Error rejecting blog delete");
      }
    } catch (error) {
      setError(error.message || "Error rejecting blog delete");
      console.error("Error rejecting blog delete:", error);
    }
  };

  const handleEdit = () => {
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
                <button className="delete-button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}

            {isAdmin &&
              location.state &&
              location.state.from === "create-request" && (
                <div className="approval-buttons">
                  <button
                    className="approve-button"
                    onClick={handleApproveCreate}
                  >
                    Approve Create
                  </button>
                  <button
                    className="reject-button"
                    onClick={handleRejectCreate}
                  >
                    Reject Create
                  </button>
                </div>
              )}

            {isAdmin &&
              location.state &&
              location.state.from === "update-request" && (
                <div className="approval-buttons">
                  <button
                    className="approve-button"
                    onClick={handleApproveUpdate}
                  >
                    Approve Update
                  </button>
                  <button
                    className="reject-button"
                    onClick={handleRejectUpdate}
                  >
                    Reject Update
                  </button>
                </div>
              )}

            {isAdmin &&
              location.state &&
              location.state.from === "delete-request" && (
                <div className="approval-buttons">
                  <button
                    className="approve-button"
                    onClick={handleApproveDelete}
                  >
                    Approve Delete
                  </button>
                  <button
                    className="reject-button"
                    onClick={handleRejectDelete}
                  >
                    Reject Delete
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
