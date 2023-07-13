import React, { useState, useEffect } from "react";
import "./layout.css";
import "../../src/index.css"
import { Form, Layout, Row, Col } from "antd";
import Content from "./Forminput";
import { Link, useNavigate } from "react-router-dom";
// import { styled} from '@mui/material/styles';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import InputBase from '@mui/material/InputBase';
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
// import useAuth from '../../hooks/useAuth';
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const { Header } = Layout;

export default function Layouts() {
  const navigate = useNavigate();
  // const { setUser } = useAuth()
  const [selected, setSelected] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    if (selected === true) {
      document.getElementById("sideNav").style.width = "150px";
      document.getElementById("otherSide").style.marginLeft = "150px";
    } else {
      document.getElementById("sideNav").style.width = "0px";
      document.getElementById("otherSide").style.marginLeft = "0px";
    }
  });
  // const handleLogout = (event) => {
  //   event.preventDefault()
  //   localStorage.removeItem('token')
  //   setUser(null)
  //   window.location = '/'
  // }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu 
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className="tap-bar">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>ข้อความ</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>การแจ้งเตือน</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>โปรไฟล์</p>
      </MenuItem>
    </Menu>
  );
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{ top: "40px", left: "-10px", }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("../profile");
        }}
      >
        โปรไฟล์
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("../user/surveylist");
        }}
      >
        การสำรวจของฉัน
      </MenuItem>
      {/* <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem> */}
    </Menu>
  );

  return (
    <div>
      <div id="sideNav" className="sidenav">
        <Link to="/">หน้าหลัก</Link>
        <Link to="/insert">ค้นหาข้อมูล</Link>
        <Link to="/edit">แก้ไข</Link>
      </div>
      <div id="topNav">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static"  style={{backgroundColor:'#025464'}}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                selected={selected}
                onClick={() => {
                  setSelected(!selected);
                }}
              >
                <MenuIcon />
              </IconButton>
              <Avatar sx={{ margin: "10px" }} src="/suratcity-logo.png">
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <h3
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                กองสารสนเทศภาษีและทะเบียนทรัพย์สิน
              </h3>
              {/* <Search>
            <SearchIconWrapper>
            <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={0} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={0} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </div>
    </div>
   
  );
}
