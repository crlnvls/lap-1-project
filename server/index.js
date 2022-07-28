const app = require("./app");

// Start the server
<<<<<<< HEAD
const port = process.env.PORT || 3000;
=======
const port = process.env.PORT || 3000
>>>>>>> 57c78816f3b5697a8cbfb1d9f436b1b5ad398f4b

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});
