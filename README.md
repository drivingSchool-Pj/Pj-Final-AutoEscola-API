# Pj-Final-AutoEscola-API

## **POST user**

- Route:  **/user**
- Esta rota permite a criação de um novo usuário, retornando todos os dados com exceção do hash da senha. Não é necessário passar o dado "isActive" pois o mesmo vem como default true.

## Soft delete user
- Route: /delete/:id
## **Soft DELETE user**
- Rota: **/user/:id**
- Esta rota permite que o Admin faça um soft Delete de qualquer usuário. O soft delete irá alterar a propriedade isActive do usuário de true para false, e este usuário não aparecerá em pesquisas dos bancos de dados. 
