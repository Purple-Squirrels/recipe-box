const AWS = require("aws-sdk");
const keys = require("../../Keys");
const HelperObject = require("../../HelperObject/Helper");

AWS.config.update(keys.awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {

    const params = {
        TableName: "Recipe_List",
        FilterExpression : 'created_by = :created_by',
        ExpressionAttributeValues : {':created_by' : req.params.id}
    };

    docClient.scan(params, (err, data) => {
        err ? res.locals.error = HelperObject.awsObject.awsError(err) : res.locals.data = data;
        return next();
    });
};
