// src/components/Navbar/Navbar.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./Navbar.css";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

const AuthModal = ({ show, handleClose, title, children }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleModalClose = (setModalState) => () => setModalState(false);
  const handleModalShow = (setModalState) => () => setModalState(true);

  const handleSignupSuccess = () => {
    console.log("Signup successful");
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    console.log("Login successful");
    setShowLoginModal(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <h1 id="brand-logo">BloggerBuddy</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse middlePart nav-btn"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link create-blog-button"
                    onClick={handleLogout}
                  >
                    Create Blog
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link logout-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link login-button"
                    onClick={handleModalShow(setShowLoginModal)}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link signup-button"
                    onClick={handleModalShow(setShowSignupModal)}
                  >
                    Signup
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {showLoginModal && (
        <AuthModal
          show={showLoginModal}
          handleClose={handleModalClose(setShowLoginModal)}
          title="Login"
        >
          <Login
            onSignupClick={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
            onSuccess={handleLoginSuccess}
            onClose={handleModalClose(setShowLoginModal)}
          />
        </AuthModal>
      )}

      {showSignupModal && (
        <AuthModal
          show={showSignupModal}
          handleClose={handleModalClose(setShowSignupModal)}
          title="Signup"
        >
          <Signup
            onLoginClick={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
            onSuccess={handleSignupSuccess}
            onClose={handleModalClose(setShowSignupModal)}
          />
        </AuthModal>
      )}
    </nav>
  );
};

export default Navbar;
