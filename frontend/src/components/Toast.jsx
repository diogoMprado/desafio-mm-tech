import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { gradientBackground } from '../theme';

const Toast = ({ message, severity = 'success', onClose, duration = 3000 }) => {
    // Usar gradiente customizado para sucesso, padrão MUI para outros
    const isSuccess = severity === 'success';

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
                sx={{
                    width: '100%',
                    ...(isSuccess && {
                        background: gradientBackground,
                        '& .MuiAlert-icon': {
                            color: 'white',
                        },
                    }),
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;