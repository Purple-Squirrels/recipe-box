const AWS = require("aws-sdk");
const Buffer = require("buffer").Buffer;
const keys = require("../../Keys");
const HelperObject = require("../../HelperObject/Helper");

AWS.config.update(keys.awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        const encodedUsername = req.headers.authorization.replace("Basic ", "");

        const params = {
            TableName: "Recipe_Users",
            Key: {
                "user_name": encodedUsername,
            }
        };

        docClient.get(params, function (err, data) {
            if (err) {
                res.locals.error = HelperObject.awsObject.awsError(err);
            } else {
                JSON.stringify(data.Item) ? res.locals.validUser = true : res.locals.nonValidUser = true;
            }
            return next();
        });
    } else {
        res.locals.error = 'Error: No username provided.';
        return next();
    }
};