import { useEffect } from "react"
import { Alert } from '@mui/material'
import { handleLogout } from "../utils/authHandlers"
export default function Banner({ error, setError, isLoggedIn, setIsLoggedIn, banner, setBanner }) {
    useEffect(() => {
        if (error) {
            if (error.logout) {
                handleLogout(isLoggedIn, setIsLoggedIn).then(() => { setTimeout(() => { return setError(false) }, (1000 * 60)) })
            } else {
                setTimeout(() => { return setError(false) }, (1000 * 60))
            }
        } else if (banner) {
            setTimeout(() => { return setError(false) }, (1000 * 60))
        }
    }, [])
    return (
        <>
            {error && <Alert severity="error">{error.message}</Alert>}
            {banner.login ? <Alert severity="success">{banner.login}</Alert> : (banner && <Alert severity="info">{banner}</Alert>)}
            {/* {banner && <Alert severity="info">{banner.login}</Alert>} */}
        </>
    )
}