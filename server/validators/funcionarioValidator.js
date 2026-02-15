const db = require('../database');

function validarFuncionario(nome, email, telefone) {
    const erros = [];

    if (!nome || nome.trim().length < 2) {
        erros.push('Nome é obrigatório (mínimo 2 caracteres)');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        erros.push('Email inválido. Use o formato: exemplo@dominio.com');
    }

    const telefoneRegex = /^\d{11}$/;
    if (!telefone || !telefoneRegex.test(telefone)) {
        erros.push('Telefone inválido. Deve conter 11 dígitos (DDD + 9 dígitos)');
    }

    return { valido: erros.length === 0, erros };
}

async function verificarDuplicidade(dados, excludeId = null) {
    const { nome, email, telefone } = dados;
    const query = excludeId
        ? { $and: [{ _id: { $ne: excludeId } }, { $or: [{ nome }, { email }, { telefone }] }] }
        : { $or: [{ nome }, { email }, { telefone }] };

    const existingDoc = await db.findOneAsync(query);

    if (!existingDoc) return null;

    const erros = [];
    if (existingDoc.nome === nome) {
        erros.push(`Já existe ${excludeId ? 'outro ' : ''}funcionário cadastrado com este nome`);
    }
    if (existingDoc.email === email) {
        erros.push(`Já existe ${excludeId ? 'outro ' : ''}funcionário cadastrado com este email`);
    }
    if (existingDoc.telefone === telefone) {
        erros.push(`Já existe ${excludeId ? 'outro ' : ''}funcionário cadastrado com este telefone`);
    }
    return erros;
}

module.exports = { validarFuncionario, verificarDuplicidade };
