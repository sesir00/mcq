import { useState } from 'react'
import './Dashboard.css'
import Header from './Dheader'
import Sidebar from './Dslider'
import Home from './Dhome'
import AllUserData from './AllUserData'


function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
const [checkClick, setcheckClick] = useState(false);
console.log(checkClick)
  return (
    <div className='grid-container'>
     <Header OpenSidebar={OpenSidebar}/>
       <Sidebar openSidebarToggle={openSidebarToggle} setcheckClick={setcheckClick} OpenSidebar={OpenSidebar}/> 
      {checkClick===false?( <Home></Home>):(<AllUserData></AllUserData>)}
      
    </div>
  )
}

export default Dashboard
