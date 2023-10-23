require('dotenv').config();

const seedData = {
  users: [
    {
      email: 'yaroslav.podporin@yellow.systems',
      role: 'ADMIN',
      username: 'yaroslav.podporin',
    },
    {
      email: 'dmitry.kozoliy@yellow.systems',
      role: 'ADMIN',
      username: 'dmitry.kozoliy',
    },
    {
      email: 'admin@example.com',
      role: 'ADMIN',
      username: 'admin1',
      password: 'f7g8H!JF?74k_f0HL'
    },
  ]
};


const createUser = async (cognito, data) => {
  
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: data.email,
    UserAttributes: [{
      Name: 'email',
      Value: data.email,
    },
      {
        Name: 'nickname',
        Value: data.username,
      },
      {
        Name: 'email_verified',
        Value: 'true',
      },
    ],
    MessageAction: 'SUPPRESS',
  };
  
  await cognito.adminCreateUser(params).promise();
  
  const paramsForSetPass = {
    UserPoolId: process.env.USER_POOL_ID,
    Password: data.password,
    Username: data.email,
    Permanent: true,
  };
  
  await cognito.adminSetUserPassword(paramsForSetPass).promise();
}

const removeUser = async (cognito, email) => {
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: email,
  };
  
  await cognito.adminDeleteUser(params).promise();
}

const dropAWSUsers = async (cognito) => {
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
  };
  
  const { Users } = await cognito.listUsers(params).promise();
  const removeUsersPromise = Users.map(async ({ Username }) => removeUser(cognito, Username))
  
  await Promise.all(removeUsersPromise);
}

module.exports = {
  seedData,
  createUser,
  dropAWSUsers,
};
