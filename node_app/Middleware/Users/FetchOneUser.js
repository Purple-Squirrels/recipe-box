const AWS = require("aws-sdk");
const keys = require("../../Keys");
const HelperObject = require("../../HelperObject/Helper");

AWS.config.update(keys.awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
    const params = {
        TableName: "Recipe_Users",
        Key: {
            "user_name": req.query.user_name
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            res.locals.error = HelperObject.awsObject.awsError(err);
        };
        res.locals.data = data;
        return next();
    });
};