import React, {useState} from 'react';
import FuncionarioList from './components/FuncionarioList';
import FuncionarioForm from './components/FuncionarioForm';
import {buscarFuncionario} from './services/api';
import './App.css';

function App() {
    const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState(null);
    const [update, setUpdate] = useState(0);
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);

    const handleEdit = (funcionario) => {
        setIsLoadingEdit(true);
        buscarFuncionario(funcionario._id)
            .then((response) => {
                setFuncionarioEmEdicao(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar funcionário:', error);
                // Fallback: usar dados da lista se a busca falhar
                setFuncionarioEmEdicao(funcionario);
            })
            .finally(() => {
                setIsLoadingEdit(false);
            });
    };

    const handleSave = () => {
        setFuncionarioEmEdicao(null);
        setUpdate(u => u + 1);
    };

    return (
        <div className="App">
            <div className="header">
                <div className="header-content">
                    <img src="/mm-logo.svg" alt="MM Logo" className="logo" />
                    <div className="header-text">
                        <h1>Gestão de Funcionários</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="form-container">
                    {isLoadingEdit ? (
                        <div style={{textAlign: 'center', padding: '40px'}}>
                            <p>Carregando dados do funcionário...</p>
                        </div>
                    ) : (
                        <FuncionarioForm
                            funcionario={funcionarioEmEdicao}
                            onSave={handleSave}
                        />
                    )}
                </div>
                <div className="list-container">
                    <FuncionarioList
                        onEdit={handleEdit}
                        onUpdate={update}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;