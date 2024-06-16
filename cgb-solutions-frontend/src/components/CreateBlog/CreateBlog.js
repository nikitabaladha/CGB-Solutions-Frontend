import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import postAPI from "../../Api/axiosPost";
import "./CreateBlog.css";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    summary: "",
    bannerImageUrl: null,
    contentImageUrl: null,
  });

  const [error, setError] = useState("");

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

      const response = await postAPI(`/blog`, formDataAPI, {
        "Content-Type": "multipart/form-data",
      });

      if (!response.hasError) {
        alert(response.data.message);
        console.log(
          "Successful Blog submission Message:",
          response.data.message
        );
        navigate("/");
      } else {
        setError(response.data.message);
        console.error("Blog submission Error:", response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again.";

      setError(errorMessage);
      console.error("Error creating blog:", errorMessage);
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

  return (
    <div className="create-blog-container">
      <h2>Create Blog</h2>
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
            required
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
            required
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
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
