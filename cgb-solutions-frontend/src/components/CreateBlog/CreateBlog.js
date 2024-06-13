// // src/components/CreateBlog/CreateBlog.js

// import React, { useState } from "react";
// import postAPI from "../../Api/axiosPost";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const CreateBlog = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     date: "",
//     summary: "",
//     bannerImageUrl: null,
//     contentImageUrl: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleContentChange = (value) => {
//     setFormData({
//       ...formData,
//       content: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { title, date, summary, bannerImageUrl, contentImageUrl } = formData;

//     try {
//       const formDataAPI = new FormData();
//       formDataAPI.append("title", title);
//       formDataAPI.append("date", date);
//       formDataAPI.append("summary", summary);
//       formDataAPI.append("bannerImageUrl", bannerImageUrl);
//       formDataAPI.append("contentImageUrl", contentImageUrl);

//       const response = await postAPI(`/api/blog`, formDataAPI);

//       console.log("Blog created:", response.data);
//     } catch (error) {
//       console.error("Error creating blog:", error);
//     }
//   };

//   return (
//     <div className="create-blog-container">
//       <h2>Create Blog</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Date</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Banner Image</label>
//           <input
//             type="file"
//             name="bannerImageUrl"
//             onChange={handleFileChange}
//             className="form-control-file"
//             accept="image/*"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Content Image</label>
//           <input
//             type="file"
//             name="contentImageUrl"
//             onChange={handleFileChange}
//             className="form-control-file"
//             accept="image/*"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Summary</label>
//           <ReactQuill
//             value={formData.summary}
//             onChange={handleContentChange}
//             className="quill-editor"
//             modules={{
//               toolbar: [
//                 [{ header: "1" }, { header: "2" }, { font: [] }],
//                 [{ size: [] }],
//                 ["bold", "italic", "underline", "strike", "blockquote"],
//                 [{ list: "ordered" }, { list: "bullet" }],
//                 ["link", "image", "video"],
//                 ["clean"],
//                 ["code-block"],
//               ],
//             }}
//             formats={[
//               "header",
//               "font",
//               "size",
//               "bold",
//               "italic",
//               "underline",
//               "strike",
//               "blockquote",
//               "list",
//               "bullet",
//               "link",
//               "image",
//               "video",
//               "code-block",
//             ]}
//             placeholder="Write something amazing..."
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Create Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateBlog;

import React, { useState } from "react";
import postAPI from "../../Api/axiosPost";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    summary: "",
    bannerImageUrl: null,
    contentImageUrl: null,
  });

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

    debugger;

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

      console.log("Blog created:", response.data);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

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
        </div>

        <div className="form-group">
          <label>Summary</label>
          <ReactQuill
            value={formData.summary}
            onChange={handleQuillChange}
            className="quill-editor"
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image", "video"],
                ["clean"],
                ["code-block"],
              ],
            }}
            formats={[
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
              "image",
              "video",
              "code-block",
            ]}
            placeholder="Write something amazing..."
          />
        </div>
        {/* Removed ReactQuill for content */}
        <button type="submit" className="btn btn-primary">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
