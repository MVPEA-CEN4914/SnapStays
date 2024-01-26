import React from 'react'

const settings = ['Signup'];

function HomeNavbar() {
    const [anchorNav, setAnchorNav] = React.useState(null);
    const [anchorUser, setAnchorUser] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorUser(null);
    };
    
  return (
    <div>HomeNavbar</div>
  )
}

export default HomeNavbar