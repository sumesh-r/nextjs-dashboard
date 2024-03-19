// utils/aws.js

import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  region: 'ap-south-1', // e.g., 'us-east-1'
  credentials: new AWS.ChainableTemporaryCredentials({
    params: {
      RoleArn: 'arn:aws:iam::216203457724:role/NextJSDynamoDB',
    }
  })
});

// Export the configured AWS object for use in other parts of your application
export const aws = AWS;
