const request = require("supertest");
const app = require("../app.js");
require("../models");

let id;

test("GET /actors retorna un array y status 200", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors retorna status 200 y coincidir con el body", async () => {
  const actor = {
    firstName: "stiven",
    lastName: "drada rodriguez",
    nationality: "colombiano",
    image: "https://xsgames.co/randomusers/assets/avatars/pixel/24.jpg",
    birthday: "1994-10-10",
  };
  const res = await request(app).post("/actors").send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(actor.firstName);
});

test("PUT /actors/:id retorna un objeto y coincidir con el body", async () => {
  const updateActor = {
    image: "https://xsgames.co/randomusers/assets/avatars/pixel/6.jpg",
  };
  const res = await request(app).put(`/actors/${id}`).send(updateActor);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.image).toBe(updateActor.image);
});

test("DELETE /actors/:id retornar 204", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
