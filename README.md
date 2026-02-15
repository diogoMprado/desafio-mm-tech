# Sistema de Cadastro de Funcionários

Sistema CRUD completo para gerenciamento de cadastro de funcionários, desenvolvido como parte do desafio técnico MM Tech.

## Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **NeDB (@seald-io/nedb)** - Banco de dados NoSQL embutido (sem necessidade de instalação externa)
- **CORS** - Middleware para permitir requisições do frontend

### Frontend
- **React 19** - Biblioteca para interfaces de usuário
- **Vite** - Build tool moderna e rápida
- **Material UI (MUI)** - Biblioteca de componentes visuais
- **Axios** - Cliente HTTP para requisições à API
- **Vitest + React Testing Library** - Testes unitários e de componentes

## Estrutura do Projeto

```
desafio-mm-tech/
├── package.json              # Monorepo - scripts unificados
├── .env.example              # Variáveis de ambiente documentadas
├── .gitignore
├── README.md
├── server/
│   ├── package.json
│   ├── server.js             # Ponto de entrada do servidor
│   ├── database.js           # Configuração do NeDB
│   ├── controllers/
│   │   └── funcionariosController.js
│   ├── routes/
│   │   └── funcionarios.js
│   ├── validators/
│   │   └── funcionarioValidator.js
│   └── middlewares/
│       └── errorHandler.js
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── theme.js
        ├── components/
        │   ├── FuncionarioForm.jsx
        │   ├── FuncionarioList.jsx
        │   ├── ConfirmDialog.jsx
        │   └── Toast.jsx
        ├── services/
        │   └── api.js
        ├── utils/
        │   └── formatters.js
        └── test/
            ├── setup.js
            ├── formatters.test.js
            ├── ConfirmDialog.test.jsx
            └── Toast.test.jsx
```

## Como Executar o Projeto

### Pré-requisitos
- Node.js versão 18 ou superior
- npm

### Configuração de Ambiente (Opcional)
Copie o `.env.example` e ajuste conforme necessário:
```bash
cp .env.example .env
```

Variáveis disponíveis:
| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta do servidor backend |
| `VITE_API_URL` | `http://localhost:3000` | URL da API para o frontend |

### Opção 1: Execução Unificada (Recomendado)
```bash
# Na raiz do projeto
npm install           # Instala concurrently
npm run install:all   # Instala dependências do server e frontend
npm run dev           # Inicia ambos simultaneamente
```

### Opção 2: Execução Separada
```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev
# Servidor rodando em: http://localhost:3000

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
# Frontend disponível em: http://localhost:5173
```

## Funcionalidades

### CRUD Completo
- **Create** - Cadastrar novo funcionário (nome, email, telefone)
- **Read** - Listar todos os funcionários com busca e paginação
- **Update** - Editar dados de um funcionário existente
- **Delete** - Excluir funcionário com confirmação

### Validações (Frontend + Backend)
- **Nome**: mínimo 2 caracteres
- **Email**: formato válido com regex abrangente
- **Telefone**: 11 dígitos numéricos (DDD + número)
- **Duplicidade**: verificação de nome, email e telefone duplicados

### Experiência do Usuário
- Interface responsiva (mobile, tablet, desktop)
- Dark/Light mode com persistência em localStorage
- Máscara de telefone no formulário: `(XX) XXXXX-XXXX`
- Formatação de telefone na listagem
- Feedback visual durante operações (loading, skeleton, toasts)
- Confirmação antes de excluir
- Busca/filtro por nome, email ou telefone
- Paginação com controle de itens por página
- Estado vazio quando não há cadastros

## Testes

```bash
cd frontend
npm test          # Vitest em modo watch
npm run test:run  # Execução única
```

Testes implementados:
- **formatters.test.js** — Formatação e máscara de telefone (10 testes)
- **ConfirmDialog.test.jsx** — Renderização e interação do diálogo (5 testes)
- **Toast.test.jsx** — Renderização condicional de notificações (4 testes)

## Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/funcionarios` | Criar novo funcionário |
| `GET` | `/funcionarios` | Listar todos funcionários |
| `GET` | `/funcionarios/:id` | Buscar funcionário por ID |
| `PUT` | `/funcionarios/:id` | Atualizar funcionário |
| `DELETE` | `/funcionarios/:id` | Excluir funcionário |

### Exemplos de Resposta

**POST /funcionarios** (201)
```json
{ "_id": "abc123", "nome": "João Silva", "email": "joao@email.com", "telefone": "11987654321" }
```

**Erro de validação** (400)
```json
{ "erros": ["Nome é obrigatório (mínimo 2 caracteres)"] }
```

## Decisões Técnicas

### Por que NeDB?
- Requisito sugerido pelo desafio
- Zero configuração (não precisa instalar banco de dados separado)
- Sintaxe similar ao MongoDB (facilita migração futura)
- Perfeito para protótipos e aplicações pequenas

### Por que React + Vite?
- React é requisito do desafio
- Vite é mais rápido que Create React App
- Hot Module Replacement instantâneo
- Build otimizado para produção

### Por que Material UI?
- Biblioteca madura com componentes acessíveis prontos
- Sistema de tema robusto com suporte a dark/light mode
- Componentes responsivos nativamente
- Menor necessidade de CSS customizado

### Arquitetura do Backend
- Separação em camadas: routes → controllers → validators
- Middleware de erro centralizado
- Funções async/await para código limpo e legível
- Validação reutilizável entre create e update

### Por que Axios?
- API simples e intuitiva
- Interceptors para tratamento global de erros
- Transformação automática de JSON

---

Desenvolvido como parte do processo seletivo MM Tech.

> Este projeto foi desenvolvido com foco em demonstrar habilidades em desenvolvimento fullstack, boas práticas de código, arquitetura limpa e atenção à experiência do usuário.
