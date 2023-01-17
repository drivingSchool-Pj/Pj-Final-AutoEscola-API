import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedCategory,
  mockedUser,
  mockedUserLogin,
} from "../mocks/index";

describe("/categories routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /categories/instructor/:id -  must be able to list the categories of an instructor", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const instructor = await request(app).get("/instructor");
    const response = await request(app)
      .get(`/categories/instructor/${instructor.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("categories");
    expect(response.body.schedules[0]).toHaveProperty("id");
    expect(response.body.schedules[0]).toHaveProperty("name");

    expect(response.body.schedules).toHaveLength(1);
    expect(response.status).toBe(200);
  });
  test("GET /categories/instructor/:id -  should not be able to list the categories of a instructor without authentication", async () => {
    const instructor = await request(app).get("/instructor");
    const response = await request(app).get(
      `/categories/instructor/${instructor.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /categories/instructor/:id -  should not be able to list the categories of a instructor not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const instructor = await request(app).get("/instructor");
    const response = await request(app)
      .get(`/categories/instructor/${instructor.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /categories -  Must be able to list all categories", async () => {
    const response = await request(app).get("/categories");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });
});
