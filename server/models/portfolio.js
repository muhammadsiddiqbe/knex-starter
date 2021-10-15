"use strict";

const createGuts = require("../helpers/model-guts");

const name = "Portfolio";
const tableName = "portfolios";

const selectableProps = ["id", "image", "link", "updated_at", "created_at"];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const create = async (props, files = "empty") => {
    let file;
    let uploadPath;
    file = files.image;

    if (file) {
      const imageType = file.mimetype.split("/");
      const imageName = file.md5 + "." + imageType[1];

      if (imageType[0] !== "image") {
        throw new Error("File must be an image");
      }

      uploadPath = require("path").join(
        __dirname + "../../../images/" + imageName
      );

      file.mv(uploadPath, async function (err) {
        if (err) throw err;
        const imageLink = process.env.FULL_DOMAIN + "/images/" + imageName;

        return await guts.create(
          {
            image: imageLink,
            link: props.link,
          },

          uploadPath
        );
      });
    } else {
      throw new Error("No image uploaded");
    }
  };

  const get = async (props) => {
    return await guts.findAll(props);
  };

  return {
    ...guts,
    create,
    get,
  };
};
