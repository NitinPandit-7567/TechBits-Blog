import { useEffect } from "react";
import { Alert } from "@mui/material";
import { handleLogout } from "../utils/authHandlers";
export default function Banner({
  error,
  setError,
  isLoggedIn,
  setIsLoggedIn,
  banner,
  setBanner,
}) {
  const delay = 1000 * 10;
  //setting a timeout to reset notification banner and errr banners
  useEffect(() => {
    if (error) {
      if (error.logout) {
        handleLogout(isLoggedIn, setIsLoggedIn).then(() => {
          setTimeout(() => {
            setError(false);
          }, delay);
        });
      } else {
        setTimeout(() => {
          setError(false);
        }, delay);
      }
    } else if (banner) {
      setTimeout(() => {
        setBanner(false);
      }, delay);
    }
  }, []);
  return (
    <>
      {/* Banner components to display notifications */}
      {error && <Alert severity="error">{error.message}</Alert>}
      {banner.login ? (
        <Alert severity="success">{banner.login}</Alert>
      ) : (
        banner && <Alert severity="info">{banner}</Alert>
      )}
    </>
  );
}
