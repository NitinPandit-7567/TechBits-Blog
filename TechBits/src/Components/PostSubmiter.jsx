import { Button, ButtonGroup } from '@mui/material';
export default function PostSubmitter({ handleSubmit }) {
    return (
        <div className='postSubmitter'><ButtonGroup variant="outlined" aria-label="Basic button group" size="small" onClick={handleSubmit}>
            <Button color='success' id='published' type='submit'>Publish</Button>
            <Button color='warning' id='draft' type='submit'>Save as draft</Button>
        </ButtonGroup></div>)
}