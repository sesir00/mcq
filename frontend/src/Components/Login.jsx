import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import './Login.css';


const Login = () => {
  const history = useHistory();
  const handleButtonClick = () => {
    history.push('/');
  }

  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/auth/login', formData)
      .then(response => {
        if(response.data.success){
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          if(response.data.user.role === "admin")
             history.push('/upload')
          else if(response.data.user.role === "superadmin")
            history.push('/dashboard')
          else
           history.push('/history');
         
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: response.data.message,
            confirmButtonColor: '#d33'
          });
        }
      })
      .catch(error => {
        console.error("There was an error logging in.", error);
        // setError("An error occured. Please try again.");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred. Please try again later!',
          confirmButtonColor: '#d33'
        });
      });
  }
  return (
    <>
      <button className='backbtn' style={{color:'black'}} onClick={handleButtonClick}>
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Back</span>
      </button>



      <div className="center-wrapper">
      <div className="form-container">
        <div className="logo-container">
          Login
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleOnChange} placeholder="Enter your name" required=""/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleOnChange} placeholder="Enter your password" required=""/>
          </div>

          

          <button className="form-submit-btn" type="submit">Login</button>
        </form>

        <p className="signup-link">
          Don&apos;t have an account?
        <Link to="/signup" className="signup-link link"> Sign up now</Link>
        </p>
      </div>
      </div>
    </>
  )
}

export default Login