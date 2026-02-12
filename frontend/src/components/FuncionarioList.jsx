import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    Skeleton,
    Alert,
    Stack,
    Chip,
} from '@mui/material';
import {
    Search,
    Edit,
    Delete,
    People,
    PersonOff,
} from '@mui/icons-material';
import { listarFuncionarios, deletarFuncionario } from '../services/api';
import Toast from './Toast';
import ConfirmDialog from './ConfirmDialog';

const FuncionarioList = ({ onEdit, onUpdate }) => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [funcionarioToDelete, setFuncionarioToDelete] = useState(null);
    const [toast, setToast] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setIsLoading(true);
        listarFuncionarios()
            .then((response) => {
                setFuncionarios(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Erro ao listar funcionários:', err);
                setError('Erro ao listar funcionários.');
                setIsLoading(false);
            });
    }, [onUpdate]);

    const filteredFuncionarios = funcionarios.filter((f) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            f.nome.toLowerCase().includes(searchLower) ||
            f.email.toLowerCase().includes(searchLower) ||
            f.telefone.includes(searchTerm)
        );
    });

    useEffect(() => {
        setPage(0);
    }, [searchTerm]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (id) => {
        setFuncionarioToDelete(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        if (funcionarioToDelete) {
            deletarFuncionario(funcionarioToDelete)
                .then(() => {
                    setFuncionarios((prev) =>
                        prev.filter((f) => f._id !== funcionarioToDelete)
                    );
                    setToast({
                        message: 'Funcionário excluído com sucesso!',
                        severity: 'success',
                    });
                })
                .catch((err) => {
                    console.error('Erro ao excluir funcionário:', err);
                    setToast({
                        message: 'Erro ao excluir funcionário.',
                        severity: 'error',
                    });
                })
                .finally(() => {
                    setShowConfirm(false);
                    setFuncionarioToDelete(null);
                });
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setFuncionarioToDelete(null);
    };

    const paginatedData = filteredFuncionarios.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const renderSkeleton = () => (
        <TableBody>
            {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell>
                        <Stack direction="row" spacing={1} justifyContent="center">
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="circular" width={40} height={40} />
                        </Stack>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );

    return (
        <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
                <Toast
                    message={toast?.message}
                    severity={toast?.severity}
                    onClose={() => setToast(null)}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <People color="primary" />
                        Lista de Funcionários
                        <Chip
                            label={filteredFuncionarios.length}
                            size="small"
                            color="primary"
                            sx={{ ml: 1 }}
                        />
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Buscar por nome, email ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 3 }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="action" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {error ? (
                    <Alert severity="error">{error}</Alert>
                ) : filteredFuncionarios.length === 0 && !isLoading ? (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 6,
                            color: 'text.secondary',
                        }}
                    >
                        <PersonOff sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                        <Typography variant="h6">
                            {searchTerm
                                ? 'Nenhum funcionário encontrado com esse termo de busca.'
                                : 'Nenhum funcionário cadastrado ainda. Adicione o primeiro!'}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Telefone</TableCell>
                                        <TableCell align="center">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                {isLoading ? (
                                    renderSkeleton()
                                ) : (
                                    <TableBody>
                                        {paginatedData.map((f) => (
                                            <TableRow key={f._id} hover>
                                                <TableCell>{f.nome}</TableCell>
                                                <TableCell>{f.email}</TableCell>
                                                <TableCell>{f.telefone}</TableCell>
                                                <TableCell align="center">
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        justifyContent="center"
                                                    >
                                                        <Tooltip title="Editar">
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => onEdit(f)}
                                                                size="small"
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Excluir">
                                                            <IconButton
                                                                color="error"
                                                                onClick={() => handleDelete(f._id)}
                                                                size="small"
                                                            >
                                                                <Delete />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={filteredFuncionarios.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 15, 25, 50]}
                            labelRowsPerPage="Itens por página:"
                            labelDisplayedRows={({ from, to, count }) =>
                                `${from}-${to} de ${count}`
                            }
                        />
                    </>
                )}

                <ConfirmDialog
                    isOpen={showConfirm}
                    message="Tem certeza que deseja excluir este funcionário?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    title="Confirmação de Exclusão"
                />
            </CardContent>
        </Card>
    );
};

export default FuncionarioList;