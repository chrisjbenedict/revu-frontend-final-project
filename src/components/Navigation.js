
import React from "react";
import { Menu } from "semantic-ui-react"
import { Link } from "react-router-dom"
const Navigation = props => {

  return (
    <Menu>
       <Link to="/revu" className="item">
         RevU
       </Link>
       { !props.currentUser ?
         <Menu.Menu position="right">
           <Link to="/signup" className="item">
             Sign Up
           </Link>
           <Link to="/login" className="item">
             Log In
           </Link>
         </Menu.Menu>
         :
         <Menu.Menu>
           <Link to='/college_info' className="item" position="left">
            College Info
           </Link>
           <Link to='/favorites' className="item" position="left">
            Favorites
           </Link>
           <Link to='/profile' className="item" position="left">
            Profile
           </Link>
           <Menu.Item position="right" onClick={props.logout}>
            Log out
           </Menu.Item>
         </Menu.Menu>
     }
   </Menu>
  )
};

export default Navigation;
