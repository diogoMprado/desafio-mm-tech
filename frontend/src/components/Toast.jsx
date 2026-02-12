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
            background: 'linear-gradient(135deg, #18959C 0%, #1E7FAC 50%, #4C5297 100%)',
            color: '#ffffff',
            border: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(76, 82, 151, 0.4)',
            zIndex: 1000
        }}>
            {message}
            <button onClick={onClose} style={{ marginLeft: '10px', cursor: 'pointer', color: '#fff', background: 'transparent', border: 'none', fontSize: '20px' }} >×</button>
        </div>
    );
};

export default Toast;