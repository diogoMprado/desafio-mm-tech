function errorHandler(err, req, res, _next) {
    console.error(`[ERRO] ${req.method} ${req.path}:`, err.message);
    res.status(500).json({ error: 'Erro interno do servidor', detalhes: err.message });
}

module.exports = errorHandler;
