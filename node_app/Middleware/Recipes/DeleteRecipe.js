const AWS = require("aws-sdk");
const keys = require("../../Keys");
const HelperObject = require("../../HelperObject/Helper");

AWS.config.update(keys.awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req,res,next) => {
    const params = {
        TableName: "Recipe_List",
        Key: {
            "recipe_id": req.params.id
        }
    };
    docClient.delete(params, (err, data) => {
        if (err) {
            res.locals.error = HelperObject.awsObject.awsError(err);
            res.status(401);
        } else {
            res.locals.deletedRecipe = true;
        }
        return next();
    });
};
