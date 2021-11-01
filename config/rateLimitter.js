"use strict";

module.exports = {
  points: process.env.RATE_POINT || 10, // N points per T second
  duration: process.env.RATE_DURATION || 1, // PER SECOND
};
