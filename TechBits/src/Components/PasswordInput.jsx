import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material/";
export default function PasswordInput({
  id,
  label,
  variant,
  placeholder,
  helperText,
  validationError,
  value,
  handleFormChange,
}) {
  const [showPassword, setShowPassword] = useState(false);
  function handleShowPassword() {
    setShowPassword((show) => {
      return !show;
    });
  }
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={handleFormChange}
      helperText={validationError ? helperText : ""}
      error={validationError}
    />
  );
}
