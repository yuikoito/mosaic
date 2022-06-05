import Amplify from 'aws-amplify';

Amplify.configure({
  aws_project_region: process.env.AWS_PROJECT_REGION,
  aws_cognito_region: process.env.AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_CLIENT_ID,
});
