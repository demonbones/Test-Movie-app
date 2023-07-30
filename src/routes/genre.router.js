const {
  getAll,
  create,
  getOne,
  update,
  remove,
} = require("../controllers/genre.controllers");
const express = require("express");

const genreRouter = express.Router();

genreRouter.route("/").get(getAll).post(create);
genreRouter.route("/:id").get(getOne).put(update).delete(remove);

module.exports = genreRouter;
