# CGB Solutions Blog Frontend

This is the frontend for the CGB Solutions Blog application, built with React, React Router, and React Bootstrap. The frontend interacts with the backend to manage blog posts and user authentication.

- Table of Contents:-

Installation
Configuration
Scripts
Project Structure
Components
Routing
Usage

# Installation

Clone the repository:

git clone https://github.com/yourusername/cgb-solutions-frontend.git

cd cgb-solutions-frontend

# Install dependencies:

npm install

# Configuration

No specific configuration is required. Ensure the backend is running and accessible for API requests. Update the backend API URL in the appropriate Axios configuration files if necessary.

# Scripts

start: Starts the development server.
build: Builds the app for production.
test: Runs the test suite.
eject: Ejects the create-react-app configuration.

npm start
npm run build
npm test
npm run eject

# Project Structure

src/
├── components/
│ ├── Blog/
│ │ └── Blog.js
│ ├── CreateBlog/
│ │ └── CreateBlog.js
│ ├── Home/
│ │ └── Home.js
│ ├── Requests/
│ │ ├── CreateRequest.js
│ │ ├── DeleteRequest.js
│ │ └── UpdateRequest.js
│ ├── UpdateBlog/
│ │ └── UpdateBlog.js
│ ├── UpdateBlogForm/
│ │ └── UpdateBlogForm.js
│ └── YourBlog/
│ └── YourBlog.js
├── App.js
├── index.js
└── ...

# Components

Home:-

File: src/components/Home/Home.js
Description: Displays the home page with a list of all blogs.

Blog:-

File: src/components/Blog/Blog.js
Description: Displays a single blog post based on the blog ID.

CreateBlog
File: src/components/CreateBlog/CreateBlog.js
Description: Allows users to create a new blog post.

UpdateBlog:-
File: src/components/UpdateBlog/UpdateBlog.js
Description: Allows users to request updates to an existing blog post.

YourBlog:-
File: src/components/YourBlog/YourBlog.js
Description: Displays all blogs created by the logged-in user.

UpdateBlogForm:-
File: src/components/UpdateBlogForm/UpdateBlogForm.js
Description: Form to update a specific blog post.

Requests:-
Files: src/components/Requests/CreateRequest.js, src/components/Requests/UpdateRequest.js, src/components/Requests/DeleteRequest.js
Description: Components to handle create, update, and delete requests for blogs.

# Routing

The application uses React Router for client-side routing. The routes are defined in src/App.js:

# Usage

Start the backend server.

Start the frontend development server:

npm start

Open your browser and navigate to http://localhost:3000 to view the application.

Use the application to create, update, and delete blogs. Admin users can approve or reject blog requests.
