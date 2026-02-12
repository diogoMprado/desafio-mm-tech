import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toast = ({ message, severity = 'success', onClose, duration = 3000 }) => {
    return (
        <Snackbar
            open={!!message}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;