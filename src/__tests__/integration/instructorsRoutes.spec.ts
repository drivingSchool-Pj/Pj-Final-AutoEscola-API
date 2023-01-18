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
import { Instructors } from "../../entities/instructors.entity";
import { User } from "../../entities/user.entity";

describe("/instructor", () => {
  let connection: DataSource;
  const categoryRepo = AppDataSource.getRepository(Categories);
  const instructorRepo = AppDataSource.getRepository(Instructors);
  const userRepo = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    const users = await userRepo.find();
    const instructor = await instructorRepo.find();

    await instructorRepo.remove(instructor);
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /instructor -  Must be able to create a instructor", async () => {
    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const user = await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({ ...mockedInstructor, id: user.body.id });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Instructor created successfully");

    expect(response.status).toBe(201);
  });

  test("POST /instructor -  should not be able to create instructor that already exists", async () => {
    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const user = await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    await request(app)
      .post("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({ ...mockedInstructor, id: user.body.id });

    const response = await request(app)
      .post("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({ ...mockedInstructor, id: user.body.id });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /instructor -  should not be able to create instructor not being admin", async () => {
    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const user = await request(app).post("/user").send(mockedUser);

    const loginUser = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .post("/instructors")
      .set("Authorization", `Bearer ${loginUser.body.token}`)
      .send({ ...mockedInstructor, id: user.body.id });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Not permission");
    expect(response.status).toBe(403);
  });

  test("POST /instructor -  should not be able to create a instructor without authentication", async () => {
    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const user = await request(app).post("/user").send(mockedAdmin);

    const response = await request(app)
      .post("/instructors")
      .send({ ...mockedInstructor, id: user.body.id });

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization token");

    expect(response.status).toBe(401);
  });

  test("GET /instructor -  Must be able to list all instructors", async () => {
    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const user = await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    await request(app)
      .post("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({ ...mockedInstructor, id: user.body.id });
    const response = await request(app).get("/instructors");

    expect(response.status).toBe(200);
  });
});
