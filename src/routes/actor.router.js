const {
  getAll,
  create,
  getOne,
  update,
  remove,
} = require("../controllers/actor.controllers");
const express = require("express");

const actorRouter = express.Router();

actorRouter.route("/").get(getAll).post(create);

actorRouter.route("/:id").get(getOne).put(update).delete(remove);

module.exports = actorRouter;
