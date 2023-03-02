const { mongoServer } = require('./setupTests');

module.exports = async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
};