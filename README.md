# Documentação da API

## User

### **Retorna todos os usuarios**

#### Request

```http
  GET /user
```

#### **Body**

```js
  NO BODY
```

| Parâmetro | Tipo     | Descrição                                                            |
| :-------- | :------- | :------------------------------------------------------------------- |
| `/user`   | `string` | **Obrigatório:** A rota pode ser acessada apenas por administradores |

#### Response - 200 OK

```json
[
  {
    "updatedAt": "2023-01-12T03:00:00.000Z",
    "createdAt": "2023-01-12T03:00:00.000Z",
    "address": {
      "id": "58ac21ce-c254-4d5f-a866-4b1f38f6c012",
      "street": "São Joaquim",
      "state": "SP",
      "number": "5",
      "city": "Barueri",
      "complement": "Perto da padaria"
    },
    "typeCategorie": "A",
    "isActive": true,
    "isAdm": true,
    "age": 42,
    "contact": "8878",
    "email": "paula27@gmail.com",
    "name": "Paula Cristina",
    "id": "d5d920d3-2546-41ce-af00-989f383b44c9"
  },
  {
    "updatedAt": "2023-01-12T03:00:00.000Z",
    "createdAt": "2023-01-12T03:00:00.000Z",
    "address": {
      "id": "58ac21ce-c254-4d5f-a866-4b1f38f6c012",
      "street": "Av. Pinheiros",
      "state": "SP",
      "number": "20",
      "city": "Itapevi",
      "complement": "Perto da padaria"
    },
    "typeCategorie": "A",
    "isActive": true,
    "isAdm": true,
    "age": 42,
    "contact": "1199999-9999",
    "email": "joao@gmail.com",
    "name": "João Pereira",
    "id": "d5d920d3-2546-41ce-af00-989f383b44c9"
  }
]
```

---

### **Criação de usuarios**

#### Request

```http
  POST /user
```

#### **Body**

```json
{
  "name": "João Pereira",
  "email": "joao@gmail.com",
  "contact": "1199999-9999",
  "password": "1234",
  "age": "42",
  "cpf": "53637314444",
  "isAdm": true,
  "typeCategorie": "A",
  "address": {
    "street": "Av. Pinheiros",
    "complement": "Perto da padaria",
    "number": "20",
    "city": "Itapevi",
    "state": "SP"
  }
}
```

| Parâmetro | Tipo     | Descrição                                                            |
| :-------- | :------- | :------------------------------------------------------------------- |
| `/user`   | `string` | **OBS** Não podem ser cadastrados dois, usuários com o mesmo e-mail. |

#### Response - 201 Created

```json
{
  "updatedAt": "2023-01-12T03:00:00.000Z",
  "createdAt": "2023-01-12T03:00:00.000Z",
  "address": {
    "id": "58ac21ce-c254-4d5f-a866-4b1f38f6c012",
    "street": "Av. Pinheiros",
    "state": "SP",
    "number": "20",
    "city": "Itapevi",
    "complement": "Perto da padaria"
  },
  "typeCategorie": "A",
  "isActive": true,
  "isAdm": true,
  "age": 42,
  "contact": "1199999-9999",
  "email": "joao@gmail.com",
  "name": "João Pereira",
  "id": "d5d920d3-2546-41ce-af00-989f383b44c9"
}
```

---

### **Deleção de usuario**

#### Request

```http
  DELETE /user/:id
```

#### **Body**

```js
  NO BODY
```

| Parâmetro   | Tipo     | Descrição                                                                                                              |
| :---------- | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| `/user/:id` | `string` | **OBS:** A rota pode ser acessada apenas por administradores. Não deve ser possível deletar um usuário que não existe. |

#### Response - 204 No Content

```js
  NO CONTENT
```

---

### **Atualização do usuario**

#### Request

```http
  PATCH /user/:id
```

#### **Body**

```json
{
  "age": 43,
  "email": "joao2023@gmail.com",
  "contact": "1198899-9988"
}
```

| Parâmetro   | Tipo     | Descrição                                                                                                                                                                                    |
| :---------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/user/:id` | `string` | **OBS:** Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário. Rota necessita de estar autenticado com um token. |

#### Response - 204 No Content

```json
{
  "updatedAt": "2023-01-12T03:00:00.000Z",
  "createdAt": "2023-01-12T03:00:00.000Z",
  "address": {
    "id": "58ac21ce-c254-4d5f-a866-4b1f38f6c012",
    "street": "Av. Pinheiros",
    "state": "SP",
    "number": "20",
    "city": "Itapevi",
    "complement": "Perto da padaria"
  },
  "typeCategorie": "A",
  "isActive": true,
  "isAdm": true,
  "age": 43,
  "contact": "1198899-9988",
  "email": "joao2023@gmail.com",
  "name": "João Pereira",
  "id": "d5d920d3-2546-41ce-af00-989f383b44c9"
}
```
