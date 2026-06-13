# Chronos Pomodoro API

API REST desenvolvida com Node.js, Express, Prisma e MySQL para o projeto Chronos Pomodoro.

## Como rodar o projeto

### Pré-requisitos
- Node.js
- MySQL

### Instalação

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://root:root@localhost:3306/pomodoro_db"
PORT=3333
JWT_SECRET=chronos_secret_key_2026
```

## Como testar os fluxos principais

### 1. Cadastro
POST `/auth/register` com nome, email e senha.

### 2. Login
POST `/auth/login` com email e senha. Guarde o token retornado.

### 3. Usar o app
Use o token no header `Authorization: Bearer <token>` em todas as requisições de settings e tasks.

### 4. Recuperação de senha
POST `/auth/forgot-password` com o email. O token aparece no terminal do backend (em dev). Use o token no POST `/auth/reset-password` com o novo token e nova senha.

### 5. Logout
Remova o token do localStorage no frontend.

### 6. Tentativa de acesso sem login
Qualquer requisição para `/settings` ou `/tasks` sem token retorna 401.

## Endpoints

### Health
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /health | Verifica se a API está rodando |

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/register | Cadastra novo usuário |
| POST | /auth/login | Autentica usuário e retorna JWT |
| POST | /auth/forgot-password | Gera token de recuperação de senha |
| POST | /auth/reset-password | Redefine senha com token |

**Exemplo POST /auth/register:**
```json
{
  "name": "Luiza",
  "email": "luiza@email.com",
  "password": "123456"
}
```

**Exemplo POST /auth/login:**
```json
{
  "email": "luiza@email.com",
  "password": "123456"
}
```

**Exemplo POST /auth/forgot-password:**
```json
{
  "email": "luiza@email.com"
}
```

**Exemplo POST /auth/reset-password:**
```json
{
  "token": "token_recebido",
  "password": "nova_senha"
}
```

### Settings (requer autenticação)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /settings | Retorna as configurações do usuário |
| PUT | /settings | Atualiza as configurações do usuário |

**Exemplo PUT /settings:**
```json
{
  "workTime": 25,
  "shortBreakTime": 5,
  "longBreakTime": 15
}
```

### Tasks (requer autenticação)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tasks | Lista todas as tasks do usuário |
| POST | /tasks | Cria uma nova task |
| PATCH | /tasks/:id/complete | Marca task como concluída |
| PATCH | /tasks/:id/interrupt | Marca task como interrompida |
| DELETE | /tasks | Apaga todo o histórico do usuário |

**Exemplo POST /tasks:**
```json
{
  "id": "1234567890",
  "name": "Estudar Node.js",
  "duration": 25,
  "type": "workTime",
  "startDate": 1234567890
}
```

## Tecnologias
- Node.js + TypeScript
- Express
- Prisma ORM
- MySQL
- JWT (jsonwebtoken)
- Bcrypt (bcryptjs)