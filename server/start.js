"use strict";

const PORT = process.env.PORT || 3000;
const app = require("../server");

app
  .listen(PORT, () => {
    console.info(`Server started on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("ERROR: ", err);
  });
