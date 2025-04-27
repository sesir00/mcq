import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
//import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Dheader({OpenSidebar}) {

  const [user, setUser] = useState(() => {
    const storedData = sessionStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    if(user){
      console.log("role = " + user.role)
    }
  },[user])
  const handleLogout = () => {
    setUser(null); // Clear user session
    history.push('/login'); // Redirect to home page
  };
  return (
    <>
    
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        {/* <div className='header-left'>
            <BsSearch  className='icon'/>
        </div> */}
        <div className='header-right' style={{marginLeft:'92%'}}>
            {/* <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/> */}
            {/* <button className="button-container miq55g7" style={{marginTop: '8px'}} >Logout</button> */}
             
            {
                  user ? 
                    <Link className="nav-link" to="/" style={{margin:0}}>
                      <button className="button-container miq55g7" style={{marginTop: '8px'}} onClick={handleLogout}>Logout</button>
                    </Link> :
                  <Link className="nav-link" to="/login" style={{margin:0}}>
                  <button className="button-container miq55g7">Login</button>
                  </Link>
                }
        </div>
    </header>
    </>
   
  )
}

export default Dheader



