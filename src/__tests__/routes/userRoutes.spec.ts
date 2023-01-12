import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { describe } from "node:test";

describe("Testing user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
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

    const { name, email, password, contact, age, cpf, isAdm, typeCategory } =
      user;

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: name,
        email: email,
        password: password,
        contact: contact,
        age: age,
        cpf: cpf,
        isAdm: isAdm,
        isActive: true,
        typeCategory: typeCategory,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it("Should not be able to create a user with email alread registered", async () => {
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
