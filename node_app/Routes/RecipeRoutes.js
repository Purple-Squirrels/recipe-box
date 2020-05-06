const GetRecipeById = require("../Middleware/Recipes/GetRecipeById");
const CreateRecipe = require("../Middleware/Recipes/CreateRecipe");
const UpdateRecipe = require('../Middleware/Recipes/UpdateRecipe');
const DeleteRecipe = require("../Middleware/Recipes/DeleteRecipe");

const express = require('express');
const router = express.Router();

router.get("/:id", GetRecipeById, (req, res) => {
    res.send(res.locals.data);
});

router.post("/", CreateRecipe, (req, res) => {
    if (res.locals.addedRecipe){
        return res.send({ nodeStatus: 200 });
    } else if(res.locals.error) {
        return res.send({
            nodeStatus:400,
            error: res.locals.error
        });
    }
});

router.put("/:id", UpdateRecipe, (req, res) => {
    if(res.locals.updatedRecipe){
        return res.send({ nodeStatus: 200 });
    } else if(res.locals.error) {
        return res.send({
            nodeStatus:400,
            error: res.locals.error
        });
    }
});

router.delete("/:id", DeleteRecipe, (req, res) => {
    if  (res.locals.deletedRecipe){
        return res.send({ nodeStatus: 200 });
    } else if(res.locals.error) {
        return res.send({
            nodeStatus: 400,
            error: res.locals.error
        });
    }
});

module.exports = router;