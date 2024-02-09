import { useState } from 'react'
import { TextField, Button, Alert } from '@mui/material';
import { Lock, VpnKey } from '@mui/icons-material';
import { setData } from '../utils/UserData'
import PasswordInput from '../Components/PasswordInput';
import { useNavigate } from 'react-router-dom'
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

    async function handleSubmit(e) {
        e.preventDefault();
        const loginResponse = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const res = await loginResponse.json();
        if (res.error) {
            setValidationError(error => { return true })
        }
        else {
            if (validationError) {
                setValidationError(error => { return false })
            }
            setData(res)
            setIsLoggedIn(login => {
                sessionStorage.setItem('isLoggedIn', true);
                return true;
            })
            return navigate('/')
        }
    }

    return (
        <>
            <div className="login">
                <Lock color="primary" fontSize="large" />
                <h1>Sign In</h1>
                {validationError && <><Alert severity="error">Invalid Username/Password.</Alert> <br /></>}
                <form onSubmit={handleSubmit}>
                    <TextField id="username" label="Username" variant="outlined" placeholder='Username*' fullWidth value={formData.username} onChange={handleFormChange} helperText={validationError ? helperText : ''} error={validationError} />
                    <br />
                    <br />
                    <PasswordInput id="password" label="Password" value={formData.password} placeholder='Password' helperText={helperText} validationError={validationError} handleFormChange={handleFormChange} />
                    <br />
                    <br />
                    <Button variant="contained" fullWidth type='Submit'><VpnKey fontSize='small' sx={{ marginRight: '5px' }} />SIGN IN</Button>
                    <p>Dont have an account? <a href='/SignUp'>SignUp!</a></p>
                </form>
            </div></>)
}