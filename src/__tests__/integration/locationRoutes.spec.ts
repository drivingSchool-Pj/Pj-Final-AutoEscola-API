import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

describe("Testing user routes", () => {
  let connection: DataSource;
  const userRepo = AppDataSource.getRepository(User);

  const user = {
    name: "batata",
    email: "batata@batata.com",
    password: "batata",
    contact: 40028922,
    age: 98,
    cpf: "999.999.999-99",
    isAdm: true,
    typeCategorie: "A",
    address: {
      street: "rua batata",
      complement: "perto do ceasa",
      number: 666,
      city: "Ananindeua",
      state: "PA",
    },
  };

  const loc = {
    street: "rua batata",
    state: "Acre",
    city: "Ananindeua",
    complement: "perto do ceasa",
  };

  const userLogin = {
    email: "batata@batata.com",
    password: "batata",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    await request(app).post("/user").send(user);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create location", async () => {
    const userLogged = await request(app).post("/login").send(userLogin);
    const location = await request(app)
      .post("/location")
      .set("Authorization", `Bearer ${userLogged.body.token}`)
      .send(loc);
    expect(location.status).toBe(201);
    expect(location.body).toHaveProperty("id");
    expect(location.body).toHaveProperty("createdAt");
    expect(location.body).toHaveProperty("updatedAt");
    expect(location.body).toHaveProperty("street");
    expect(location.body).toHaveProperty("state");
    expect(location.body).toHaveProperty("city");
    expect(location.body).toHaveProperty("complement");
  });

  test("Should not be able to create a location without being adm", async () => {
    const location = await request(app).post("/location").send(loc);

    expect(location.status).toBe(401);
    expect(location.body).toHaveProperty("message");
  });

  test("Should be able to list all locations", async () => {
    await request(app).post("/location").send(loc);
    const allLocations = await request(app).get("/locations").send();

    expect(allLocations.status).toBe(200);
    expect(allLocations.body).toHaveProperty("map");
    expect(allLocations.body).toHaveLength(1);
  });

  test("Should be able to list one location", async () => {
    const location = await request(app).post("/location").send(loc);
    const oneLocation = await request(app)
      .get(`/locations/${location.body.id}`)
      .send();

    expect(oneLocation.status).toBe(200);
    expect(oneLocation.body).toHaveProperty("id");
    expect(oneLocation.body).toHaveProperty("createdAt");
    expect(oneLocation.body).toHaveProperty("updatedAt");
    expect(oneLocation.body).toHaveProperty("street");
    expect(oneLocation.body).toHaveProperty("state");
    expect(oneLocation.body).toHaveProperty("city");
    expect(oneLocation.body).toHaveProperty("complement");
  });

  test("Should be able to update the location", async () => {
    const userLogged = await request(app).post("/login").send(userLogin);
    const newLoc = {
      state: "vaticano",
    };
    const location = await request(app)
      .post("/location")
      .set("Authorization", `Bearer ${userLogged.body.token}`)
      .send(newLoc);

    expect(location.status).toBe(200);
    expect(location.body.state).toEqual("vaticano");
  });
});
