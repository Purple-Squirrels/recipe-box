const bodyParser = require("body-parser");

// Import Middleware Functions
const UserRoutes = require("./Routes/UserRoutes");
const RecipeRoutes = require("./Routes/RecipeRoutes");

// Instantiate express and App Object
const express = require('express');
const app = express();

// Declaring the Port variable
const PORT = 80;

app.use(bodyParser.json());

app.use("/user", UserRoutes);
app.use("/recipes", RecipeRoutes);

app.use("*", (req, res) => {
    res.status(404).send("Node.js -> No Routes Matched");
});

// Invoke the express app to listen on the provided Port number
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
});
