const taxInvoieRouter = require("./taxInvoice");

const routes = (app) => {
    app.use("/tax-invoice", taxInvoieRouter);
}
module.exports = routes