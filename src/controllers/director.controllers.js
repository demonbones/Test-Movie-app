const catchError = require("../utils/catchError");
const Director = require("../models/Director");

const getAll = catchError(async (req, res) => {
  const directors = await Director.findAll();
  return res.json(directors);
});

const create = catchError(async (req, res) => {
  const director = await Director.create(req.body);
  return res.status(201).json(director);
});
const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const director = await Director.findByPk(id);
  if (!director) return res.sendStatus(404);
  return res.json(director);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const director = await Director.update(req.body, {
    where: { id },
    returning: true,
  });
  if (director[0] === 0) return res.sendStatus(404);
  return res.json(director[1][0]);
});
const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const director = await Director.findByPk(id);
  if (!director) return res.sendStatus(404);
  await Director.destroy({ where: { id } });
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  create,
  getOne,
  update,
  remove,
};
