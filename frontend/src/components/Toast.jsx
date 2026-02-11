import React, { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [message, onClose, duration]);

    if (!message) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#d57a7a',
            color: '#ffffff',
            border: '1px solid #d57a7a',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '12px 24px',
            borderRadius: '4px',
            zIndex: 1000
        }}>
            {message}
            <button onClick={onClose} style={{ marginLeft: '10px', cursor: 'pointer', color: '#fff' }} >×</button>
        </div>
    );
};

export default Toast;