const logger = require("../util/log");
const responser = require("../util/responser");
const productService = require("../services/invoice");

module.exports.listProducts = async (req, res, next) => {
  logger.info("START: Product Handler: Get list of products");
  const productListData = await productService.productList(req.query);
  responser.send(200, "invoice", "IN_S001", req, res, productListData);
};

module.exports.productDetailsById = async (req, res, next) => {
  logger.info("START: Product Handler: Get product by Id");
  const vendorDetails = await productService.productDetailsById(req, res, next);
  responser.send(200, "invoice", "IN_S004", req, res, vendorDetails);
};

module.exports.saveInvoiceDetails = async (req, res, next) => {
  logger.info("START: Invoice Handler: Save tax invoice");
  const result = await productService.saveProduct(req.body);
  logger.data("saved INVOICE details", result);
  return responser.send(200, "invoice", "IN_S002", req, res, result);
};

// module.exports.updateProductDetailsById = async (req, res, next) => {
//   logger.info("START: Product Handler: Update product details");
//   const body = req.body;
//   const productId = req.params["id"];
//   const data = await productService.findOneAndUpdate({ _id: productId }, body);
//   logger.data("product updated with response: ", data);
//   return responser.send(200, "product", "PR_S003", req, res, data);
// };

// module.exports.deleteProductById = async (req, res, next) => {
//   logger.info("START: Product Handler: Delete product record by Id");
//   const body = req.body;
//   const productId = req.params["id"];
//   const toDelete = { status: "deleted" };
//   const data = await productService.deleteProduct({ _id: productId }, toDelete);
//   logger.data("product deleted with response: ", data);
//   return responser.send(200, "product", "PR_S005", req, res, data);
// };
