import React, { useState, useEffect} from "react";
import { listarFuncionarios, deletarFuncionario } from "../services/api";

const FuncionarioList = ({ onEdit, onUpdate}) => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        listarFuncionarios()
        .then((response) => {
            setFuncionarios(response.data);
        })
        .catch((error) => {
            console.error('Erro ao listar funcionários:', error);
            setError('Erro ao listar funcionários.');
        });
    }, [onUpdate]);

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este funcionário?')){
            deletarFuncionario(id)
            .then(() => {
                alert('Funcionário excluído com sucesso!');
                onUpdate();
            })
            .catch((error) => {
                console.error("Erro ao excluir funcionário:", error);
                alert('Erro ao excluir funcionário.');
            });
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Lista de Funcionários</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map(f => (
                         <tr key={f._id}>
                                <td>{f.nome}</td>
                                <td>{f.email}</td>
                                <td>{f.telefone}</td>
                                <td>
                                    <button onClick={() => onEdit(f)}>Editar</button>
                                    <button onClick={() => handleDelete(f._id)}>Excluir</button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FuncionarioList;