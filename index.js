"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = require("./server");

app
  .listen(PORT, () => {
    console.info(`Server started on http://loczalhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("ERROR: ", err);
  });
