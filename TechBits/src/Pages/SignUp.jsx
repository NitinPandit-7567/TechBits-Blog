import { useState, useEffect } from "react";
import { Button, TextField, Alert, LinearProgress } from "@mui/material/";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PasswordInput from "../Components/PasswordInput";
import "../styles/signup.css";
import { handleSignUp } from "../utils/authHandlers";
import { useNavigate, Navigate } from "react-router-dom";
export default function SignUp({ isLoggedIn, setError }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    retypePassword: "",
    email: "",
  });
  const [validationError, setValidationError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const helperText = "Passwords do not match.";
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  useEffect(() => {
    //displaying validation error if passwords dont match
    if (
      formData.retypePassword !== "" &&
      formData.retypePassword !== formData.password
    ) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  }, [formData.retypePassword]);

  function handleFormChange(evt) {
    const field = evt.target.id;
    const value = evt.target.value;
    setFormData((currentData) => {
      return { ...currentData, [field]: value };
    });
  }
  return (
    <div className="signUpPage">
      <div className="signup">
        {isLoading && <LinearProgress />}
        <AppRegistrationIcon color="primary" fontSize="large" />
        <h1>Sign Up</h1>
        {validationError && (
          <>
            <Alert severity="error">
              Passwords do not match. Kindly re-enter the passwords.
            </Alert>{" "}
            <br />
          </>
        )}
        <form
          onSubmit={(evt) => {
            setIsLoading(true);
            handleSignUp(evt, formData, setIsLoading, setError).then((res) => {
              return navigate(res);
            });
          }}
        >
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            placeholder="First Name*"
            fullWidth
            value={formData.firstName}
            onChange={handleFormChange}
            required
          />
          <br />
          <br />
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            placeholder="Last Name*"
            fullWidth
            value={formData.lastName}
            onChange={handleFormChange}
            required
          />
          <br />
          <br />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            placeholder="Email*"
            fullWidth
            value={formData.email}
            onChange={handleFormChange}
            type="email"
            required
          />
          <br />
          <br />
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            placeholder="Username*"
            fullWidth
            value={formData.username}
            onChange={handleFormChange}
            required
          />
          <br />
          <br />
          <PasswordInput
            id="password"
            label="Password"
            value={formData.password}
            placeholder="Password"
            helperText={helperText}
            validationError={validationError}
            handleFormChange={handleFormChange}
            required
          />
          <br />
          <br />
          <PasswordInput
            id="retypePassword"
            label="Retype Password"
            value={formData.retypePassword}
            placeholder="Retype Password*"
            helperText={helperText}
            validationError={validationError}
            handleFormChange={handleFormChange}
            required
          />
          <br />
          <br />
          <Button variant="contained" fullWidth type="Submit">
            SIGN UP
          </Button>
          <br />
          <p>
            Already have an account? <a href="/Login">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}
