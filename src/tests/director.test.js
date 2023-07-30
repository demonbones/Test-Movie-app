const request = require("supertest");
const app = require("../app");
let id;
test("GET /directors retorna status 200 y un array ", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST  /directors retorna status 201 y coinside con el body", async () => {
  const newDirector = {
    firstName: "stiven",
    lastName: "drada rodriguez",
    nationality: "colombiano",
    image: "https://xsgames.co/randomusers/assets/avatars/pixel/24.jpg",
    birthday: "1994-10-10",
  };
  const res = await request(app).post("/directors").send(newDirector);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(newDirector.firstName);
  expect(res.body.id).toBeDefined();
});

test("PUT /director/:id retornar un objeto y coincide con el body", async () => {
  const updateDirector = {
    image: "https://xsgames.co/randomusers/assets/avatars/pixel/45.jpg",
  };
  const res = await request(app).put(`/directors/${id}`).send(updateDirector);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.image).toBe(updateDirector.image);
});

test("DELETE /directors/:id retorna status 204", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
