import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Stack,
    InputAdornment,
    Collapse,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
    Person,
    Email,
    Phone,
    Save,
    Edit,
    Cancel,
} from '@mui/icons-material';
import { cadastrarFuncionario, atualizarFuncionario } from '../services/api';
import { gradientBackground } from '../theme';
import { aplicarMascaraTelefone } from '../utils/formatters';
import Toast from './Toast';

const FuncionarioForm = ({ funcionario, onSave }) => {
    const [formData, setFormData] = useState({ nome: '', email: '', telefone: '' });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const isEditing = !!funcionario;

    useEffect(() => {
        if (isEditing) {
            setFormData({
                nome: funcionario.nome,
                email: funcionario.email,
                telefone: aplicarMascaraTelefone(funcionario.telefone),
            });
        } else {
            setFormData({ nome: '', email: '', telefone: '' });
        }
        setErrors([]);
    }, [funcionario?._id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'telefone') {
            setFormData((prev) => ({ ...prev, telefone: aplicarMascaraTelefone(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);
        const errosValidacao = validarCampos();
        if (errosValidacao.length > 0) {
            setErrors(errosValidacao);
            return;
        }
        setIsLoading(true);

        const dadosEnvio = {
            ...formData,
            telefone: formData.telefone.replace(/\D/g, ''),
        };

        const promise = isEditing
            ? atualizarFuncionario(funcionario._id, dadosEnvio)
            : cadastrarFuncionario(dadosEnvio);

        promise
            .then(() => {
                setToast({
                    message: `Funcionário ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`,
                    severity: 'success',
                });

                // Limpar formulário após cadastro
                if (!isEditing) {
                    setFormData({ nome: '', email: '', telefone: '' });
                    setErrors([]);
                }

                onSave();
            })
            .catch((error) => {
                console.error('Erro ao salvar funcionário:', error);
                const errorData = error.response?.data?.erros;
                if (errorData) {
                    setErrors(errorData);
                } else {
                    setToast({
                        message: 'Ocorreu um erro ao salvar',
                        severity: 'error',
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const validarCampos = () => {
        const novosErros = [];

        if (!formData.nome || formData.nome.trim().length < 2) {
            novosErros.push('Nome é obrigatório (mínimo 2 caracteres)');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            novosErros.push('Email inválido. Use o formato: exemplo@dominio.com');
        }

        const telefoneNumerico = formData.telefone.replace(/\D/g, '');
        if (telefoneNumerico.length !== 11) {
            novosErros.push('Telefone inválido. Deve conter 11 dígitos (DDD + 9 dígitos)');
        }

        return novosErros;
    };

    return (
        <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
                <Toast
                    message={toast?.message}
                    severity={toast?.severity}
                    onClose={() => setToast(null)}
                />

                <Typography
                    variant="h2"
                    sx={{
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {isEditing ? <Edit color="primary" /> : <Person color="primary" />}
                    {isEditing ? 'Editar Funcionário' : 'Novo Funcionário'}
                </Typography>

                <Collapse in={errors.length > 0}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                            Por favor, corrija os seguintes erros:
                        </Typography>
                        <Box component="ul" sx={{ m: 0, pl: 2 }}>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </Box>
                    </Alert>
                </Collapse>

                <Box component="form" onSubmit={handleSubmit} autoComplete="off">
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="nome"
                            placeholder="Nome do funcionário"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'transparent !important',
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="action" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="E-mail"
                            name="email"
                            type="text"
                            placeholder="funcionario@exemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'transparent !important',
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Telefone"
                            name="telefone"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'transparent !important',
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone color="action" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <Stack direction="row" spacing={2}>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isLoading}
                                loadingPosition="start"
                                startIcon={<Save />}
                                fullWidth
                                size="large"
                                sx={{
                                    background: gradientBackground,
                                    '&:hover': {
                                        background: gradientBackground,
                                        filter: 'brightness(1.1)',
                                    },
                                }}
                            >
                                {isEditing ? 'Atualizar' : 'Salvar'}
                            </LoadingButton>

                            {isEditing && (
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    onClick={() => onSave()}
                                    startIcon={<Cancel />}
                                    fullWidth
                                    size="large"
                                >
                                    Cancelar
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FuncionarioForm;