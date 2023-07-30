const {
  getAll,
  create,
  getOne,
  update,
  remove,
} = require("../controllers/director.controllers");
const express = require("express");

const directorRouter = express.Router();

directorRouter.route("/").get(getAll).post(create);
directorRouter.route("/:id").get(getOne).put(update).delete(remove);

module.exports = directorRouter;
