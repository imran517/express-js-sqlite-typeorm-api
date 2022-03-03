const config = require('./config');
const typeorm = require("typeorm");
const { TaskSchema } = require('./model');

function connect() {
  return new Promise ((resolve, reject) => {
    typeorm.createConnection({
      type: "sqlite",
      database: `${config.db.name}`,
      logging: false,
      entities: [
        TaskSchema
      ]
  })
    .then (connection => { 
      console.log(`Successful connection to the database: ${config.db.name}`);
      resolve(connection);
    })
    .catch (error => { 
      console.error(`Fatal error occurred: ${error}`);
      reject(error);
    });
  });
}
  
module.exports = { connect } ;






