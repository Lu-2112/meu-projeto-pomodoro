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
```

## Endpoints

### Health
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /health | Verifica se a API está rodando |

### Settings
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /settings | Retorna as configurações do pomodoro |
| PUT | /settings | Atualiza as configurações do pomodoro |

**Exemplo PUT /settings:**
```json
{
  "workTime": 25,
  "shortBreakTime": 5,
  "longBreakTime": 15
}
```

### Tasks
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tasks | Lista todas as tasks |
| POST | /tasks | Cria uma nova task |
| PATCH | /tasks/:id/complete | Marca task como concluída |
| PATCH | /tasks/:id/interrupt | Marca task como interrompida |
| DELETE | /tasks | Apaga todo o histórico |

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