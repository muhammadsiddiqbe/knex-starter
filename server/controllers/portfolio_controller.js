"use strict";

const { Portfolio } = require("../models");

const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require("../helpers/error_helper");

const postPortfolios = (req, res, next) => {
  const props = req.body;
  const files = req.files;

  if (!files.image || !props.link) {
    return next(
      createError({
        status: BAD_REQUEST,
        message: "`image` and `link` are required fields",
      })
    );
  }

  Portfolio.create(props, files)
    .then((portfolio) => {
      res.json({
        ok: true,
        message: "Portfolio added",
        portfolio,
      });
    })
    .catch(next);
};

const getPortfolios = (req, res, next) => {
  const props = req.body;

  Portfolio.findAll(props)
    .then((portfolios) =>
      res.json({
        ok: true,
        message:
          props.limit && props.offset
            ? portfolios.length + " portfolios found"
            : "You can set offset and limit to get N portfolios at X page",
        portfolios,
      })
    )
    .catch(next);
};

const deletePortfolios = (req, res, next) => {
  const props = req.body;

  if (!props.id) {
    return next(
      createError({
        status: BAD_REQUEST,
        message: "`id` is required field",
      })
    );
  }

  Portfolio.destroy(props.id)
    .then((deleteCount) =>
      res.json({
        ok: true,
        message: `User '${props.id}' deleted`,
        deleteCount,
      })
    )
    .catch(next);
};

module.exports = {
  postPortfolios,
  getPortfolios,
  deletePortfolios,
};
