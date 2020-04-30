const AWS = require("aws-sdk");
const keys = require("../../Keys");
const HelperObject = require("../../HelperObject/Helper");

AWS.config.update(keys.awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res, next) => {
  const input = {
    user_name: req.body.userName
  };
  const params = {
    TableName: "Recipe_Users",
    Item: input
  };

  docClient.put(params, function (err, data) {
    err ? res.locals.error = HelperObject.awsObject.awsError(err) : res.locals.addedUser = true;
    return next();
  });
};