const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://127.0.0.1:27017/todo-staging', {
//   promiseLibrary: global.Promise,
// }); 

// mongoose.set('debug', true);

// mongoose.connection.on('connected', function () {
//   console.log('Mongoose default connection open to ');
// });

// mongoose.connection.once('open', () => {
//   console.log('Connected to mongodb!');
// });

// mongoose.connection.on('error', function(err) {
//   console.log('Mongoose default connection error: ' + err);
// });

// mongoose.connection.on('disconnected', function () {
//   console.log('Mongoose default connection disconnected');
// });

