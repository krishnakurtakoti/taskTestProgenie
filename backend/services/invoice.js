const DB = require("../util/db");
const logger = require("../util/log");
const APIFeatures = require("../util/apiFeature");
const productModel = require("../models/invoice.model");
const path = require("path");

var Tesseract = require("tesseract.js");

module.exports.productList = async (query) => {
  if (query.pagination === "false") {
    const records = await this.getProductWithoutpagination({});
    return records;
  }
  if (!query.status) query.status = { $ne: "deleted" };
  const features = await new APIFeatures(query)
    .filter()
    .orRegexMultipleSearch("searchFilter")
    .sort()
    .paginate()
    .exec(productModel);
  return features.data;
};



module.exports.productDetailsById = async (req, res, next) => {
  const filter = { _id: req.params.id };
  const projection = {};
  const option = {};
  const product = await productModel.findOne(filter, projection, option);
  return product;
};


/**
 * service method to save company details
 * @param {*} data
 */
module.exports.saveProduct = async (data) => {
  var invoiceObject = {};
  var product;
  const filePath = path.join(__dirname, "../", "public", data.image.imageURL);
  const imageName = data.image.imageURL;
  const directory = "backend/public";

  await Tesseract.recognize(
    filePath,
    //'https://tesseract.projectnaptha.com/img/eng_bw.png',
    "eng"
  ).then(({ data: { text } }) => {
    var invoiceNumber = text.split("Tnvoice No")[1];
    var AmountInWords = text.split("Amountin Words")[1];
    var invoiceDate = text.split("Invoice Date")[1];

    if (data.image) {
      imageURL = data.image.imageURL;
      logger.data("image URL: ", imageURL);
      data.invoiceImage = imageURL;
    }
    invoiceObject = {
      invoiceNumber: invoiceNumber,
      //companyName: { type: String },
      totalBill: AmountInWords,
      invoiceDate: invoiceDate,
      invoiceImage: data.invoiceImage,
    };
    console.log("insertData", invoiceObject);
  });
  product = await productModel.create(invoiceObject);
  return product;
};


module.exports.getProductWithoutpagination = async (condition) => {
  if (!condition.status) condition.status = {$ne: "deleted"};
  const records = await productModel.find(condition);
  return records;
}