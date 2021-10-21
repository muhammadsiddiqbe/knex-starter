"use strict";

const router = require("express").Router();
const {
  postPortfolios,
  getPortfolios,
  deletePortfolios,
} = require("../controllers/portfolio_controller");

router
  .route("/portfolios")
  .post(postPortfolios)
  .get(getPortfolios)
  .delete(deletePortfolios);

module.exports = router;
