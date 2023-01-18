import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { Location } from "../../entities/location.entity";
import { mockedAdmin, mockedAdminLogin, mockedCreateLocation, mockedUpdateLocation, mockedUser, mockedUserLogin } from "../mocks/createUser";

describe("Testing Locations routes", () => {
  let connection: DataSource;
  const locationRepo = AppDataSource.getRepository(Location)

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    await request(app).post("/user").send(mockedUser);
    await request(app).post("/user").send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to list all locations", async () => {
    const login = await request(app).post("/login").send(mockedAdminLogin)

    const location = locationRepo.create(mockedCreateLocation)
    await locationRepo.save(location);
    
    const allLocations = await request(app).get("/location").set("Authorization", `Bearer ${login.body.token}`);;

    expect(allLocations.status).toBe(200);
    expect(allLocations.body).toHaveProperty("map");
    expect(allLocations.body).toHaveLength(1);
  });

  test("Should be able to list one location", async () => {
    const login = await request(app).post("/login").send(mockedAdminLogin)

    const location = locationRepo.create(mockedCreateLocation)
    await locationRepo.save(location);
    
    const oneLocation = await request(app).get(`/location/${location.id}`).set("Authorization", `Bearer ${login.body.token}`);;

    expect(oneLocation.status).toBe(200);
    expect(oneLocation.body).toHaveProperty("id");
    expect(oneLocation.body).toHaveProperty("street");
    expect(oneLocation.body).toHaveProperty("state");
    expect(oneLocation.body).toHaveProperty("city");
    expect(oneLocation.body).toHaveProperty("complement");
  });

  test("Should be able to update the location", async () => {
    const login = await request(app).post("/login").send(mockedAdminLogin)

    const location = locationRepo.create(mockedCreateLocation)
    await locationRepo.save(location);

    const location1 = await request(app)
      .patch(`/location/${location.id}`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedUpdateLocation);

    expect(location1.status).toBe(200);
    expect(location1.body.state).toBe("Sp");
  });

  test("Must be admin to be able to list locations", async () => {
    const login = await request(app).post("/login").send(mockedUserLogin)

    const location = locationRepo.create(mockedCreateLocation)
    await locationRepo.save(location);

    const response = await request(app)
      .patch(`/location/${location.id}`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedUpdateLocation);

    expect(response.status).toBe(403);
  });

  test("must be logged in to use route", async () => {
    const login = await request(app).post("/login").send(mockedUserLogin)

    const location = locationRepo.create(mockedCreateLocation)
    await locationRepo.save(location);

    const response = await request(app)
      .patch(`/location/${location.id}`)
      .send(mockedUpdateLocation);

    expect(response.status).toBe(401);
  });

  test("must not update an invalid location", async () => {
    const login = await request(app).post("/login").send(mockedAdminLogin)

    const location = locationRepo.create(mockedCreateLocation)
    await locationRepo.save(location);
    
    const response = await request(app)
      .patch(`/location/8be6fd09-bed0-4bed-a58d-e1cc4f28d90b`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedUpdateLocation);

    expect(response.status).toBe(404);
  });
});
