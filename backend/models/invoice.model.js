const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new Schema(
  {
    invoiceNumber: { type: String },
    companyName: { type: String },
    totalBill: { type: String },
    invoiceDate: { type: String },
    invoiceImage: { type: String },
    // productName: { type: String },
    // productDescription: { type: String },
    // productImages: [{ type: String }],
    // productOtherImages: [{ type: String }],
    // productSku: { type: String },
    // productPrice: { type: Number },
    // categoryId: { type: Schema.Types.ObjectId, ref: "category" },
    // productQuantity: { type: Number },
    // companyId: { type: Schema.Types.ObjectId, ref: "company" },
    // status: {
    //   type: String,
    //   required: true,
    //   default: "active",
    //   enum: ["active", "deleted"],
    // },
    createdBy: { type: String, required: true, default: "system" },
    updatedBy: { type: String, required: true, default: "system" },
  },
  { timestamps: true }
);

productSchema.plugin(paginate);
productSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("product", productSchema);
