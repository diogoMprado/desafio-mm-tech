import React, {useState, useEffect} from "react";
import {listarFuncionarios, deletarFuncionario} from "../services/api";
import Toast from "./Toast.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";

const FuncionarioList = ({onEdit, onUpdate}) => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [funcionarioToDelete, setFuncionarioToDelete] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        setIsLoading(true);
        listarFuncionarios()
            .then((response) => {
                setFuncionarios(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao listar funcionários:', error);
                setError('Erro ao listar funcionários.');
                setIsLoading(false);
            });
    }, [onUpdate]);

    // Filtrar funcionários com base no termo de busca
    const filteredFuncionarios = funcionarios.filter(f => {
        const searchLower = searchTerm.toLowerCase();
        return (
            f.nome.toLowerCase().includes(searchLower) ||
            f.email.toLowerCase().includes(searchLower) ||
            f.telefone.includes(searchTerm)
        );
    });

    // Calcular paginação
    const totalPages = Math.ceil(filteredFuncionarios.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFuncionarios.slice(indexOfFirstItem, indexOfLastItem);

    // Reset para página 1 quando buscar
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    const handleDelete = (id) => {
        setFuncionarioToDelete(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        if (funcionarioToDelete) {
            deletarFuncionario(funcionarioToDelete)
                .then(() => {
                    setFuncionarios(prev => prev.filter(f => f._id !== funcionarioToDelete));
                    setToastMessage('Funcionário excluído com sucesso!');
                })
                .catch((error) => {
                    console.error("Erro ao excluir funcionário:", error);
                    setToastMessage('Erro ao excluir funcionário.');
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

    if (isLoading) {
        return <p>Carregando funcionários...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2>Lista de Funcionários</h2>
                </div>

                {/* Campo de Busca */}
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por nome, email ou telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>
            <div>
                {filteredFuncionarios.length === 0 ? (
                    <p style={{textAlign: 'center', color: '#666', marginTop: '20px'}}>
                        {searchTerm
                            ? 'Nenhum funcionário encontrado com esse termo de busca.'
                            : 'Nenhum funcionário cadastrado ainda. Adicione o primeiro!'}
                    </p>
                ) : (
                    <>
                        <table border="1" style={{width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map(f => (
                                <tr key={f._id}>
                                    <td>{f.nome}</td>
                                    <td>{f.email}</td>
                                    <td>{f.telefone}</td>
                                    <td>
                                        <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                                            <button className="btn-edit" onClick={() => onEdit(f)}>
                                                ✏️ Editar
                                            </button>
                                            <button className="btn-delete" onClick={() => handleDelete(f._id)}>
                                                🗑️ Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/* Paginação */}
                        <div className="pagination">
                            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                <span>Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredFuncionarios.length)} de {filteredFuncionarios.length} funcionários</span>
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <label htmlFor="itemsPerPage" style={{fontSize: '14px', color: '#6b7280'}}>
                                        Itens por página:
                                    </label>
                                    <select
                                        id="itemsPerPage"
                                        value={itemsPerPage}
                                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                        className="items-per-page-select"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pagination-controls">
                                <button
                                    className="page-btn"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    ‹
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    className="page-btn"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    </>
                )}

                <ConfirmDialog
                    isOpen={showConfirm}
                    message="Tem certeza que deseja excluir este funcionário?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    title="Confirmação de Exclusão"
                />

                <Toast
                    message={toastMessage}
                    onClose={() => setToastMessage('')}
                />
            </div>
        </div>
    );
};

export default FuncionarioList;