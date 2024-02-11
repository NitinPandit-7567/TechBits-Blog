import { useState } from 'react'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField, Button, IconButton } from '@mui/material';
import Chip from '@mui/material/Chip';
export default function TagEditor({ tags, setTags }) {
    const [add, setAdd] = useState(false)
    function handleTag(evt) {
        if (evt.key === 'Enter') {
            const fieldValue = evt.target.value;
            console.log('Value: ', evt.target.value)
            setTags(currentTags => { currentTags.push(fieldValue); console.log(currentTags); return currentTags })
            setAdd(false)
        }
    }
    function handleDelete(el) {
        setTags(currentTags => { return currentTags.filter((e) => e !== el) })
    }
    return (<div className='tag'>
        <h3>Tags<LocalOfferIcon sx={{ fontSize: 15 }} /></h3>
        {tags.length > 0 && tags.map((el, i) => { return <Chip key={i} label={el} onDelete={() => { handleDelete(el) }} color="secondary" sx={{ marginRight: '10px' }} /> })}
        {add && <TextField id='tag' label='Tag' size="small" onKeyDown={handleTag} />}
        <IconButton onClick={(evt) => setAdd(addStatus => { return !addStatus })}>
            <AddCircleIcon color='primary' />
        </IconButton>
    </div>)
}