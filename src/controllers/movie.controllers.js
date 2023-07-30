const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const getAll = catchError(async (req, res) => {
  const movie = await Movie.findAll({ include: [Actor, Director, Genre] });
  return res.json(movie);
});
const create = catchError(async (req, res) => {
  const movie = await Movie.create(req.body);
  return res.status(201).json(movie);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie) return res.sendStatus(404);
  return res.json(movie);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (movie[0] === 0) return res.sendStatus(404);
  return res.json(movie[1][0]);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie) return res.sendStatus(404);
  await Movie.destroy({ where: { id } });
  return res.sendStatus(204);
});

const setMovieActors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie) return res.sendStatus(404);
  await movie.setActors(req.body);
  const actors = await movie.getActors();
  return res.json(actors);
});

const setMovieDirectors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie) return res.sendStatus(404);
  await movie.setDirectors(req.body);
  const directors = await movie.getDirectors();
  return res.json(directors);
});

const setMovieGenres = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie) return res.sendStatus(404);
  await movie.setGenres(req.body);
  const genres = await movie.getGenres();
  return res.json(genres);
});

module.exports = {
  getAll,
  create,
  getOne,
  update,
  remove,
  setMovieGenres,
  setMovieActors,
  setMovieDirectors,
};
