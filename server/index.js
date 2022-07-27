const app = require("./app");

// Start the server
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});
