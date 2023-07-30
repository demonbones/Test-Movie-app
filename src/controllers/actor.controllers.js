const catchError = require("../utils/catchError");
const Actor = require("../models/Actor");

const getAll = catchError(async (req, res) => {
  const actors = await Actor.findAll();
  return res.status(200).json(actors);
});

const create = catchError(async (req, res) => {
  const actor = await Actor.create(req.body);
  return res.status(201).json(actor);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const actor = await Actor.findByPk(id);
  if (!actor) return res.status(404).json({ message: "Actor not found" });
  return res.json(actor);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const actor = await Actor.update(req.body, {
    where: { id },
    returning: true,
  });
  if (actor[0] === 0) return res.sendStatus(404);
  return res.json(actor[1][0]);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const actor = await Actor.findByPk(id);
  if (!actor) return res.sendStatus(404);
  await Actor.destroy({ where: { id } });
  return res.sendStatus(204);
});

module.exports = { getAll, create, getOne, update, remove };
