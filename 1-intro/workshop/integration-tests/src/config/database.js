const mongoose = require('mongoose');

const connect = async () => {
    mongoose.connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })
};

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

const clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
export default { connect, close, clear };
