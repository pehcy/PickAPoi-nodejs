const mongoose = require('mongoose');

const MONGO_USERNAME = 'poi_user';
const MONGO_PWD = 'root';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017'; // default port for mongoDB
const MONGO_DB = 'poiModel';

const options = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
};
const mongoDB = `mongodb://${MONGO_USERNAME}:${MONGO_PWD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const mongo = mongoose.connect(mongoDB, options);

mongo.then(() => {
  console.log('connected');
}, error => {
  console.log(error, 'error, cannot connect mongDB');
});
