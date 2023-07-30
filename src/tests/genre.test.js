const request = require("supertest");
const app = require("../app");

let id;
test("GET /genres retorna status 200 y un array ", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres retorna status 201 y coincide con el body", async () => {
  const newGenre = {
    name: "Comedia",
  };
  const res = await request(app).post("/genres").send(newGenre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newGenre.name);
  expect(res.body.id).toBeDefined();
});

test("PUT /genres/:id retorna un objeto y coincidir con el body", async () => {
  const updateGenre = {
    name: "accion",
  };
  const res = await request(app).put(`/genres/${id}`).send(updateGenre);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.name).toBe(updateGenre.name);
});

test("DELETE /genres/:id retorna status 204 ", async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});
