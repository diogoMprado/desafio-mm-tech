const express = require('express');
const cors = require('cors');
const funcionariosRoutes = require('./routes/funcionarios');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares globais ---
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// --- Rotas ---
app.use('/funcionarios', funcionariosRoutes);

// --- Middleware de erro global ---
app.use(errorHandler);

// --- Inicialização ---
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
