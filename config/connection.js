const {connect,connection} = require("mongoose");

// Wrap Mongoose around local connection to MongoDB
connect(process.env.MONGODB_URI || "mongodb://localhost/sm-api", {
});

// Export connection
module.exports = connection;
