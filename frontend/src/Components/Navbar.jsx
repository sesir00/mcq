import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import myImage from '../assets/quizgen-removebg.png';
import './Navbar.css';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();

  const [user, setUser] = useState(() => {
    const storedData = sessionStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : null;
  });

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Clear user session
    setUser(null)
    history.push('/'); // Redirect to home page
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" ><img src={myImage} alt="logo error" style={{ width: '100px', height: 'auto' }} /></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item" style={{paddingTop:5}}>
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item" style={{paddingTop:5}}>
                <Link className="nav-link" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item" style={{paddingTop:5}}>
                <Link className="nav-link" to="/team">
                  Team
                </Link>
              </li>
              <li className="nav-item" style={{paddingTop:5}}>
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              {/* {
                user && user.role === "admin" && 
                <li className="nav-item" style={{paddingTop:5}}>
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              } */}
             
              <li className="nav-item">
                
                {
                  user ? <button className="button-container miq55g7" style={{marginTop: '8px'}} onClick={handleLogout}>Logout</button>:
                  <Link className="nav-link" to="/login" style={{margin:0}}>
                  <button className="button-container miq55g7">Login</button>
                  </Link>
                }

                
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
