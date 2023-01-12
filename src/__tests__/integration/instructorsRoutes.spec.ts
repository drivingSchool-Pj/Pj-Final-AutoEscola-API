import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedUser,
  mockedAdmin,
  mockedAdminLogin,
  mockedCategory,
  mockedUserLogin,
  mockedInstructor,
  mockedInstructorInvalidCategoryId,
} from "../mocks/index";

describe("/instructor", () => {
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
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /instructor -  Must be able to create a instructor", async () => {
    const categories = await request(app).get("/categories");
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    mockedInstructor.categoryId = categories.body[0].id;
    const response = await request(app)
      .post("/instructor")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedInstructor);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("category");
    expect(response.body).toHaveProperty("sold");
    expect(response.body).toHaveProperty("schedules");

    expect(response.status).toBe(201);
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

  test("POST /instructor -  should not be able to create instructor not being admin", async () => {
    const categories = await request(app).get("/categories");
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    mockedInstructor.categoryId = categories.body[0].id;
    const response = await request(app)
      .post("/instructor")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedInstructor);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /instructor -  should not be able to create property without authentication", async () => {
    const categories = await request(app).get("/categories");
    mockedInstructor.categoryId = categories.body[0].id;
    const response = await request(app)
      .post("/properties")
      .send(mockedInstructor);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /instructor -  should not be able to create instructor with invalid categoryId", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .post("/instructor")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedInstructorInvalidCategoryId);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET /instructor -  Must be able to list all instructors", async () => {
    const response = await request(app).get("/instructor");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });
});
