import { useState } from 'react'
import { TextField, Button, Alert } from '@mui/material';
import { Lock, VpnKey } from '@mui/icons-material';
import { setUserData } from '../utils/UserData'
import PasswordInput from '../Components/PasswordInput';
import { useNavigate } from 'react-router-dom'
import { handleLogIn } from '../utils/authHandlers'
import '../styles/login.css'

export default function Login({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [validationError, setValidationError] = useState(false)
    const navigate = useNavigate()
    const helperText = 'Incorrect Username/Password';

    function handleFormChange(evt) {
        const field = evt.target.id
        const value = evt.target.value;
        setFormData(currentData => { return { ...formData, [field]: value } })
    }

    return (
        <div className='loginPage'>
            <div className="login">
                <Lock color="primary" fontSize="large" />
                <h1>Sign In</h1>
                {validationError && <><Alert severity="error">Invalid Username/Password.</Alert> <br /></>}
                <form onSubmit={(evt) => {
                    handleLogIn(evt, formData).then((res) => {
                        if (res.error) {
                            setValidationError(true)
                        }
                        else {
                            if (validationError) {
                                setValidationError(false)
                            }
                            setUserData(res)
                            setIsLoggedIn(login => {
                                localStorage.setItem('isLoggedIn', true);
                                return true;
                            })
                            return navigate('/')
                        }
                    })
                }}>
                    <TextField id="username" label="Username" variant="outlined" placeholder='Username*' fullWidth value={formData.username} onChange={handleFormChange} helperText={validationError ? helperText : ''} error={validationError} />
                    <br />
                    <br />
                    <PasswordInput id="password" label="Password" value={formData.password} placeholder='Password' helperText={helperText} validationError={validationError} handleFormChange={handleFormChange} />
                    <br />
                    <br />
                    <Button variant="contained" fullWidth type='Submit'><VpnKey fontSize='small' sx={{ marginRight: '5px' }} />SIGN IN</Button>
                    <p>Dont have an account? <a href='/SignUp'>SignUp!</a></p>
                </form>
            </div></div>)
}