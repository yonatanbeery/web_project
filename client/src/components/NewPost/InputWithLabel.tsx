import Typography from '@mui/material/Typography';
import { ReactNode } from 'react'
import './input.css'

interface InputWithLabelProps {
    title: string;
    children: ReactNode;
}

const InputWithTitle = (props: InputWithLabelProps) => {
    const { title, children } = props;

    return (
        <div className='input'>
            <Typography variant="h5" color="text.secondary" sx={{marginRight: '22px'}}>
                {title}
            </Typography>
            {children}
        </div>
    )
}

export default InputWithTitle