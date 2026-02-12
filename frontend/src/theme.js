import { createTheme, alpha } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#1E7FAC',
      light: '#18959C',
      dark: '#4C5297',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#673486',
      light: '#8B5CAF',
      dark: '#4A2461',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'light' ? '#d3d4d8' : '#514f4f',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#1a1a2e' : '#ffffff',
      secondary: mode === 'light' ? '#6b7280' : '#b0b0b0',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    divider: mode === 'light' ? '#e5e7eb' : '#333333',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ...Array(18).fill('none'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha('#1E7FAC', 0.3),
            borderRadius: '4px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.95rem',
        },
        contained: {
          boxShadow: '0 4px 14px 0 rgba(30, 127, 172, 0.39)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(30, 127, 172, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'transparent',
            '& fieldset': {
              borderColor: mode === 'light' ? '#e5e7eb' : '#444444',
            },
            '&:hover fieldset': {
              borderColor: '#1E7FAC',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1E7FAC',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: mode === 'light' ? '#6b7280' : '#b0b0b0',
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            padding: '0 4px',
            '&.Mui-focused': {
              color: '#1E7FAC',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: mode === 'light' ? '#1a1a2e' : '#ffffff',
            // Remover background do autofill do navegador
            '&:-webkit-autofill': {
              WebkitBoxShadow: mode === 'light'
                ? '0 0 0 100px #ffffff inset'
                : '0 0 0 100px #1e1e1e inset',
              WebkitTextFillColor: mode === 'light' ? '#1a1a2e' : '#ffffff',
              caretColor: mode === 'light' ? '#1a1a2e' : '#ffffff',
            },
            '&:-webkit-autofill:hover': {
              WebkitBoxShadow: mode === 'light'
                ? '0 0 0 100px #ffffff inset'
                : '0 0 0 100px #1e1e1e inset',
            },
            '&:-webkit-autofill:focus': {
              WebkitBoxShadow: mode === 'light'
                ? '0 0 0 100px #ffffff inset'
                : '0 0 0 100px #1e1e1e inset',
            },
          },
          '& .MuiInputAdornment-root': {
            color: mode === 'light' ? '#6b7280' : '#b0b0b0',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&.Mui-focused': {
            backgroundColor: 'transparent',
          },
        },
        notchedOutline: {
          borderColor: mode === 'light' ? '#e5e7eb' : '#444444',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: mode === 'light' ? '#f8fafc' : '#2d2d2d',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: mode === 'light'
              ? alpha('#1E7FAC', 0.04)
              : alpha('#1E7FAC', 0.08),
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #18959C 0%, #1E7FAC 50%, #4C5297 100%)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));

export const gradientBackground = 'linear-gradient(135deg, #18959C 0%, #1E7FAC 50%, #4C5297 100%)';

