import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUser,
  mockedAdmin,
  mockedAdminLogin,

  mockedUserLogin,
  mockedInstructor,
  
} from "../../mocks/index";

describe("/Testing instructor routes", () => {
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
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    await request(app)
      .post("/instructor")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedInstructor);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /instructor -  Must be able to create a instructor", async () => {
    const instructor = await request(app).get("/instructor");
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    mockedInstructor.categoryId = instructor.body[0].id;
    const response = await request(app)
      .post("/instructor")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedInstructor);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("category");

    expect(response.status).toBe(201);
  });
  test("POST /instructors -  should not be able to create instructor not being admin", async () => {
    const instructor = await request(app).get("/instructor");
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    mockedInstructor.categoryId = instructor.body[0].id;
    const response = await request(app)
      .post("/properties")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedInstructor);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /instructor -  should not be able to create instructor that already exists", async () => {
    const categories = await request(app).get("/categories");
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    mockedInstructor.categoryId = categories.body[0].id;
    const response = await request(app)
      .post("/instructor")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedInstructor);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /instructor -  should not be able to create a instructor without authentication", async () => {
    const categories = await request(app).get("/categories");
    mockedInstructor.categoryId = categories.body[0].id;
    const response = await request(app)
      .post("/instructor")
      .send(mockedInstructor);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /instructor/:id -  should not be able to delete a instructor not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const InstructorTobeDeleted = await request(app)
      .get("/instructor")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/categories/${InstructorTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
  test("DELETE /instructor/:id -  Must be able to soft delete an instructor", async () => {
    await request(app).post("/instructor").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const InstructorTobeDeleted = await request(app)
      .get("/instructor")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/instructor/${InstructorTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findCategory = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(findCategory.body[0].isActive).toBe(false);
  });
  test("GET /instructor/:id -  must be able to list the informations of an instructor", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const instructor = await request(app).get("/instructor");
    const response = await request(app)
      .get(`/instructor/${instructor.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("instructor");
    expect(response.body.schedules[0]).toHaveProperty("id");
    expect(response.body.schedules[0]).toHaveProperty("name");
    expect(response.body.schedules[0]).toHaveProperty("categories");
    expect(response.body.schedules[0]).toHaveProperty("schedules");

    expect(response.body.schedules).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /instructor/:id -  should not be able to list informations of an instructor not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const instructors = await request(app).get("/instructors");
    const response = await request(app)
      .get(`/instructor/${instructors.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /instructor/:id -  should not be able to list the informations of an instructor not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const instructor = await request(app).get("/instructor");
    const response = await request(app)
      .get(`/instructor/${instructor.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /instructor -  Must be able to list all instructors", async () => {
    const response = await request(app).get("/instructor");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });
});
