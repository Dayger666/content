require('dotenv').config();

const getDatabaseData = () => {
  switch(process.env.STAGE){
  case 'local':
  default: {
    return JSON.parse(process.env.DB_DATABASE_LOCAL);
  }
  case 'dev': {
    return JSON.parse(process.env.DB_DATABASE_TEST);
  }
  
  }
}

const env = process.env.STAGE === 'local' || process.env.STAGE === 'dev' ? 'development' : 'production';
const database = getDatabaseData();

module.exports = {
  [env]: {
    dialect: 'postgres',
    migrationStorageTableName: '_migrations',
    ...database,
  },
};
