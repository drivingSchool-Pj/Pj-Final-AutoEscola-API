import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

describe("Testing login routes", () => {
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
    typeCategory: "A",
  };

  const userLogin = {
    email: "batata@batata.com",
    password: "batata",
  }



  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    request(app).post('/users').send(user)
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to login", async () => {
    const res = await request(app).post("/login").send(userLogin);

    expect(res.body).toHaveProperty("token");
    expect(res.status).toBe(200);
  });

  test("Should not be able to login with wrong password", async () => {
    const res = await request(app).post("/login").send({
        email: "batata@batata.com",
        password: "notbatata"
    })

    expect(res.body).toHaveProperty('message')
    expect(res.status).toBe(403)
  })
});
