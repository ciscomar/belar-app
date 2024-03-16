
const mongoose = require('mongoose');

function connectToMongoDB() {
  const mongoURI = `mongodb://root:toor@${process.env.MONGO_SERVER}/${process.env.MONGO_DB}`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 100,
  };

  mongoose.connect(mongoURI, options)
    .then(() => {
      console.log(`Connected to MongoDB: ${process.env.MONGO_DB} Server: ${process.env.MONGO_SERVER}`);
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); // Exit the application on connection error
    });
}

connectToMongoDB();
module.exports = mongoose;
