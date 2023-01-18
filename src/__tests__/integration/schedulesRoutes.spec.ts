import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedCategory,
  mockedUser,
} from "../mocks/createUser";

describe("/schedules", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    // await request(app).post("/users").send(mockedUser);
    // await request(app).post("/users").send(mockedAdmin);

    // const adminLoginResponse = await request(app)
    //   .post("/login")
    //   .send(mockedAdminLogin);

    // const categories = await request(app)
    //   .post("/categories")
    //   .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    //   .send(mockedCategory);

    // mockedInstructor.category = categories.body.id;
    // mockedInstructor2.category = categories.body.id;

    // await request(app)
    //   .post("/instructor")
    //   .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    //   .send(mockedInstructor);

    // await request(app)
    //   .post("/instructor")
    //   .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    //   .send(mockedInstructor2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /schedules -  should be able to create a schedule", async () => {
    await request(app).post("/user").send(mockedUser);
    await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const users = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const instructor = await request(app).get("/instructors");

    // const userLoginResponse = await request(app)
    //   .post("/login")
    //   .send(mockedUserLogin);
    // mockedSchedule.instructorId = instructor.body[0].id;
    // mockedSchedule.userId = users.body[1].id;
    // const response = await request(app)
    //   .post("/schedules")
    //   .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
    //   .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(201);
  });

  // test("POST /schedules -  must not be able to create a schedule that already exists on an instructor", async () => {
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   const users = await request(app)
  //     .get("/users")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  //   const instructor = await request(app).get("/instructor");
  //   const userLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedUserLogin);
  //   mockedSchedule.instructorId = instructor.body[1].id;
  //   mockedSchedule.userId = users.body[1].id;
  //   mockedSchedule.hour = "11:30";
  //   await request(app)
  //     .post("/schedules")
  //     .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  //     .send(mockedSchedule);
  //   mockedSchedule.userId = users.body[0].id;
  //   const response = await request(app)
  //     .post("/schedules")
  //     .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  //     .send(mockedSchedule);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(409);
  // });

  // test("POST /schedules -  should not be able to create a schedule with an invalid date", async () => {
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   const users = await request(app)
  //     .get("/users")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  //   const instructor = await request(app).get("/instructor");
  //   const userLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedUserLogin);
  //   mockedScheduleInvalidDate.instructorId = instructor.body[0].id;
  //   mockedScheduleInvalidDate.userId = users.body[1].id;
  //   const response = await request(app)
  //     .post("/schedules")
  //     .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  //     .send(mockedScheduleInvalidDate);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(400);
  // });

  // test("POST /schedules -  should not be able to create a schedule with an invalid hour < 8", async () => {
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   const users = await request(app)
  //     .get("/users")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  //   const instructor = await request(app).get("/instructor");
  //   const userLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedUserLogin);
  //   mockedScheduleInvalidHourLess8.instructorId = instructor.body[0].id;
  //   mockedScheduleInvalidHourLess8.userId = users.body[1].id;
  //   const response = await request(app)
  //     .post("/schedules")
  //     .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  //     .send(mockedScheduleInvalidHourLess8);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(400);
  // });

  // test("POST /schedules -  should not be able to create a schedule with an invalid hour > 17", async () => {
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   const users = await request(app)
  //     .get("/users")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  //   const instructor = await request(app).get("/instructor");
  //   const userLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedUserLogin);
  //   mockedScheduleInvalidHourMore17.instructorId = instructor.body[0].id;
  //   mockedScheduleInvalidHourMore17.userId = users.body[1].id;
  //   const response = await request(app)
  //     .post("/schedules")
  //     .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  //     .send(mockedScheduleInvalidHourMore17);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(400);
  // });

  // test("POST /schedules -  should not be able to create a schedule with an invalid instructor id", async () => {
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   const users = await request(app)
  //     .get("/users")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  //   const userLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedUserLogin);
  //   mockedScheduleInvalidInstructorId.userId = users.body[1].id;
  //   const response = await request(app)
  //     .post("/schedules")
  //     .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
  //     .send(mockedScheduleInvalidInstructorId);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(404);
  // });

  // test("POST /schedules -  should not be able to create a schedule without authentication", async () => {
  //   const adminLoginResponse = await request(app)
  //     .post("/login")
  //     .send(mockedAdminLogin);
  //   const users = await request(app)
  //     .get("/users")
  //     .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  //   const instructor = await request(app).get("/instructor");
  //   mockedSchedule.instructorId = instructor.body[0].id;
  //   mockedSchedule.userId = users.body[1].id;
  //   const response = await request(app).post("/schedules").send(mockedSchedule);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(401);
  // });
});
