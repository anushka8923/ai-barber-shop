const mongoose = require('mongoose');
const dns = require('dns');

// Force public DNS resolvers to bypass local ISP SRV lookup rejections
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongo_url = process.env.MONGODB_URI;

mongoose.connect(mongo_url, {
  family: 4, // Force IPv4 routing to prevent network timeout lags
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
})
  .then(() => {
    console.log('Mongodb Connected successfully...');
  }) 
  .catch((err) => {  
    console.log('mongodb connection error :', err);
  });