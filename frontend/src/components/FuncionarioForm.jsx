import React, {useState, useEffect} from "react";
import {cadastrarFuncionario, atualizarFuncionario} from "../services/api";

const FuncionarioForm = ({funcionario, onSave}) => {
    const [formData, setFormData] = useState({nome: '', email: '', telefone: ''});
    const [errors, setErrors] = useState([]);

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

        const promise = isEditing
            ? atualizarFuncionario(funcionario._id, formData)
            : cadastrarFuncionario(formData);

        promise
            .then(() => {
                alert(`Funcionario ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);
                onSave();
            })
            .catch((error) => {
                console.error('Erro ao salvar funcionário:', error);
                const errorData = error.response?.data?.erros;
                if (errorData) {
                    setErrors(errorData);
                } else {
                    alert('Ocorreu um erro ao salvar');
                }
            });
        }

    return(
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Editar Funcionário' : 'Novo Funcionário'}</h2>
            {errors.length > 0 && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
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
            <button type="submit">{isEditing ? 'Atualizar' : 'Salvar'}</button>
            {isEditing && <button type="button" onClick={() => onSave()}>Cancelar</button>}
        </form>
    );
};

export default FuncionarioForm;