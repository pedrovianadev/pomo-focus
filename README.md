# 🍅 PomoFocus — Login e Dashboard com Expo

Aplicação mobile desenvolvida em **React Native** com **Expo** e **Expo Router**, trazendo uma tela de autenticação integrada a um painel de produtividade Pomodoro em Dark Mode.

## ✨ Funcionalidades

- **Tela de Login (`app/index.tsx`)**:
  - Validação de preenchimento obrigatório para Login e Senha.
  - Campo de senha com ocultação de caracteres (`secureTextEntry`).
  - Autenticação simulada (`aluno` / `123456`).
- **Dashboard Pomodoro (`app/dashboard.tsx`)**:
  - Saudação personalizada (`Bom foco, [Nome]! ☕`) recebendo o nome do usuário via parâmetros de rota (`useLocalSearchParams`).
  - Alternância de ciclos: **Foco (25:00)**, **Pausa Curta (05:00)** e **Pausa Longa (15:00)**.
  - Abas dinâmicas de **Resumo do Dia** e **Tarefa em Foco** (ativada automaticamente ao iniciar o ciclo).
  - Proteção no botão **Sair** com alerta de confirmação caso o cronômetro esteja em andamento.

## 🗂️ Estrutura do Projeto

```text
pomo-focus/
├── app/
│   ├── _layout.tsx      # Configuração da navegação Stack (Expo Router)
│   ├── index.tsx        # Tela de Login
│   └── dashboard.tsx    # Tela de Dashboard Pomodoro
├── assets/
│   └── images/          # Ícones da aplicação
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Como executar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/pedrovianadev/pomo-focus.git
   cd pomo-focus
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```

## 🔑 Credenciais de Teste
- **Login:** `aluno`
- **Senha:** `123456`
