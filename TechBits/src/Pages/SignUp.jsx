import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material/';
import { setUserData } from '../utils/UserData'
import Alert from '@mui/material/Alert';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PasswordInput from '../Components/PasswordInput';
import '../styles/signup.css'
import { handleSignUp } from '../utils/authHandlers';
import { useNavigate } from 'react-router-dom'
export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', username: '', password: '', retypePassword: '', email: '' })
    const [validationError, setValidationError] = useState(false)
    const helperText = 'Passwords do not match.';
    useEffect(() => {
        if (formData.retypePassword !== '' && formData.retypePassword !== formData.password) {
            setValidationError(true)
        } else {
            setValidationError(false)
        }
    }, [formData.retypePassword])
    function handleFormChange(evt) {
        const field = evt.target.id
        const value = evt.target.value;
        setFormData(currentData => { return { ...currentData, [field]: value } })
    }
    return (
        <div className='signUpPage'>
            <div className="signup">
                <AppRegistrationIcon color="primary" fontSize="large" />
                <h1>Sign Up</h1>
                {validationError && <><Alert severity="error">Passwords do not match. Kindly re-enter the passwords.</Alert> <br /></>}
                <form onSubmit={(evt) => {
                    handleSignUp(evt, formData).then((res) => {
                        if (!res.error) {
                            setUserData(res)
                            localStorage.setItem('isLoggedIn', true)
                            return navigate('/')
                        }
                    })
                }}>
                    <TextField id="firstName" label="First Name" variant="outlined" placeholder='First Name*' fullWidth value={formData.firstName} onChange={handleFormChange} />
                    <br />
                    <br />
                    <TextField id="lastName" label="Last Name" variant="outlined" placeholder='Last Name*' fullWidth value={formData.lastName} onChange={handleFormChange} />
                    <br />
                    <br />
                    <TextField id="email" label="Email" variant="outlined" placeholder='Email*' fullWidth value={formData.email} onChange={handleFormChange} type="email" />
                    <br />
                    <br />
                    <TextField id="username" label="Username" variant="outlined" placeholder='Username*' fullWidth value={formData.username} onChange={handleFormChange} />
                    <br />
                    <br />
                    <PasswordInput id="password" label="Password" value={formData.password} placeholder='Password' helperText={helperText} validationError={validationError} handleFormChange={handleFormChange} />
                    <br />
                    <br />
                    <PasswordInput id="retypePassword" label="Retype Password" value={formData.retypePassword} placeholder='Retype Password*' helperText={helperText} validationError={validationError} handleFormChange={handleFormChange} />
                    <br />
                    <br />
                    <Button variant="contained" fullWidth type='Submit'>SIGN UP</Button>
                    <br />
                    <p>Already have an account? <a href="/Login">Sign In</a></p>
                </form>
            </div>
        </div>)
}