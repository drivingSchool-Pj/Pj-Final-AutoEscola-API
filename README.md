# Pj-Final-AutoEscola-API

## **POST user**

- Route:  **/user**
- Esta rota permite a criação de um novo usuário, retornando todos os dados com exceção do hash da senha. Não é necessário passar o dado "isActive" pois o mesmo vem como default true.

## Soft delete user
- Route: /delete/:id