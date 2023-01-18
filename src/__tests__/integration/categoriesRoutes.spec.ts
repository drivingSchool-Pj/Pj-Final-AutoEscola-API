import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedInstructor,
  mockedUser,
  mockedUserLogin,
} from "../mocks/createUser";
import { Categories } from "../../entities/categories.entity";

describe("/categories routes", () => {
  let connection: DataSource;
  const categoryRepo = AppDataSource.getRepository(Categories);
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /categories/instructor/:id -  must be able to list the categories of an instructor", async () => {
    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);
    const userBody: any = await request(app).post("/user").send(mockedUser);
    await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/instructors")
      .send({ id: userBody.body.id, category: "A" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body.message).toBe("Instructor created successfully");

    expect(response.status).toBe(201);
  });

  test("GET /categories/instructors/:id -  should not be able to list the categories of a instructor without authentication", async () => {
    const instructor = await request(app).get("/instructors");
    const response = await request(app).get(
      `/categories/instructors/${instructor.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /categories/instructor/:id -  should not be able to list the categories of a instructor not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const instructor = await request(app).get("/instructors");
    const response = await request(app)
      .get(`/categories/instructors/${instructor.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
