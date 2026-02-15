import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const listarFuncionarios = () => api.get('/funcionarios');
export const buscarFuncionario = (id) => api.get(`/funcionarios/${id}`);
export const cadastrarFuncionario = (funcionario) => api.post('/funcionarios', funcionario);
export const atualizarFuncionario = (id, funcionario) => api.put(`/funcionarios/${id}`, funcionario);
export const deletarFuncionario = (id) => api.delete(`/funcionarios/${id}`);

