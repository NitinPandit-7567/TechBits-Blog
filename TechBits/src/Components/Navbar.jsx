import { Button, Menu, MenuItem, IconButton, Avatar, Tooltip, Divider } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { handleLogout } from '../utils/handleLogout'
import { getUserData } from '../utils/UserData';
import getInitials from '../utils/getInitials';
import { useState } from 'react'
import '../styles/navbar.css'
export default function Navbar({ setMode, mode, isLoggedIn, setIsLoggedIn }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const location = window.location.pathname.split('/')[1];
    const AuthButtonsCheck = ((location !== 'Login' && location !== 'SignUp') && !isLoggedIn);
    const theme = mode[0].toUpperCase() + mode.slice(1,) + ' Mode ';

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = async (evt) => {
        setAnchorEl(null);
        if (evt.target.id === 'logout') {
            handleLogout(isLoggedIn, setIsLoggedIn)
        }
    };

    function handleCollapse(evt) {
        const menuLinks = document.querySelector('.navlinks')
        const menuButtons = document.querySelector('.navButtons')
        menuLinks.classList.toggle('collapse')
        menuButtons.classList.toggle('collapse')
    }

    function getAvatarData() {
        if (isLoggedIn) {
            return getInitials(getUserData())
        }
        else {
            return 'U'
        }

    }

    function handleTheme() {
        const switchMode = mode === 'light' ? 'dark' : 'light'
        setMode(switchMode);
        return localStorage.setItem('theme', switchMode)
    }

    return (
        <div className="navbar" >
            <div className="logo">
                <a>TechBits</a>
            </div>
            <div className="navToggler">
                <IconButton onClick={handleCollapse}><MenuIcon fontSize='large' /></IconButton>
            </div>
            <div className="navlinks">
                <Button href="/">Home</Button>
                {/* <Button href="#text-buttons">All Blogs</Button> */}
                {isLoggedIn && <Button href="#text-buttons">My Posts</Button>}
                {isLoggedIn && <Button href="/create">Write</Button>}
                <Button href="#text-buttons">About</Button>
            </div>

            <div className="navButtons">
                <div className="themeToggler">
                    <Tooltip title={theme}>
                        <IconButton onClick={handleTheme}>
                            {mode === 'light' ? <LightModeOutlinedIcon /> : <DarkModeIcon />}
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="authButtons">
                    {AuthButtonsCheck && <Button color="inherit" href="/Login">Login</Button>}
                    {AuthButtonsCheck && <Button color="inherit" href='/SignUp'>Create account</Button>}
                    {/* Profile options */}
                    {isLoggedIn && <div>
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <Avatar sx={{ width: 34, height: 34, padding: '3px' }}>{getAvatarData()}</Avatar>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose} id='profile'><Avatar size='small' sx={{ marginRight: '5px', width: 24, height: 24 }} /> My account</MenuItem>
                            <Divider variant="middle" component="li" />
                            <MenuItem onClick={handleClose} id='logout'><LogoutIcon sx={{ marginRight: '5px' }} />Logout</MenuItem>
                        </Menu>
                    </div>}
                </div>
            </div>
        </div>
    )
}
