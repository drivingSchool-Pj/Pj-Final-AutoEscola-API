# Pj-Final-AutoEscola-API

## **POST user**

- Route: **/user**
- Esta rota permite a criação de um novo usuário, retornando todos os dados com exceção do hash da senha. Não é necessário passar o dado "isActive" pois o mesmo vem como default true.

## **Soft DELETE user**

- Rota: **/user/:id**
- Esta rota permite que o Admin faça um soft Delete de qualquer usuário. O soft delete irá alterar a propriedade isActive do usuário de true para false, e este usuário não aparecerá em pesquisas dos bancos de dados.

## **GET schedules**

- Route: **/schedules/:id**
- Esta rota lista as informações de um determinado agendamento através do id dele.

<br>

- Route: **/schedules**
- Esta rota lista todos os agendamentos existentes.

## **GET user**

- Rota: **/user**
- Esta rota permite que o Admin liste todos os usuários que estão na tabela "users". O usuário deve ter a propriedade isActive como true, caso contrário ele não aparecerá na listagem.

## **POST SCHEDULES**

- Rota: **/schedules**
- Esta rota permite o agendamento de aulas. Ela não permite que seja agendada aulas em horários já ocupados. Ela também não permite que um aluno marque duas aulas no mesmo horário e nem que um instrutor seja agendado por dois alunos diferentes no mesmo horário.
