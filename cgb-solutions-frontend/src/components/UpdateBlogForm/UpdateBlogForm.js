import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import putAPI from "../../Api/axiosPut";
import getAPI from "../../Api/axiosGet";
import "./UpdateBlogForm.css";

const UpdateBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    summary: "",
    bannerImageUrl: null,
    contentImageUrl: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getAPI(`/blog/${id}`);
        setLoading(false);

        if (response.data && !response.data.hasError) {
          const blogData = response.data.data;
          setFormData({
            title: blogData.title,
            date: blogData.date,
            summary: blogData.summary,
            bannerImageUrl: blogData.bannerImageUrl || null,
            contentImageUrl: blogData.contentImageUrl || null,
          });
        } else {
          setError(response.data.message || "Error fetching blog");
        }
      } catch (err) {
        setLoading(false);
        setError(err.message || "Error fetching blog");
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      summary: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, date, summary, bannerImageUrl, contentImageUrl } = formData;

    try {
      const formDataAPI = new FormData();
      formDataAPI.append("title", title);
      formDataAPI.append("date", date);
      formDataAPI.append("summary", summary);
      formDataAPI.append("bannerImageUrl", bannerImageUrl);
      formDataAPI.append("contentImageUrl", contentImageUrl);

      const response = await putAPI(`/blog/${id}`, formDataAPI, {
        "Content-Type": "multipart/form-data",
      });

      if (!response.hasError) {
        alert(response.data.message);
        console.log("Successful Blog update Message:", response.data.message);
        navigate(`/blog/${id}`);
      } else {
        setError(response.data.message);
        console.error("Blog update Error:", response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      console.error("Error updating blog:", errorMessage);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-blog-form-container">
      <h2>Update Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Banner Image</label>
          <input
            type="file"
            name="bannerImageUrl"
            onChange={handleFileChange}
            className="form-control-file"
            accept="image/*"
          />
          {formData.bannerImageUrl &&
            typeof formData.bannerImageUrl === "object" && (
              <img
                src={URL.createObjectURL(formData.bannerImageUrl)}
                alt="Banner Preview"
                className="preview-image"
              />
            )}
        </div>
        <div className="form-group">
          <label>Content Image</label>
          <input
            type="file"
            name="contentImageUrl"
            onChange={handleFileChange}
            className="form-control-file"
            accept="image/*"
          />
          {formData.contentImageUrl &&
            typeof formData.contentImageUrl === "object" && (
              <img
                src={URL.createObjectURL(formData.contentImageUrl)}
                alt="Content Preview"
                className="preview-image"
              />
            )}
        </div>

        <div className="form-group">
          <label>Summary</label>
          <ReactQuill
            value={formData.summary}
            onChange={handleQuillChange}
            className="quill-editor"
            modules={modules}
            formats={formats}
            placeholder="Write something amazing..."
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlogForm;
