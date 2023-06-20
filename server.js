require('dotenv').config()
const app = require("./src/app");
const { app: appConfig } = require("./src/configs/config.mongodb");

const PORT = appConfig.port || 3056;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit Server Express"));
});
