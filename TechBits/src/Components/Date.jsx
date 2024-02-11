import Chip from '@mui/material/Chip';
import convertDate from '../utils/convertDate';
export default function Date({ date }) {
    return (<div className='date'><Chip label={convertDate(date)} color="info" sx={{ marginRight: '10px', marginTop: '10px' }} variant='outlined' size="small" /></div>)
}