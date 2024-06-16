import React from "react";
import Blog from "../Blog/Blog";

const UpdateBlog = () => {
  const handleEdit = (updatedBlog) => {
    console.log("Edit blog:", updatedBlog);
  };

  const handleDelete = () => {
    console.log("Delete blog");
  };

  return (
    <div>
      <Blog showButtons={true} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UpdateBlog;
