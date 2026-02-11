# Sistema de Cadastro de Funcionários

Sistema CRUD completo para gerenciamento de cadastro de funcionários, desenvolvido como parte do desafio técnico MM Tech.

## Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **NeDB** - Banco de dados NoSQL embutido (sem necessidade de instalação externa)
- **CORS** - Middleware para permitir requisições do frontend

### Frontend
- **React 19** - Biblioteca para interfaces de usuário
- **Vite** - Build tool moderna e rápida
- **Axios** - Cliente HTTP para requisições à API
- **CSS3** - Estilização customizada

## Como Executar o Projeto

### Pré-requisitos
- Node.js versão 16 ou superior
- npm ou yarn

### Passo 1: Instalar Dependências

**Backend:**
```
powershell
cd server
npm install
Frontend:
cd frontend
npm install
```


### Passo 2: Executar o Projeto
```
Terminal 1 - Iniciar Backend:
cd server
node server.js
O servidor estará rodando em: http://localhost:3000

Terminal 2 - Iniciar Frontend:
cd frontend
npm run dev
O frontend estará disponível em: http://localhost:5173 (ou outra porta indicada pelo Vite)
```

### Funcionalidades


CRUD Completo
✅ Create - Cadastrar novo funcionário
✅ Read - Listar todos os funcionários
✅ Update - Editar dados de um funcionário
✅ Delete - Excluir funcionário

### Validações Implementadas
```
Nome: mínimo 2 caracteres
Email: formato válido (regex)
Telefone: mínimo 8 dígitos numéricos
Experiência do Usuário
Interface responsiva e intuitiva
Feedback visual durante operações (loading)
Mensagens de erro claras
Confirmação antes de excluir
Estado vazio quando não há cadastros
```
### Endpoints da API
```
Método				Endpoint				Descrição
POST				/funcionarios				Criar novo funcionário
GET				/funcionarios				Listar todos funcionários
GET				/funcionarios/:id			Buscar funcionário por ID
PUT				/funcionarios/:id			Atualizar funcionário
DELETE				/funcionarios/:id			Excluir funcionário
```
### Testando a Aplicação
```
Acesse o frontend no navegador
Preencha o formulário com:
Nome: João Silva
Email: joao@email.com
Telefone: 11987654321
Clique em "Salvar"
Verifique o funcionário na lista
Teste editar clicando em "Editar"
Teste excluir clicando em "Excluir"
```
### Decisões Técnicas
```
Por que NeDB?
Requisito do desafio
Zero configuração (não precisa instalar banco de dados separado)
Sintaxe similar ao MongoDB
Perfeito para protótipos e aplicações pequenas

Por que React + Vite?
React é requisito do desafio
Vite é mais rápido que Create React App
Hot Module Replacement instantâneo
Build otimizado

Por que Axios?
API simples e intuitiva
Interceptors para tratamento global de erros
Suporte a Promises nativo
Transformação automática de JSON
Estrutura de Componentes
Separação de responsabilidades: Formulário e Lista são independentes
Props drilling controlado: Estado gerenciado no App.jsx
Reusabilidade: Componentes podem ser facilmente reutilizados
```

Desenvolvido como parte do processo seletivo MM Tech.
 
Observação: Este projeto foi desenvolvido com foco em demonstrar habilidades em desenvolvimento fullstack, boas práticas de código e atenção à experiência do usuário.