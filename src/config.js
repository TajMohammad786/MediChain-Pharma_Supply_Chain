const env = require("dotenv");
env.config({ path: "./.env" });

const { MONGODB_URI } = process.env;

module.exports = { MONGODB_URI };
