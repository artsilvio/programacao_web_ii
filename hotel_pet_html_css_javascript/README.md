# 🐾 Hotel Pet – Sistema de Gerenciamento de Hospedagem

## Sobre o projeto

O Hotel Pet é um sistema web desenvolvido como projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas (ADS), com o objetivo de gerenciar reservas de hospedagem para animais de estimação.

O sistema permite o gerenciamento de clientes, funcionários, gerentes, pets e reservas, com controle de acesso conforme o perfil do usuário.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage (armazenamento local no navegador)

## Funcionalidades implementadas

### 1. Controle de acesso e usuários
- Login no sistema.
- Cadastro público de clientes.
- Controle de acesso conforme o perfil do usuário:
  - Cliente.
  - Funcionário.
  - Gerente.
- Restrição de acesso às páginas conforme a função do usuário.
- Edição do próprio perfil.
- Gerenciamento de usuários conforme as permissões de cada função.
- Ativação e desativação de usuários.

### 2. Gerenciamento de pets
- Cadastro de pets.
- Listagem dos pets cadastrados.
- Identificação do proprietário de cada pet.
- Visualização dos pets conforme o perfil do usuário.
- Clientes visualizam somente seus próprios pets.

### 3. Gerenciamento de reservas
- Cadastro de reservas de hospedagem.
- Seleção do pet e identificação automática do proprietário.
- Definição das datas de entrada e saída.
- Cálculo automático da quantidade de diárias.
- Cálculo automático do valor total da hospedagem.
- Consulta e visualização dos dados das reservas.
- Pesquisa e filtragem de reservas.
- Controle de status:
  - Agendada.
  - Em andamento.
  - Finalizada.
- Clientes visualizam somente suas próprias reservas.

### 4. Controle de permissões nas reservas
- Clientes podem editar reservas não finalizadas.
- Funcionários podem editar reservas não finalizadas.
- Reservas finalizadas ficam disponíveis apenas para visualização de clientes e funcionários.
- Gerentes podem editar reservas finalizadas.

### 5. Configurações do sistema
- Configuração do valor da diária pelo gerente.
- Configuração da capacidade de hospedagem.
- Armazenamento das configurações no LocalStorage.

### 6. Controle de disponibilidade
- Verificação automática da disponibilidade de vagas durante o cadastro de uma reserva.
- Consideração das datas de entrada e saída.
- Reservas agendadas e em andamento ocupam vagas.
- Reservas finalizadas não ocupam vagas.
- Bloqueio do cadastro quando não há vagas disponíveis durante todo o período solicitado.

## Armazenamento de dados

O projeto utiliza o LocalStorage do navegador para armazenar informações de usuários, pets, reservas e configurações.

**Observação:** o armazenamento local é utilizado para fins acadêmicos e demonstração das funcionalidades. Não representa uma solução de segurança ou armazenamento adequada para um sistema em produção.

## Status do projeto

🚧 Em desenvolvimento.

Novas funcionalidades e melhorias serão implementadas gradualmente.

## Objetivo acadêmico

Aplicar conhecimentos de desenvolvimento web, HTML, CSS e JavaScript, incluindo manipulação do DOM, eventos, funções, arrays, objetos e armazenamento de dados no navegador.