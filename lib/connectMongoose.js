'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('open', () => {
    console.log('Connected to Mongoose', mongoose.connection.name);
});

mongoose.connection.on('error', err => {
    console.log('Error connecting to Mongoose', err);
    process.exit(1);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = mongoose.connection;
