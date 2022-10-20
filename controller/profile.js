const clientModel = require("../models/clients");
const { clientSchema } = require("../helpers/clientValidator");
const createError = require("http-errors");

const getProfile = async (req, res, next) => {
  const userId = req.user.id;

  await clientModel
    .findOne({ userId })
    .then((data) => {
      if (!data)
        return next(
          createError(404, `The client with UserId: ${userId} was not found`)
        );
      return res.status(200).json(data);
    })
    .catch((err) => next(createError(500, err)));
};

const updateProfile = async (req, res, next) => {
  const userId = req.user.id;
  const data = req.body;

  await clientSchema
    .validateAsync(data)
    .then(async (valid) => {
      await clientModel
        .findOneAndUpdate({ userId }, valid)
        .then((r) => {
          if (!r)
            return next(
              createError(
                404,
                `Cannot update client profile with UserId: ${UserId}, maybe it was not found`
              )
            );
          return res
            .status(204)
            .send({ message: "The Client profile was updated successfully" });
        })
        .catch((err) => next(createError(500, err)));
    })
    .catch((err) => next(createError(422, err)));
};

module.exports = {
  getProfile,
  updateProfile
};
