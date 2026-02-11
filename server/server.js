const Datastore = require('@seald-io/nedb');
const express = require('express');
const cors = require('cors');
const app = express();
const db = new Datastore({filename: 'funcionarios.db', autoload: true});

app.use(cors());
app.use(express.json());

function validarFuncionario(nome, email, telefone) {
    const erros = [];

    if (!nome || nome.trim().length < 2) {
        erros.push('Nome é obrigatório (mínimo 2 caracteres)');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        erros.push('Email inválido');
    }

    const telefoneRegex = /^\d{8,}$/;
    if (!telefone || !telefoneRegex.test(telefone)) {
        erros.push('Telefone inválido (mínimo 8 dígitos numéricos)');
    }

    return {valido: erros.length === 0, erros};
}

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, req.body);
    next();
});

app.post('/funcionarios', (req, res) => {
    const {nome, email, telefone} = req.body;
    console.log('Dados recebidos:', {nome, email, telefone}); // Debug

    const validacao = validarFuncionario(nome, email, telefone);
    if (!validacao.valido) {
        console.log('Validação falhou:', validacao.erros);
        return res.status(400).json({erros: validacao.erros});
    }

    // Verificar se já existe funcionário com o mesmo email ou telefone
    db.findOne({$or: [{email: email}, {telefone: telefone}]}, (err, existingDoc) => {
        if (err) {
            console.error('ERRO ao verificar duplicação:', err);
            return res.status(500).json({error: 'Erro ao verificar funcionário', detalhes: err.message});
        }

        if (existingDoc) {
            const erros = [];
            if (existingDoc.email === email) {
                erros.push('Já existe um funcionário cadastrado com este email');
            }
            if (existingDoc.telefone === telefone) {
                erros.push('Já existe um funcionário cadastrado com este telefone');
            }
            console.log('Duplicação detectada:', erros);
            return res.status(400).json({erros});
        }

        // Se não existe duplicação, inserir o funcionário
        const funcionario = {nome, email, telefone};
        db.insert(funcionario, (err, newDoc) => {
            if (err) {
                console.error('ERRO DB INSERT:', err);
                return res.status(500).json({error: 'Erro ao salvar funcionário', detalhes: err.message});
            }
            console.log('Funcionário salvo:', newDoc);
            return res.status(201).json(newDoc);
        });
    });
});


app.get('/funcionarios', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            return res.status(500).send('Erro ao buscar funcionários');
        }
        return res.status(200).json(docs);
    });
});

app.get('/funcionarios/:id', (req, res) => {
    const id = req.params.id;
    db.findOne({_id: id}, (err, doc) => {
        if (err) {
            console.error('Erro ao buscar funcionário no banco de dados:', err);
            res.status(500).send('Erro ao buscar funcionário');
        } else if (!doc) {
            res.status(404).send('Funcionário não encontrado');
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put('/funcionarios/:id', (req, res) => {
    const id = req.params.id;
    const {nome, email, telefone} = req.body;

    const validacao = validarFuncionario(nome, email, telefone);
    if (!validacao.valido) {
        return res.status(400).json({erros: validacao.erros});
    }

    // Verificar se já existe outro funcionário com o mesmo email ou telefone
    db.findOne({
        $and: [
            {_id: {$ne: id}}, // Diferente do ID atual
            {$or: [{email: email}, {telefone: telefone}]}
        ]
    }, (err, existingDoc) => {
        if (err) {
            console.error('ERRO ao verificar duplicação:', err);
            return res.status(500).json({error: 'Erro ao verificar funcionário', detalhes: err.message});
        }

        if (existingDoc) {
            const erros = [];
            if (existingDoc.email === email) {
                erros.push('Já existe outro funcionário cadastrado com este email');
            }
            if (existingDoc.telefone === telefone) {
                erros.push('Já existe outro funcionário cadastrado com este telefone');
            }
            console.log('Duplicação detectada na atualização:', erros);
            return res.status(400).json({erros});
        }

        // Se não existe duplicação, atualizar o funcionário
        db.update({_id: id}, {$set: {nome, email, telefone}}, {}, (err, numReplaced) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar funcionário');
            }
            if (numReplaced === 0) {
                return res.status(404).send('Funcionário não encontrado');
            }
            res.status(200).json({message: 'Funcionário atualizado com sucesso'});
        });
    });
});

app.delete('/funcionarios/:id', (req, res) => {
    const id = req.params.id;
    db.remove({_id: id}, {}, (err, numRemoved) => {
        if (err) {
            console.error('Erro ao deletar funcionário no banco de dados:', err);
            res.status(500).send('Erro ao deletar funcionário');
        } else if (numRemoved === 0) {
            res.status(404).send('Funcionário não encontrado');
        } else {
            res.status(200).json({message: 'Funcionário deletado com sucesso'});
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});
