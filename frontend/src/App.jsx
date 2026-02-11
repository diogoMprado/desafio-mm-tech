import React, {useState} from 'react';
import FuncionarioList from './components/FuncionarioList';
import FuncionarioForm from './components/FuncionarioForm';
import './App.css';

function App() {
    const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState(null);
    const [update, setUpdate] = useState(0);

    const handleEdit = (funcionario) => {
        setFuncionarioEmEdicao(funcionario);
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
                    <FuncionarioForm
                        funcionario={funcionarioEmEdicao}
                        onSave={handleSave}
                    />
                </div>
                <div className="list-container">
                    <FuncionarioList
                        onEdit={handleEdit}
                        onUpdate={update}
                    />
                </div>
            </div>
        </div>
    )
        ;
}

export default App;