const { dropAWSUsers } = require('./utils');
const { config, CognitoIdentityServiceProvider } = require('aws-sdk')

config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const cognito = new CognitoIdentityServiceProvider();

// dropAWSUsers(cognito);
