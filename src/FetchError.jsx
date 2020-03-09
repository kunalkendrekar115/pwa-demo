import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default function FetchError({ onRetry, message }) {

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', width: '100%',
            justifyContent: 'center', alignItems: 'center', flexGrow: 1
        }}>
            <Typography variant="h6">
                {message}
            </Typography>
            <div style={{ marginTop: 12 }}>
                <Button variant="contained" color="primary" onClick={onRetry}>Retry</Button>
            </div>
        </div>
    )

}
