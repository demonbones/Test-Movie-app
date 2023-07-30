const {
  getAll,
  create,
  getOne,
  update,
  remove,
  setMovieGenres,
  setMovieActors,
  setMovieDirectors,
} = require("../controllers/movie.controllers");
const express = require("express");

const movieRouter = express.Router();

movieRouter.route("/").get(getAll).post(create);

movieRouter.route("/:id").get(getOne).put(update).delete(remove);

movieRouter.route("/:id/genres").post(setMovieGenres);

movieRouter.route("/:id/actors").post(setMovieActors);

movieRouter.route("/:id/directors").post(setMovieDirectors);

module.exports = movieRouter;
