import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import {
  invalidMockedUser,
  mockedAdmin,
  mockedAdminLogin,
  mockedAdminUpdate,
  mockedUser,
  mockedUserLogin,
} from "../mocks/createUser";

describe("Testing user routes", () => {
  let connection: DataSource;
  const userRepo = AppDataSource.getRepository(User);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    const users = await userRepo.find();
    await userRepo.remove(users);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -  Must be able to create a user", async () => {
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("typeCategorie");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Ronaldinho Gauchos");
    expect(response.body.email).toEqual("ronaldinho2@gmail.com");
    expect(response.body.isAdm).toEqual(false);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /users - Should not be able to create user with invalid body", async () => {
    const response = await request(app).post("/user").send(invalidMockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /users - SShould not be able to create user with email already registered", async () => {
    await request(app).post("/user").send(mockedUser);
    const response = await request(app).post("/user").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Email already exists!");
    expect(response.status).toBe(409);
  });

  test("GET /users - Should be able to list all users", async () => {
    await request(app).post("/user").send(mockedAdmin);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /users - Should not be able to list users without authentication", async () => {
    await request(app).post("/user").send(mockedUser);
    const response = await request(app).get("/user");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization token");
    expect(response.status).toBe(401);
  });

  test("GET /users - Should not be able to list users not being admin", async () => {
    await request(app).post("/user").send(mockedUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Not permission");
    expect(response.status).toBe(403);
  });

  test("PATCH /user/:id -  should not be able to update user without authentication", async () => {
    await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const userTobeUpdate = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/user/${userTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization token");
    expect(response.status).toBe(401);
  });

  test("PATCH /user/:id -  Must be able to update a user", async () => {
    await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const userTobeUpdate = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/user/${userTobeUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedAdminUpdate);

    expect(response.body[0]).toHaveProperty("email");
    expect(response.status).toBe(200);
  });

  test("PATCH /user/:id -  Should not be able to update user without authentication", async () => {
    await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const userTobeUpdate = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/user/${userTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization token");
    expect(response.status).toBe(401);
  });

  test("PATCH /user/:id -  Should be able to update another user being adm", async () => {
    await request(app).post("/user").send(mockedAdmin);
    await request(app).post("/user").send(mockedUser);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const userTobeUpdate = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/user/${userTobeUpdate.body[1].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedAdminUpdate);

    expect(response.body[0]).toHaveProperty("email");
    expect(response.status).toBe(200);
  });

  test("PATCH /user/:id -  Should not be able to update other without being adm", async () => {
    const userAdm = await request(app).post("/user").send(mockedAdmin);
    const userNotAdm = await request(app).post("/user").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    if (!userNotAdm.body.isAdm) {
      const response = await request(app)
        .patch(`/user/${userAdm.body.id}`)
        .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
        .send(mockedAdminUpdate);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        "Not allowed to update another user without adm permission"
      );
      expect(response.status).toBe(404);
    }
  });

  test("DELETE /users - Should be able to delete", async () => {
    const user = await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/user/${user.body.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).not.toHaveProperty("message");
    expect(response.status).toBe(204);
  });

  test("DELETE /users/:id -  should not be able to delete user without authentication", async () => {
    await request(app).post("/user").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const UserTobeDeleted = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/user/${UserTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
