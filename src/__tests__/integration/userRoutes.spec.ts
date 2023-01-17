import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

describe("Testing user routes", () => {
  let connection: DataSource;
  const userRepo = AppDataSource.getRepository(User);

  const user = {
    name: "batata",
    email: "batata@batata.com",
    password: "batata",
    contact: 40028922,
    age: 98,
    cpf: "999.999.999-99",
    isAdm: true,
    typeCategorie: "A",
    address: {
      street: "rua batata",
      complement: "perto do ceasa",
      number: 666,
      city: "Ananindeua",
      state: "PA",
    },
  };
  const userLogin = {
    email: "batata@batata.com",
    password: "batata",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    const users = await userRepo.find();
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create user", async () => {
    const res = await request(app).post("/user").send(user);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining(user));
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        isActive: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(res.body).not.toHaveProperty("password");
    const [userCreated, amount] = await userRepo.findAndCountBy({
      id: res.body.id,
    });
    expect(amount).toBe(1);
    expect(userCreated[0].password).toBeTruthy();
  });
  test("Should not be able to create user with invalid body", async () => {
    const wrongUser = {
      name: "",
      email: "",
      password: "",
      contact: 0,
      age: 9105,
      cpf: "999.999.999-99",
      isAdm: true,
      typeCategorie: "Z",
      address: {
        street: "rua batata",
        complement: "perto do ceasa",
        number: 666,
        city: "Ananindeua",
        state: "PA",
      },
    };

    const res = await request(app).post("/user").send(wrongUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
    const [users, amount] = await userRepo.findAndCount();
    expect(amount).toBe(0);
  });
  test("Should not be able to create user with email already registered", async () => {
    const wrongUser = {
      name: "batatão",
      email: "batata@batata.com",
      password: "batatão",
      contact: 40028923,
      age: 97,
      cpf: "999.999.999-98",
      isAdm: false,
      typeCategorie: "B",
      address: {
        street: "rua batata",
        complement: "perto do ceasa",
        number: 666,
        city: "Ananindeua",
        state: "PA",
      },
    };

    const res1 = await request(app).post("/user").send(user);

    const res2 = await request(app).post("/user").send(wrongUser);

    expect(res2.status).toBe(400);
    expect(res2.body).toHaveProperty("message");
  });
  test("Should be able to list all users", async () => {
    await request(app).get("/user").send(user);
    const resToken = await request(app).post("/login").send(userLogin);

    const user2 = {
      name: "batatão",
      email: "bataton@batata.com",
      password: "batatão",
      contact: 40028923,
      age: 97,
      cpf: "999.999.999-98",
      isAdm: false,
      typeCategorie: "B",
      address: {
        street: "rua batata",
        complement: "perto do ceasa",
        number: 666,
        city: "Ananindeua",
        state: "PA",
      },
    };

    await request(app).post("/user").send(user);
    await request(app).post("/user").send(user2);

    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${resToken.body.token}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("map");
    expect(res[0].body).not.toHaveProperty("password");
    const [users, amount] = await userRepo.findAndCount();
    expect(amount).toBe(2);
  });

  test("Should not be able to list without being adm", async () => {
    const res = await request(app).get("/user").send();

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
  test("Should be able to update themself", async () => {
    const createUser = await request(app).get("/user").send(user);
    const resToken = await request(app).post("/login").send(userLogin);

    const updatedUser = {
      name: "batat",
      email: "batat@batata.com",
      password: "batat",
      typeCategorie: "C",
    };

    const res = await request(app)
      .patch(`/users/${createUser.body.id}`)
      .set("Authorization", `Bearer ${resToken.body.token}`)
      .send(updatedUser);

    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty("password");
    expect(res.body).toEqual(
      expect.objectContaining({
        name: "batat",
        email: "batat@batata.com",
        password: "batat",
        typeCategorie: "C",
      })
    );
  });
  test("Should be able to update another user being adm", async () => {
    const createUser = await request(app).get("/user").send(user);
    const resToken = await request(app).post("/login").send(userLogin);

    const user2 = {
      name: "batatão",
      email: "bataton@batata.com",
      password: "batatão",
      contact: 40028923,
      age: 97,
      cpf: "999.999.999-98",
      isAdm: false,
      typeCategorie: "B",
      address: {
        street: "rua batata",
        complement: "perto do ceasa",
        number: 666,
        city: "Ananindeua",
        state: "PA",
      },
    };

    const updatedUser2 = {
      name: "bataton",
      password: "bataton",
      contact: 40028924,
    };

    const createUser2 = await request(app).get("/user").send(user2);

    const res = await request(app)
      .patch(`/user/${createUser2.body.id}`)
      .set("Authorization", `Bearer ${resToken.body.token}`)
      .send(updatedUser2);

    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty("password");
    expect(res.body).toEqual(
      expect.objectContaining({
        name: "bataton",
        password: "bataton",
        contact: 40028924,
      })
    );
  });

  test("Should not be able to update other without being adm", async () => {
    const createUser = await request(app).get("/user").send(user);

    const user2 = {
      name: "batatão",
      email: "bataton@batata.com",
      password: "batatão",
      contact: 40028923,
      age: 97,
      cpf: "999.999.999-98",
      isAdm: false,
      typeCategorie: "B",
    };

    const user2login = {
      email: "bataton@batata.com",
      password: "batatão",
    };

    const updatedUser = {
      name: "batat",
      password: "batat",
      contact: 40028929,
    };

    await request(app).get("/user").send(user2);
    const resToken = await request(app).post("/login").send(user2login);

    const res = await request(app)
      .patch(`/user/${createUser.body.id}`)
      .set("Authorization", `Bearer ${resToken.body.token}`)
      .send(updatedUser);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
  test("Should not be able to update id, isAdm or isActive", async () => {
    const createUser = await request(app).get("/user").send(user);
    const resToken = await request(app).post("/login").send(userLogin);

    const updatedUser = {
      id: "iderrado",
      idAdm: false,
      isActive: false,
    };

    const res = await request(app)
      .patch(`/users/${createUser.body.id}`)
      .set("Authorization", `Bearer ${resToken.body.token}`)
      .send(updatedUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  test("Should be able to delete", async () => {
    await request(app).get("/user").send(user);
    const resToken = await request(app).post("/login").send(userLogin);

    const user2 = {
      name: "batatão",
      email: "bataton@batata.com",
      password: "batatão",
      contact: 40028923,
      age: 97,
      cpf: "999.999.999-98",
      isAdm: false,
      typeCategorie: "B",
      address: {
        street: "rua batata",
        complement: "perto do ceasa",
        number: 666,
        city: "Ananindeua",
        state: "PA",
      },
    };

    const createdUser2 = await request(app).get("/user").send(user2);

    const res = await request(app)
      .delete(`/user/${createdUser2.body.id}`)
      .set("Authorization", `Bearer ${resToken.body.token}`)
      .send();

    const userDeleted = await userRepo.findBy({
      id: createdUser2.body.id,
    });
    expect(res.status).toBe(209);
    expect(res.body).toBeUndefined();
    expect(userDeleted).toEqual(
      expect.objectContaining({
        isActive: false,
      })
    );
  });
  test("Should not be able to delete without being adm", async () => {
    const createUser = await request(app).get("/user").send(user);

    const user2 = {
      name: "batatão",
      email: "bataton@batata.com",
      password: "batatão",
      contact: 40028923,
      age: 97,
      cpf: "999.999.999-98",
      isAdm: false,
      typeCategorie: "B",
      address: {
        street: "rua batata",
        complement: "perto do ceasa",
        number: 666,
        city: "Ananindeua",
        state: "PA",
      },
    };

    const user2login = {
      email: "bataton@batata.com",
      password: "batatão",
    };

    await request(app).post("/user").send(user2);
    const resToken = await request(app).post("/login").send(user2login);

    const res = await request(app)
      .delete(`/user/${createUser.body.id}`)
      .set("Authorization", `Bearer ${resToken.body.token}`)
      .send();

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
