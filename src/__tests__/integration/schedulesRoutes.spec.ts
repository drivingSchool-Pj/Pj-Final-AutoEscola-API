import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedSchedule,
  mockedCreateLocation,
  mockedUser,
} from "../mocks/createUser";
import { Categories } from "../../entities/categories.entity";
import { Location } from "../../entities/location.entity";

describe("/schedules", () => {
  let connection: DataSource;
  const categoryRepo = AppDataSource.getRepository(Categories);
  const locationRepo = AppDataSource.getRepository(Location);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/user").send(mockedUser);
    await request(app).post("/user").send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /schedules -  should be able to create a schedule", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const users = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const location = locationRepo.create(mockedCreateLocation);
    await locationRepo.save(location);

    const instructorCreate = await request(app)
      .post("/instructors")
      .send({ id: users.body[0].id, category: "A" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const instructorGet = await request(app)
      .get("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const schedule = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({
        ...mockedSchedule,
        instructorsId: instructorGet.body[0].id,
        locationId: location.id,
        userId: users.body[0].id,
      });

    expect(schedule.body).toHaveProperty("date");
    expect(schedule.body).toHaveProperty("hour");
    expect(schedule.body.hour).toBe("10:30");
    expect(schedule.status).toBe(201);
  });

  test("POST /schedules -  must not be able to create a schedule that already exists on an instructor", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const users = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const location = locationRepo.create(mockedCreateLocation);
    await locationRepo.save(location);

    const instructorCreate = await request(app)
      .post("/instructors")
      .send({ id: users.body[0].id, category: "A" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const instructorGet = await request(app)
      .get("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({
        ...mockedSchedule,
        instructorsId: instructorGet.body[0].id,
        locationId: location.id,
        userId: users.body[0].id,
      });

    const schedule = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({
        ...mockedSchedule,
        instructorsId: instructorGet.body[0].id,
        locationId: location.id,
        userId: users.body[0].id,
      });

    expect(schedule.body).toHaveProperty("message");
    expect(schedule.body.message).toBe("Schedule unavailable");
    expect(schedule.status).toBe(409);
  });

  test("POST /schedules -  should not be able to create a schedule with an invalid instructor id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const users = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const location = locationRepo.create(mockedCreateLocation);
    await locationRepo.save(location);

    const instructorCreate = await request(app)
      .post("/instructors")
      .send({ id: users.body[0].id, category: "A" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const instructorGet = await request(app)
      .get("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const schedule = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({
        ...mockedSchedule,
        instructorsId: "b30296bb-c01b-4e6f-ad17-75b9bd4ea0ab",
        locationId: location.id,
        userId: users.body[0].id,
      });

    expect(schedule.body).toHaveProperty("message");
    expect(schedule.body.message).toBe("Instructor not found");
    expect(schedule.status).toBe(404);
  });

  test("POST /schedules -  should not be able to create a schedule with an invalid user id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const users = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const location = locationRepo.create(mockedCreateLocation);
    await locationRepo.save(location);

    const instructorCreate = await request(app)
      .post("/instructors")
      .send({ id: users.body[0].id, category: "A" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const instructorGet = await request(app)
      .get("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const schedule = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({
        ...mockedSchedule,
        instructorsId: instructorGet.body[0].id,
        locationId: location.id,
        userId: "b30296bb-c01b-4e6f-ad17-75b9bd4ea0ab",
      });

    expect(schedule.body).toHaveProperty("message");
    expect(schedule.body.message).toBe("User not found");
    expect(schedule.status).toBe(404);
  });

  test("POST /schedules -  should not be able to create a schedule with an invalid location id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const users = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const location = locationRepo.create(mockedCreateLocation);
    await locationRepo.save(location);

    const instructorCreate = await request(app)
      .post("/instructors")
      .send({ id: users.body[0].id, category: "A" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const instructorGet = await request(app)
      .get("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const schedule = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({
        ...mockedSchedule,
        instructorsId: instructorGet.body[0].id,
        locationId: "b30296bb-c01b-4e6f-ad17-75b9bd4ea0ab",
        userId: users.body[0].id,
      });

    expect(schedule.body).toHaveProperty("message");
    expect(schedule.body.message).toBe("Location not found");
    expect(schedule.status).toBe(404);
  });

  test("GET /schedules -  should be able to list a schedule", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const users = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const location = locationRepo.create(mockedCreateLocation);
    await locationRepo.save(location);

    const instructorCreate = await request(app)
      .post("/instructors")
      .send({ id: users.body[0].id, category: "A" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const instructorGet = await request(app)
      .get("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({
        ...mockedSchedule,
        instructorsId: instructorGet.body[0].id,
        locationId: location.id,
        userId: users.body[0].id,
      });
    const schedule = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(schedule.body[0]).toHaveProperty("date");
    expect(schedule.body[0]).toHaveProperty("hour");
    expect(schedule.body).toHaveLength(1);
    expect(schedule.status).toBe(200);
  });

  test("GET /schedules/:id -  should be able to list a user schedule", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const users = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const category = categoryRepo.create({ typeCategorie: "A" });
    await categoryRepo.save(category);

    const location = locationRepo.create(mockedCreateLocation);
    await locationRepo.save(location);

    const instructorCreate = await request(app)
      .post("/instructors")
      .send({ id: users.body[0].id, category: "A" })
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const instructorGet = await request(app)
      .get("/instructors")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({
        ...mockedSchedule,
        instructorsId: instructorGet.body[0].id,
        locationId: location.id,
        userId: users.body[0].id,
      });
    const schedule = await request(app)
      .get(`/schedules/user/${users.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(schedule.body[0]).toHaveProperty("date");
    expect(schedule.body[0]).toHaveProperty("hour");
    expect(schedule.body).toHaveLength(1);
    expect(schedule.status).toBe(200);
  });
});
