import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Box,
    IconButton,
    Tooltip,
    CircularProgress,
    useMediaQuery,
} from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import FuncionarioList from './components/FuncionarioList';
import FuncionarioForm from './components/FuncionarioForm';
import { buscarFuncionario } from './services/api';
import { createAppTheme } from './theme';

const THEME_STORAGE_KEY = 'mm-tech-theme-mode';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem(THEME_STORAGE_KEY);
        return savedMode || (prefersDarkMode ? 'dark' : 'light');
    });

    const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState(null);
    const [update, setUpdate] = useState(0);
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const handleEdit = (funcionario) => {
        setIsLoadingEdit(true);
        buscarFuncionario(funcionario._id)
            .then((response) => {
                setFuncionarioEmEdicao(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar funcionário:', error);
                setFuncionarioEmEdicao(funcionario);
            })
            .finally(() => {
                setIsLoadingEdit(false);
            });
    };

    const handleSave = () => {
        setFuncionarioEmEdicao(null);
        setUpdate((u) => u + 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <AppBar position="static" elevation={0}>
                    <Toolbar
                        sx={{
                            justifyContent: 'space-between',
                            px: { xs: 1, sm: 2 },
                            py: { xs: 1, sm: 1.5 },
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 1, sm: 2 },
                            flex: 1,
                            minWidth: 0,
                        }}>
                            <Box
                                component="img"
                                src="/mm-logo.svg"
                                alt="MM Logo"
                                sx={{
                                    height: { xs: 32, sm: 40, md: 48 },
                                    flexShrink: 0,
                                }}
                            />
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '0.95rem', sm: '1.25rem', md: '1.5rem' },
                                    fontWeight: 700,
                                    color: 'white',
                                    whiteSpace: { xs: 'nowrap', sm: 'normal' },
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                Gestão de Funcionários
                            </Typography>
                        </Box>
                        <Tooltip title={mode === 'light' ? 'Modo escuro' : 'Modo claro'}>
                            <IconButton
                                onClick={toggleTheme}
                                sx={{
                                    color: 'white',
                                    ml: 1,
                                    flexShrink: 0,
                                }}
                                aria-label="Alternar tema"
                            >
                                {mode === 'light' ? <DarkMode /> : <LightMode />}
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>

                <Container
                    maxWidth="xl"
                    sx={{
                        py: { xs: 2, sm: 3, md: 4 },
                        px: { xs: 1, sm: 2, md: 3 },
                    }}
                >
                    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                        <Grid size={{ xs: 12, lg: 4 }}>
                            {isLoadingEdit ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        py: 8,
                                        bgcolor: 'background.paper',
                                        borderRadius: 2,
                                    }}
                                >
                                    <CircularProgress color="primary" />
                                    <Typography sx={{ mt: 2 }} color="text.secondary">
                                        Carregando dados do funcionário...
                                    </Typography>
                                </Box>
                            ) : (
                                <FuncionarioForm
                                    funcionario={funcionarioEmEdicao}
                                    onSave={handleSave}
                                />
                            )}
                        </Grid>
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <FuncionarioList onEdit={handleEdit} onUpdate={update} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;