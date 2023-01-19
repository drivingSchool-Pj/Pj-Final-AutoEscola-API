# Rota user

<br/>

### Criação de usuário

<br/>

```http
  POST /user
```

<br/>

`Rota para criação de usuário deve receber os seguintes dados:`

<br/>

- `name: string`
- `email: string`
- `password: Deverá receber uma string`
- `contact: string`
- `age: Devera receber um number da idade, nao pode ser maior que 99`
- `cpf: Devera receber uma string valida de CPF`
- `isAdm: boolean`
- `isActive: Não deve ser passado mas gerado no momento da validação dos dados no formato boolean com default = true`
- `typeCategorie: Deve ser passado o tipo da carteira (A B C D OU E). Nao pode ser nulo!`
- `Address: Devera receber um objeto com os seguintes dados:`
- `street: string`
- `number: string`
- `complement?: string`
- `city: string`
- `state: string`

- `Não é possível cadastrar dois usuários com o mesmo e-mail.`
  ‌
<br/>
<br/>

### Body


    {

        "name": "celeste",
        "email": "celeste@email.com",
        "password": "12345",
        "contact": "40028922",
        "age": 23,
        "cpf": 12345678900,
        "isAdm": true,
        "typeCategorie": "A",
        "address": {
          "street": "barao",
          "number": "10",
          "complement": "fundos",
          "city": "campinas",
          "state": "SP"
   
     }

### Response (201 Created)


    { 
        "updatedAt": "2023-01-18T03:00:00.000Z",
        "createdAt": "2023-01-18T03:00:00.000Z",
        "address": {
            "id": "d083e24e-f019-4e43-9780-0e625318700c",
            "street": "barao",
            "state": "SP",
            "number": "10",
            "city": "campinas",
            "complement": "fundos"
        },
        "typeCategorie": "A",
        "isActive": true,
        "isAdm": true,
        "age": 23,
        "contact": "40028922",
        "email": "celeste@email.com",
        "name": "celeste",
        "id": "c73c7ba0-e560-4036-9d99-e72b7209aba0"
    }


<br/>
<br/>

## Listar todos os usuários

<br/>

```http
  GET /user
```

<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Response (200 OK)

    [

     {
    	"updatedAt": "2023-01-13T03:00:00.000Z",
    	"createdAt": "2023-01-13T03:00:00.000Z",
    	"address": {
    		"id": "57439066-e1a3-41fa-b3b6-3d0743c2a1b8",
    		"street": "barao",
    		"state": "SP",
    		"number": "10",
    		"city": "campinas",
    		"complement": "fundos"
    	},
    	"typeCategorie": "A",
    	"isActive": true,
    	"isAdm": true,
    	"age": 23,
    	"contact": "40028922",
    	"email": "gi@email.com",
    	"name": "Giovanna",
    	"id": "6ce7ac0e-42f5-4317-b5a6-2c39ab288078"
    },
    {

    	"updatedAt": "2023-01-14T03:00:00.000Z",
    	"createdAt": "2023-01-14T03:00:00.000Z",
    	"address": {
    		"id": "bb7df203-b282-4f40-b064-22df1c9dcde3",
    		"street": "Santo Antônio",
    		"state": "RJ",
    		"number": "40",
    		"city": "Rio de Janeiro",
    		"complement": "Perto da padaria"
    	},
    	"typeCategorie": "B",
    	"isActive": true,
    	"isAdm": false,
    	"age": 40,
    	"contact": "24668074",
    	"email": "flavio@email.com",
    	"name": "Flavio",
    	"id": "54196fe1-aa8a-4575-b790-7da6a4326b73"
      }

    ]

<br/>
<br/>

## Atualizar usuário

<br/>

```http
  PATCH /user/<id>
```
<br/>

| Parâmetro | Tipo     | Descrição                      |
| :--------:| :-------:| :-----------------------------:|
| `id`      | `string` | **Obrigatório** id do usuário. |

<br/>

### Body

    { 

       "name": "Giovanna Alonso",
    
    }


### Response (200 OK)

    [
      
      {
    	"id": "6ce7ac0e-42f5-4317-b5a6-2c39ab288078",
    	"name": "Giovanna Alonso",
    	"email": "gi@email.com",
    	"age": 23,
    	"contact": "40028922",
    	"isAdm": true,
    	"isActive": true,
    	"typeCategorie": "A",
    	"createdAt": "2023-01-13",
    	"updatedAt": "2023-01-13",
    	"deletedAt": null
      }
    ]

<br/>

- `Não deve ser possível atualizar os campos id, isAdm e isActive.`

- `Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.`

<br/>
<br/>

## Deletar de usuário

<br/>

```http
  DELETE /user/<id>
```

| Parâmetro | Tipo     | Descrição                      |
| :--------:| :-------:| :-----------------------------:|
| `id`      | `string` | **Obrigatório** id do usuário. |

<br/>
<br/>

# Rota login

<br/>

### Logar uma conta

<br/>

```http
  POST /login
```

<br/>

* `Rota de login recebe email e password.`
* `Não é possível realizar o login com um usuário inativo.`

<br/>

### Body

    { 

       "email": "lu@email.com",
	   "password": "12345"
    
    }

<br/>
<br/>

# Rota location

<br/>

### Criar uma localização

<br/>

```http
  POST /location
```

<br/>

`Rota para criar uma localização deve receber os seguintes dados:`

- `street: string`
- `state: string`
- `city: string`
- `complement: string`

<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Body

    { 

       "street": "Bandeirantes",
       "city": "Rio de Janeiro",
       "state": "RJ",
       "complement": "fundos"
    
    }

### Response (201 Created)


    { 
       "street": "Bandeirantes",
       "state": "RJ",
       "city": "Rio de Janeiro",
       "complement": "fundos",
       "id": "30fa9301-ea26-450f-8fdc-200ff7d90071"
    }

<br/>
<br/>

### Listar todas as localizações

<br/>

```http
  GET /location
```

<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Response (200 OK)

    [
      
      {

    	"id": "30fa9301-ea26-450f-8fdc-200ff7d90071",
		"street": "Bandeirantes",
		"state": "RJ",
		"city": "Rio de Janeiro",
		"complement": "fundos"
      }
	  {
	        "id": "83e0bb56-a785-4b04-80c1-cf8e70b7db8e",
		"street": "Oscar Freire",
		"state": "SP",
		"city": "São Paulo",
		"complement": "fundos"
	  }
    ]

<br/>
<br/>

### Listar uma localização pelo id

<br/>

```http
  GET /location/<id>
```

<br/>

| Parâmetro | Tipo     | Descrição                      |
| :--------:| :-------:| :-----------------------------:|
| `id`      | `string` | **Obrigatório** id da location.|


<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Response (200 OK)

      
      {

    	    "id": "83e0bb56-a785-4b04-80c1-cf8e70b7db8e",
	    "street": "Oscar Freire",
	    "state": "SP",
	    "city": "São Paulo",
	    "complement": "fundos"

      }

<br/>
<br/>

 ### Atualizar localização

 <br/>

```http
  PATCH /location/<id>
```
<br/>

| Parâmetro | Tipo     | Descrição                      |
| :--------:| :-------:| :-----------------------------:|
| `id`      | `string` | **Obrigatório** id da location.|


<br/>

- `Apenas administradores podem atualizar o local.`

<br/>

### Body

    { 

       "complement": "Perto do salão de festas"
    
    }


### Response (200 OK)

    [
      
      {

        "id": "30fa9301-ea26-450f-8fdc-200ff7d90071",
	    "street": "Bandeirantes",
	    "state": "RJ",
	    "city": "Rio de Janeiro",
	    "complement": "Perto do salão de festas"
      }
    ]

<br/>
<br/>

# Rota schedules

<br/>

### Criar um agendamento

<br/>

```http
  POST /schedules
```

<br/>

`Rota para criar um agendamento deve receber os seguintes dados:`

- `userId: Devera receber um uuid de um usuário existente que sera o aluno`
- `instructorsId: Devera receber um uuid de um usuário existente que sera o instrutor`
- `locationId: Devera receber um uuid de um local existente`
- `date: Devera receber uma data no formato Date`
- `hour: Devera receber uma horário no formato time`

<br/>

- `Usuario deve estar ativo para realizar um agendamento`
- `Instrutor deve estar ativo para realizar um agendamento`
- `Local deve estar ativo para realizar um agendamento`
- `Não pode haver agendamento com o mesmo aluno e instrutor no mesmo horario`
- `Não pode haver agendamento com o mesmo aluno no mesmo horario`
- `Não pode haver agendamento com o mesmo instrutor no mesmo horario`
- `A rota pode ser acessada apenas por administradores.`
<br/>


### Body

    { 

	   "userId": "54196fe1-aa8a-4575-b790-7da6a4326b73",
	   "instructorsId": "f8d94fa7-75a4-4579-b9c9-801a9cb57af7",
	   "locationId": "30fa9301-ea26-450f-8fdc-200ff7d90071",
	   "date": "27/11/2023",
	   "hour": "10:00"

    }

### Response (201 Created)


    { 
       "date": "27/11/2023",
	   "hour": "10:00",
	   "user": "e8e74ae2-ab61-4341-9199-a2337c448a2f",
	   "instructors": "f8d94fa7-75a4-4579-b9c9-801a9cb57af7",
	   "id": "bd9036e1-1719-472d-8d4b-5e035fd59f59"
    }

<br/>
<br/>

### Listar todos os agendamentos

<br/>

```http
  GET /schedules
```

<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Response (200 OK)

    [

     {
            "id": "2000ee2f-98a7-4100-9da3-81b881a9ba68",
		"date": "2023-11-27",
		"hour": "08:00:00"
    },
    {

    	"id": "e940fd41-d91b-488f-963c-da77f4997fc2",
		"date": "2020-01-10",
		"hour": "10:00:00"
      }

    ]

<br/>
<br/>


### Listar um agendamento

<br/>

```http
  GET /schedules/<id>
```
<br/>

| Parâmetro | Tipo     | Descrição                      |
| :--------:| :-------:| :-----------------------------:|
| `id`      | `string` | **Obrigatório** id do agendamento. |


<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Response (200 OK)

    { 
      "id": "2000ee2f-98a7-4100-9da3-81b881a9ba68",
	  "date": "2023-11-27",
	  "hour": "08:00:00"
    }

<br/>
<br/>

### Listar agendamentos de um usuário

<br/>

```http
  GET /schedules/user/<id>
```
<br/>

| Parâmetro | Tipo     | Descrição                      |
| :--------:| :-------:| :-----------------------------:|
| `id`      | `string` | **Obrigatório** id do usuário. |

<br/>
<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Response (200 OK)

    [

     {
            "id": "2000ee2f-98a7-4100-9da3-81b881a9ba68",
		"date": "2023-11-27",
		"hour": "08:00:00"
    },
    {

    	"id": "e940fd41-d91b-488f-963c-da77f4997fc2",
		"date": "2020-01-10",
		"hour": "10:00:00"
      }

    ]

<br/>
<br/>

# Rota instructors

<br/>

### Criar um instrutor

<br/>

```http
  POST /instructors
```
<br/>

`Rota para criar uma localização deve receber os seguintes dados:`

- `id: Devera receber um uuid de um usuário existente que sera o instrutor`
- `category: Devera receber uma categoria do tipo A, B, C, D, E.`

<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Body

    { 

       "category": "A",
	   "id": "c73c7ba0-e560-4036-9d99-e72b7209aba0"
    
    }

### Response (201 Created)


    { 
       "message": "Instructor created successfully"
    }


<br/>
<br/>

### Listar todos os instrutores

<br/>

```http
  GET /instructors
```

<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Response (200 OK)

    [

     {
       "id": "5d219981-d852-4a1d-99d4-1ca6bf75e517",
		"user": {
			"id": "3b794d02-e48d-4157-9e22-17dcc6edaef6",
			"name": "peter",
			"email": "peter@email.com",
			"age": 23,
			"contact": "40028922",
			"isAdm": true,
			"isActive": true,
			"typeCategorie": "A",
			"createdAt": "2023-01-15",
			"updatedAt": "2023-01-15",
			"deletedAt": null
		},
		"categories": {
			"id": "65f89ac8-138d-481d-b45d-8d13c29ff7be",
			"typeCategorie": "A"
		}
    },
    {

    	"id": "0e91640c-b8b5-471e-a7c9-c6e970e272ca",
		"user": {
			"id": "c73c7ba0-e560-4036-9d99-e72b7209aba0",
			"name": "celeste",
			"email": "celeste@email.com",
			"age": 30,
			"contact": "40028922",
			"isAdm": true,
			"isActive": true,
			"typeCategorie": "A",
			"createdAt": "2023-01-18",
			"updatedAt": "2023-01-18",
			"deletedAt": null
		},
		"categories": {
			"id": "65f89ac8-138d-481d-b45d-8d13c29ff7be",
			"typeCategorie": "A"
		}
      }
    ]

<br/>
<br/>

### Deletar um instructor

<br/>
<br/>

```http
  DELETE /instructors/<id>
```

<br/>

| Parâmetro | Tipo     | Descrição                      |
| :-------- | :------- | :----------------------------- |
| `id`      | `string` | **Obrigatório** id do instructor. |

<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Response (209 unknown)


    { 
       "message": "sucefully deleted"
    }

<br/>

# Rota categories

<br/>

### Listar categoria de um instructor

<br/>

```http
  GET /categories/instructors/<id>
```
<br/>

| Parâmetro | Tipo     | Descrição                      |
| :--------:| :-------:| :-----------------------------:|
| `id`      | `string` | **Obrigatório** id do instrutor. |

<br/>
<br/>

- `A rota pode ser acessada apenas por administradores.`

<br/>

### Response (200 OK)

    [

     {
       "id": "f8d94fa7-75a4-4579-b9c9-801a9cb57af7",
	   "user": {
		"id": "54196fe1-aa8a-4575-b790-7da6a4326b73",
		"name": "Giovanna",
		"email": "gio@email.com",
		"age": 23,
		"contact": "40028922",
		"isAdm": true,
		"isActive": true,
		"typeCategorie": "A",
		"createdAt": "2023-01-14",
		"updatedAt": "2023-01-14",
		"deletedAt": null
	},
	 "categories": {
	    "id": "3ed2cdb4-a1a3-45f5-b746-26f717151f35",
		"typeCategorie": "B"
	  }
     }
    ]

