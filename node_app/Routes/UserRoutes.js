const LoginMiddleware = require("../Middleware/Users/Login");
const AddUserMiddleware = require("../Middleware/Users/AddUser");
const GetAllRecipes = require("../Middleware/Recipes/GetAllRecipes");

const express = require('express');
const router = express.Router();

router.get("/login", LoginMiddleware, (req, res) => {
    if (res.locals.validUser) {
        return res.send({nodeStatus: 200});
    } else if (res.locals.nonValidUser) {
        return res.send({ nodeStatus: 401 });
    } else if (res.locals.error) {
        return res.send({
            nodeStatus: 404,
            error: res.locals.error
        })
    }
});

router.get("/:id/recipes", GetAllRecipes, (req, res) => {
    res.send(res.locals.data);
});

router.post("/", AddUserMiddleware, (req, res) => {
    if (res.locals.addedUser) {
        return res.send({ nodeStatus: 200 });
    } else if (res.locals.error) {
        return res.send({
            nodeStatus: 400,
            error: res.locals.error
        });
    }
});

module.exports = router;