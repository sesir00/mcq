import React from 'react';
import {
    BsGrid1X2Fill
} from 'react-icons/bs';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import myImage from '../../assets/quizgen-removebg.png';

function Dsidebar({openSidebarToggle, OpenSidebar ,setcheckClick}) {
    
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div >
            <Link className="navbar-brand" to="/"><img src={myImage} alt="logo error" style={{ width: '100px', height: 'auto' }} /></Link>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/dashboard">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'onClick={()=>{setcheckClick(true)}}>
                <Link to="/users" >
                <i className="fa fa-user"></i><span> User</span> 

                </Link>
            </li>

        </ul>
    </aside>
  )
}

export default Dsidebar