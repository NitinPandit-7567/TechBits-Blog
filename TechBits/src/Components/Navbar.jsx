import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { clearData } from '../utils/UserData'
import { useState } from 'react'
import '../styles/navbar.css'
export default function Navbar({ setMode, mode, isLoggedIn, setIsLoggedIn }) {
    const location = window.location.pathname.split('/')[1];
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const AuthButtonsCheck = ((location !== 'Login' && location !== 'SignUp') && !isLoggedIn);
    const theme = mode[0].toUpperCase() + mode.slice(1,) + ' Mode ';
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (evt) => {
        setAnchorEl(null);
        if (evt.target.id === 'logout') {
            if (isLoggedIn) {
                setIsLoggedIn(login => {
                    clearData();
                    sessionStorage.removeItem('isLoggedIn')
                    return false
                })
            }
        }
    };
    function handleCollapse(evt) {
        const menuLinks = document.querySelector('.navlinks')
        const menuButtons = document.querySelector('.navButtons')
        menuLinks.classList.toggle('collapse')
        menuButtons.classList.toggle('collapse')
    }
    function getInitials() {
        if (isLoggedIn) {
            const user = JSON.parse(sessionStorage.getItem('user'))
            const fullName = (user.name).split(' ');
            return fullName[0][0] + fullName[fullName.length - 1][0];
        }
        else {
            return 'U'
        }
    }
    function handleTheme() {
        const switchMode = mode === 'light' ? 'dark' : 'light'
        setMode((currentMode) => { return switchMode });
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
                <Button href="#text-buttons">Home</Button>
                <Button href="#text-buttons">My Blogs</Button>
                <Button href="#text-buttons">All Blogs</Button>
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
                            <Avatar sx={{ width: 34, height: 34, padding: '3px' }}>{getInitials()}</Avatar>
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
