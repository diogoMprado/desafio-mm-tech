const db = require('../database');
const { validarFuncionario, verificarDuplicidade } = require('../validators/funcionarioValidator');

async function criar(req, res, next) {
    try {
        const { nome, email, telefone } = req.body;

        const validacao = validarFuncionario(nome, email, telefone);
        if (!validacao.valido) {
            return res.status(400).json({ erros: validacao.erros });
        }

        const errosDuplicidade = await verificarDuplicidade({ nome, email, telefone });
        if (errosDuplicidade) {
            return res.status(400).json({ erros: errosDuplicidade });
        }

        const newDoc = await db.insertAsync({ nome, email, telefone });
        return res.status(201).json(newDoc);
    } catch (err) {
        next(err);
    }
}

async function listar(req, res, next) {
    try {
        const docs = await db.findAsync({});
        return res.status(200).json(docs);
    } catch (err) {
        next(err);
    }
}

async function buscarPorId(req, res, next) {
    try {
        const doc = await db.findOneAsync({ _id: req.params.id });
        if (!doc) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        return res.status(200).json(doc);
    } catch (err) {
        next(err);
    }
}

async function atualizar(req, res, next) {
    try {
        const { id } = req.params;
        const { nome, email, telefone } = req.body;

        const validacao = validarFuncionario(nome, email, telefone);
        if (!validacao.valido) {
            return res.status(400).json({ erros: validacao.erros });
        }

        const errosDuplicidade = await verificarDuplicidade({ nome, email, telefone }, id);
        if (errosDuplicidade) {
            return res.status(400).json({ erros: errosDuplicidade });
        }

        const numReplaced = await db.updateAsync({ _id: id }, { $set: { nome, email, telefone } }, {});
        if (numReplaced === 0) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        return res.status(200).json({ message: 'Funcionário atualizado com sucesso' });
    } catch (err) {
        next(err);
    }
}

async function deletar(req, res, next) {
    try {
        const numRemoved = await db.removeAsync({ _id: req.params.id }, {});
        if (numRemoved === 0) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        return res.status(200).json({ message: 'Funcionário deletado com sucesso' });
    } catch (err) {
        next(err);
    }
}

module.exports = { criar, listar, buscarPorId, atualizar, deletar };
