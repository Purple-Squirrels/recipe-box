const AWS = require("aws-sdk");
const keys = require("../../Keys");
const HelperObject = require("../../HelperObject/Helper");

AWS.config.update(keys.awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
    const input = {
        "recipe_id": req.body.recipe_id,
        "recipe_name": req.body.recipe_name,
        "cook_time":req.body.cook_time,
        "servings":req.body.servings,
        "ingredients": req.body.ingredients,
        "directions":req.body.directions,
        "updated_by": req.body.userName,
        "updated_on": new Date().toString(),
    };

    // Not required inputs
    if (req.body.prep_time && req.body.prep_time.length > 0) { input["prep_time"] = req.body.prep_time; };
    if (req.body.description && req.body.description.length > 0) { input["description"] = req.body.description; };

    const params = {
        TableName: "Recipe_List",
        Item: input,
    };

    docClient.put(params, (err, data) => {
        err ? res.locals.error = HelperObject.awsObject.awsError(err) : res.locals.updatedRecipe = true;
        return next();
    })
};