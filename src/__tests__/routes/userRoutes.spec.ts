import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { describe } from "node:test";
import { User } from "../../entities/user.entity";

describe("Testing user routes", () => {
  let connection: DataSource;
  const userRepo = AppDataSource.getRepository(User);

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

  it("Should be able to create user", async () => {
    const user = {
      name: "batata",
      email: "batata@batata.com",
      password: "batata",
      contact: 40028922,
      age: 98,
      cpf: "999.999.999-99",
      isAdm: true,
      typeCategory: "A",
    };

    const res = await request(app).post("/users").send(user);

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
    expect(res.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );
    const [userCreated, amount] = await userRepo.findAndCountBy({
      id: res.body.id,
    });
    expect(amount).toBe(1);
    expect(userCreated[0].password).toBeTruthy();
  });
  it("Should not be able to create user with invalid body", async () => {
    const user = {
      name: "",
      email: "",
      password: "",
      contact: 0,
      age: 9105,
      cpf: "999.999.999-99",
      isAdm: true,
      typeCategory: "Z",
    };

    const res = await request(app).post("/users").send(user);

    expect(res.status).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({ message: expect.any(String) })
    );
    const [users, amount] = await userRepo.findAndCount();
    expect(amount).toBe(0);
  });
  it("Should not be able to create user with email already registered", async () => {
    const user = {
      name: "batata",
      email: "batata@batata.com",
      password: "batata",
      contact: 40028922,
      age: 98,
      cpf: "999.999.999-99",
      isAdm: true,
      typeCategory: "A",
    };

    const wrongUser = {
      name: "batatão",
      email: "batata@batata.com",
      password: "batatão",
      contact: 40028923,
      age: 97,
      cpf: "999.999.999-98",
      isAdm: false,
      typeCategory: "B",
    };

    const res1 = await request(app).post("/users").send(user);
    try {
      const res2 = await request(app).post("/users").send(wrongUser);
    } catch (err) {
      expect(err.status).toBe(400);
      expect(err.message).toEqual(expect.any(String));
    }
  });
});
