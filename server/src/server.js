const app = require("./app");
const environmentConfig = require("./config/env");

const { port } = environmentConfig;

/*
  Start server
  Express uygulamasini tanimli port uzerinde calistirir.
*/
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
