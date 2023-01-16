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

  test("POST /categories -  Must be able to create a category", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });
  test("POST /categories -  should not be able to create category without authentication", async () => {
    const response = await request(app)
      .post("/categories")
      .send(mockedCategory);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
  test("POST /categories - should not be able to create category not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategory);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /categories -  should not be able to create a category that already exists", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });
  test("PATCH /categories/:id -  should be able to update category", async () => {
    const newValues = { name: "B" };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const categoryTobeUpdateRequest = await request(app)
      .get("/categories")
      .set("Authorization", token);
    const categoryTobeUpdateId = categoryTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/categories/${categoryTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const categoryUpdated = await request(app)
      .get("/categories")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(categoryUpdated.body[0].name).toEqual("B");
  });

  test("PATCH /categories/instructor/:id - should not be able to update category of an instructor without adm permission", async () => {
    const newValues = { name: "C" };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUser);
    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const userToken = `Bearer ${userLoginResponse.body.token}`;
    const adminToken = `Bearer ${admingLoginResponse.body.token}`;

    const categoryTobeUpdateRequest = await request(app)
      .get("/categories")
      .set("Authorization", adminToken);
    const categogoryTobeUpdateId = categoryTobeUpdateRequest.body[1].id;

    const response = await request(app)
      .patch(`/categories/${categogoryTobeUpdateId}`)
      .set("Authorization", userToken)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /categories/:id -  Must be able to soft delete category", async () => {
    await request(app).post("/categories").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const CategoryTobeDeleted = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/categories/${CategoryTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findCategory = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(findCategory.body[0].isActive).toBe(false);
  });

  test("DELETE /categories/:id -  should not be able to delete category not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const CategoryTobeDeleted = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/categories/${CategoryTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
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
