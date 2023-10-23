import functions from '@functions/index';

const serverlessConfiguration = {
  service: 'content-backend',
  frameworkVersion: '3',
  plugins: [
    'serverless-auto-swagger',
    'serverless-esbuild',
    'serverless-offline',
    'serverless-find-resource',
    // optionally enable for local development
    // 'serverless-dotenv-plugin',
  ],
  useDotenv: true,
  provider: {
    profile: '${self:custom.profiles.${opt:stage}}',
    name: 'aws',
    runtime: 'nodejs14.x',
    timeout: 10,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      binaryMediaTypes: ['multipart/form-data'],
    },
    /*  vpc: {
    },*/
    environment: {
      DB_DATABASE: '${self:custom.DB_DATABASE.${env:STAGE}}',
      /*  USER_POOL_ID: '${find:CognitoUserPoolId:user-pool-${opt:stage}}',
      CLIENT_ID: '${find:CognitoAppClientId:user-pool-${opt:stage}.user-pool-client-${opt:stage}}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      ARN_APP: '${self:custom.ARN_APP.${opt:stage}}', */
      /*       ACCESS_KEY_ID_AWS: '${self:custom.AWS_ACCESS_KEY_ID.${opt:stage}}',
      SECRET_ACCESS_KEY_AWS: '${self:custom.AWS_SECRET_ACCESS_KEY.${opt:stage}}', */
      /*    USER_ID_AWS: '${self:custom.AWS_USER_ID.${opt:stage}}',
      REGION_AWS: '${self:custom.AWS_REGION.${opt:stage}}', */
      /* AWS_S3_IMAGES_BUCKET:'${self:custom.AWS_S3_IMAGES_BUCKET.${opt:stage}}', */
    },
  },
  resources: {
    Resources: {
      UserPool: {
        Type: 'AWS::Cognito::UserPool',
        Properties: {
          UserPoolName: 'user-pool-${opt:stage}',
          Schema: [
            {
              Name: 'email',
              Required: true,
              Mutable: true,
            },
            {
              Name: 'nickname',
              Required: true,
              Mutable: true,
            },
          ],
          Policies: {
            PasswordPolicy: {
              MinimumLength: 6,
            },
          },
          AutoVerifiedAttributes: ['email'],
        },
      },
      UserClient: {
        Type: 'AWS::Cognito::UserPoolClient',
        Properties: {
          ClientName: 'user-pool-client-${opt:stage}',
          GenerateSecret: false,
          UserPoolId: {
            Ref: 'UserPool',
          },
          AccessTokenValidity: 5,
          IdTokenValidity: 5,
          ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH'],
        },
      },
    },
  },
  // import the function via paths
  functions,
  package: { individually: true },
  custom: {
    DB_DATABASE: {
      local: '${env:DB_DATABASE_LOCAL}',
      dev: '${env:DB_DATABASE_TEST}',
    },
    /*   ARN_APP: {
      dev: '${env:ARN_APP_DEV}',
    },
    AWS_USER_ID: {
      dev: '${env:AWS_USER_ID_DEV}',
    },
    AWS_REGION: {
      dev: '${env:AWS_REGION_DEV}',
    },
    AWS_ACCESS_KEY_ID: {
      dev: '${env:AWS_ACCESS_KEY_ID_DEV}',
    },
    AWS_SECRET_ACCESS_KEY: {
      dev: '${env:AWS_SECRET_ACCESS_KEY_DEV}',
    },
    AWS_S3_IMAGES_BUCKET: {
      dev: '${env:AWS_S3_IMAGES_BUCKET_DEV}',
    }, */
    profiles: {
      dev: 'Test',
      prod: 'Prod',
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native', 'pg-hstore'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      typefiles: [
        './src/interfaces/common-interface.ts',
      ],
      apiType: 'http',
      generateSwaggerOnDeploy: true,
      basePath: '/${opt:stage}',
      apiKeyHeaders: ['Authorization'],
    },
  },
};

module.exports = serverlessConfiguration;
