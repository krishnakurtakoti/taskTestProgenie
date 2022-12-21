require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  DB_URL:
    process.env.DB_URL ||
    "mongodb://localhost:27017/myapp",
  JWT_SECRET: "testing",
  ACCESS_TOKEN_VALIDITY: "2d",
  REFRESH_TOKEN_VALIDITY: "30d",
  NODEMAILER_USER: "noreply.ecommercemgmt@gmail.com",
  NODEMAILER_PASS: "woohgygnizajdtjj",
  ORIGIN: "https://asz-ecommerce.web.app",
  DEFAULT_IMAGE: "",
};

module.exports = config;