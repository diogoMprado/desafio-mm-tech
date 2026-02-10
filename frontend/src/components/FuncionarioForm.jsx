import React, {useState, useEffect} from "react";
import {cadastrarFuncionario, atualizarFuncionario} from "../services/api";
import Toast from './Toast';

const FuncionarioForm = ({funcionario, onSave}) => {
    const [formData, setFormData] = useState({nome: '', email: '', telefone: ''});
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const isEditing = !!funcionario;

    useEffect(() => {
        if (isEditing) {
            setFormData({
                nome: funcionario.nome,
                email: funcionario.email,
                telefone: funcionario.telefone,
            });
        } else {
            setFormData({nome: '', email: '', telefone: ''});
        }
        setErrors([]);
    }, [funcionario]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
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
            telefone: formData.telefone.replace(/\D/g, '')
        };

        const promise = isEditing
            ? atualizarFuncionario(funcionario._id, dadosEnvio)
            : cadastrarFuncionario(dadosEnvio);

        promise
            .then(() => {
                setToast(`Funcionario ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);
                onSave();
            })
            .catch((error) => {
                console.error('Erro ao salvar funcionário:', error);
                const errorData = error.response?.data?.erros;
                if (errorData) {
                    setErrors(errorData);
                } else {
                    setToast('Ocorreu um erro ao salvar');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const validarCampos = () => {
        const novosErros = [];

        if (!formData.nome || formData.nome.trim().length < 2) {
            novosErros.push('Nome é obrigatório (mínimo 2 caracteres)');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            novosErros.push('Email inválido');
        }

        const telefoneNumerico = formData.telefone.replace(/\D/g, '');
        if (telefoneNumerico.length < 8) {
            novosErros.push('Telefone inválido (mínimo 8 dígitos)');
        }

        return novosErros;
    };

    return (
        <form onSubmit={handleSubmit}>
            <Toast message={toast} onClose={() => setToast(null)} />
            <h2>{isEditing ? 'Editar Funcionário' : 'Novo Funcionário'}</h2>
            {errors.length > 0 && (
                <div style={{color: 'red', marginBottom: '10px'}}>
                    <strong>Por favor, corrija os seguintes erros:</strong>
                    <ul>
                        {errors.map((error, index) =>
                            <li key={index}>{error}</li>
                        )}
                    </ul>
                </div>
            )}
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Telefone:</label>
                <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Salvar')} </button>
            {isEditing && <button type="button" onClick={() => onSave()}>Cancelar</button>}
        </form>
    );
};

export default FuncionarioForm;