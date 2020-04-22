const FetchUserMiddleware = require("../Middleware/FetchUser");
const AddUserMiddleware = require("../Middleware/Users/AddUser");

const express = require('express');
const router = express.Router();

router.get("/login", FetchUserMiddleware, (req, res) => {
    if (res.locals.validUser) {
        return res.send({nodeStatus: 200});
    } else if (res.locals.nonValidUser) {
        return res.send({ nodeStatus: 401 });
    } else if (res.locals.error) {
        return res.send({
            nodeStatus: 404,
            error: res.locals.error
        });
    }
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