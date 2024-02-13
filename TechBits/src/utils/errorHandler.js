export default function errorHandler(res, setError) {
    if (res.error.status === 401) {
        if (res.error.message == 'Not Authorized') {
            res.error.message = 'You are not authorized to perform this acitivty.'
            setError(res.error)
            return '/'

        } else {
            res.error.logout = true;
            res.error.message = "You need to sign in to continue!"
            setError(res.error)
            return '/login'
        }
    }
    else {
        res.error.message = `${error.status}: ${error.message}`;
        setError(res.error);
        return '/'
    }
}