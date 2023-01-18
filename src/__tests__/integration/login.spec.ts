import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedAdminLoginInvalid,
} from "../mocks/createUser";

describe("Testing login routes", () => {
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

  test("POST /login -  should be able to login with the user", async () => {
    await request(app).post("/user").send(mockedAdmin);
    const res = await request(app).post("/login").send(mockedAdminLogin);

    expect(res.body).toHaveProperty("token");
    expect(res.status).toBe(200);
  });

  test("POST /login -  should not be able to login with the user with incorrect password or email", async () => {
    const res = await request(app).post("/login").send(mockedAdminLoginInvalid);

    expect(res.body).toHaveProperty("message");
    expect(res.status).toBe(403);
  });

  test("POST /login -  should not be able to login with the user with isActive = false", async () => {  
    const userToDelete = await request(app).post("/user").send(mockedAdmin);
    await request(app).delete(`/delete/${userToDelete.body.id}`).send()
    const res = await request(app).post("/login").send(mockedAdminLogin)

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("message")
  });
});
