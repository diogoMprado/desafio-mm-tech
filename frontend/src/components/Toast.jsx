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
            background: '#333',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '4px',
            zIndex: 1000
        }}>
            {message}
            <button onClick={onClose} style={{ marginLeft: '10px', cursor: 'pointer' }}>×</button>

        </div>
    );
};

export default Toast;