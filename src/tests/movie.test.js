const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

require("../models");

let id;

test("GET /movies retorna status 200 y un array", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body[0].genres).toBeDefined();
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
});

test("POST /movies retorna status 201 y un objeto", async () => {
  const newMovie = {
    name: "testing",
    image: "url.testin.com",
    synopsis: "resumen",
    releaseYear: "2023-07-30",
  };
  const res = await request(app).post("/movies").send(newMovie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body).toBeInstanceOf(Object);
});

test("PUT /movies/:id retorna un objeto y coincide con el body", async () => {
  const updateMovie = {
    name: "jackie chan",
  };
  const res = await request(app).put(`/movies/${id}`).send(updateMovie);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.name).toBe(updateMovie.name);
});

test("POST /movies/:id/actors retona un array y concide con el body", async () => {
  const newActor = await Actor.create({
    firstName: "stiven",
    lastName: "drada rodriguez",
    nationality: "colombiano",
    image: "https://xsgames.co/randomusers/assets/avatars/pixel/24.jpg",
    birthday: "1994-10-10",
  });

  const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([newActor.id]);
  await newActor.destroy();
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body[0].firstName).toBe(newActor.firstName);
});

test("POST /movies/:id/directors retona un array y concide con el body", async () => {
  const newDirector = await Director.create({
    firstName: "Felix",
    lastName: "cross",
    nationality: "usa",
    image: "https://xsgames.co/randomusers/assets/avatars/pixel/24.jpg",
    birthday: "1954-02-21",
  });

  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([newDirector.id]);
  await newDirector.destroy();
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body[0].lastName).toBe(newDirector.lastName);
});

test("POST /movies/:id/genres retona un array y concide con el body", async () => {
  const newGenre = await Genre.create({ name: "accion" });
  const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([newGenre.id]);
  await newGenre.destroy();
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body[0].name).toBe(newGenre.name);
});

test("DELETE /movies/:id retorna status 204", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
