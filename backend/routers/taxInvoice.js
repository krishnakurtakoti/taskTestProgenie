const express = require("express");
const router = express.Router();

const fileUpload = require("../middleware/uploadFile");
const taxInvoiceController = require("../controllers/taxInvoice");
const catchError = require("../util/catchError");

router
  .route("/image-upload")
  .post(
    fileUpload.uploadBase64Image,
    catchError(taxInvoiceController.saveInvoiceDetails)
  );
// //router.use(authorized.verifyToken);
router
  .route("/")
  .get(catchError(taxInvoiceController.listProducts))
  // .post(fileUpload.uploadBase64Images, catchError(productController.saveProductDetails));
router
  .route("/:id")
  .get(catchError(taxInvoiceController.productDetailsById))
  // .patch(fileUpload.uploadBase64Image, catchError(productController.updateProductDetailsById))
  // .delete(catchError(productController.deleteProductById));

module.exports = router;