const Datastore = require('@seald-io/nedb');
const db = new Datastore({filename: 'funcionarios.db', autoload: true});

console.log('Iniciando limpeza de registros duplicados...\n');

db.find({}, (err, docs) => {
    if (err) {
        console.error('Erro ao buscar funcionários:', err);
        return;
    }

    console.log(`Total de registros no banco: ${docs.length}\n`);

    // Agrupar por email e telefone
    const registrosUnicos = new Map();
    const duplicados = [];

    docs.forEach(doc => {
        const chave = `${doc.email}-${doc.telefone}`;

        if (!registrosUnicos.has(chave)) {
            // Primeiro registro com este email+telefone
            registrosUnicos.set(chave, doc);
            console.log(`✓ Mantendo: ${doc.nome} (${doc.email} - ${doc.telefone})`);
        } else {
            // Registro duplicado
            duplicados.push(doc);
            console.log(`✗ Duplicado: ${doc.nome} (${doc.email} - ${doc.telefone}) - ID: ${doc._id}`);
        }
    });

    console.log(`\n--- RESUMO ---`);
    console.log(`Registros únicos: ${registrosUnicos.size}`);
    console.log(`Registros duplicados encontrados: ${duplicados.length}\n`);

    if (duplicados.length > 0) {
        console.log('Removendo duplicados...\n');

        let removidos = 0;
        duplicados.forEach(doc => {
            db.remove({_id: doc._id}, {}, (err, numRemoved) => {
                if (err) {
                    console.error(`Erro ao remover ${doc._id}:`, err);
                } else {
                    removidos++;
                    console.log(`✓ Removido: ${doc.nome} (ID: ${doc._id})`);

                    // Quando terminar de remover todos
                    if (removidos === duplicados.length) {
                        console.log(`\n✅ Limpeza concluída! ${removidos} registros duplicados foram removidos.`);
                        console.log(`\nVerificando resultado final...`);

                        db.find({}, (err, finalDocs) => {
                            console.log(`Total de registros após limpeza: ${finalDocs.length}\n`);
                            finalDocs.forEach(doc => {
                                console.log(`- ${doc.nome} | ${doc.email} | ${doc.telefone}`);
                            });
                            process.exit(0);
                        });
                    }
                }
            });
        });
    } else {
        console.log('✅ Não há duplicados para remover!\n');
        process.exit(0);
    }
});

