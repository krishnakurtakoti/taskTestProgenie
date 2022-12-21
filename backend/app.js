var express = require("express");
var app = express();
const router = express.Router();
const routes = require("./routers/index");
const DB = require("./util/db");
var cors = require('cors')

app.use(cors())
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

// app.use(router);

app.get("/", function (req, res) {
  res.send("Hello World!");
});


// Routing
routes(app);

// Open DB connection
DB.openDBConnection();
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
