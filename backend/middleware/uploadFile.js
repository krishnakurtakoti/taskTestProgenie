const fs = require("fs");
const uuidv4 = require("uuidv4");
const logger = require("../util/log");

const createDirectoryIfNotExists = (name) => {
  let directory = __dirname + `/./../${name}`;
  let stat = null;
  try {
    stat = fs.statSync(directory);
    logger.info("Directory exists");
  } catch (err) {
    fs.mkdirSync(directory);
    logger.info("Directory Created");
  }
  return directory;
};

module.exports.uploadBase64Image = (req, res, next) => {
    //console.log('rrrrr', req)
  if (!req.body.image) {
    return next();
  }
  const directory = createDirectoryIfNotExists("public");
  const image = req.body.image;
  let uuidString = uuidv4.uuid();
  console.log(uuidString);
  uuidString = uuidString.replace(/-/g, "");
  const imageName =
    new Date().toJSON().slice(0, 10) + "_" + uuidString + ".jpeg";
  const imageBase64 = image && image.imageBase64;
  console.log(imageBase64)
  if (!imageBase64) return next();
  const base64Data = imageBase64.replace(/^data:image\/(\w)*;base64,/, "");
  console.log(directory);
  fs.writeFile(
    `${directory}/${imageName}`,
    base64Data,
    "base64",
    (err, result) => {
      if (err) {
        logger.error("Image not saved, uploading user = ", req.user.username);
        logger.error(err.toString());
        delete image.imageBase64;
        return next();
      }
      logger.data("Saving image from ", req.originalUrl);
      image.imageURL = imageName;
      console.log("name of image:", image.imageURL)
      return next();
    }
  );
};

// const uploadFile = (_image, req) => {
//   if (!_image) {
//     return next();
//   }
//   const directory = createDirectoryIfNotExists("public");
//   const image = _image;
//   let uuidString = uuidv4.uuid();
//   console.log(uuidString);
//   uuidString = uuidString.replace(/-/g, "");
//   const imageName =
//     new Date().toJSON().slice(0, 10) + "_" + uuidString + ".jpeg";
//   const imageBase64 = image && image.imageBase64;
//   if (!imageBase64) return next();
//   const base64Data = imageBase64.replace(/^data:image\/(\w)*;base64,/, "");
//   console.log(directory);
//   fs.writeFile(
//     `${directory}/${imageName}`,
//     base64Data,
//     "base64",
//     (err, result) => {
//       if (err) {
//         logger.error("Image not saved, uploading user = ", req.user.username);
//         logger.error(err.toString());
//         delete image.imageBase64;
//         return next();
//       }
//       logger.data("Saving image from ", req.originalUrl);
//     }
//   );
//   image["imageURL"] = imageName;
//   return image;
// };

// module.exports.uploadBase64Images = async (req, res, next) => {
//   if (!req.body.images) {
//     return next();
//   }
//   const images = req.body.images;
//   const uploadFiles = images.map((image) => {
//     const uploadSingleImage = uploadFile(image, req);
//     if (uploadSingleImage) return true;
//   });
//   await Promise.all(uploadFiles);
//   logger.data("uploadFiles", uploadFiles);
//   logger.data("images uploaded: ", images);
//   return next();
// };