'use strict';

require('dotenv').config();

const readline = require('readline');
const connection = require('./lib/connectMongoose');
const Ads = require('./models/Ads');
const User = require('./models/User');

connection.once('open', async () => {
    try {

        const answer = await askUser('Do you want to initialize the database with default params? (no)');

        // aprove only 'yes' values
        if (answer.toLowerCase() !== 'yes') {
            console.log('Process aborted.');
            return process.exit(0);
        }

        // start initializing collections
        await initAds();
        await initUsers();
        // ...

        // close connection
        connection.close();

    } catch (err) {
        console.log('There was an error:', err);
        process.exit(1);
    }

});

async function initAds() {
    // first we need to delete all the previous documents
    console.log('Deleting previous ads...');
    await Ads.deleteMany();

    // Create new ads
    console.log('Creating new ads, please wait...');
    const createdAds = await Ads.insertMany([
        { name: 'Samsung Galaxy S9', price: 360, sale: true, tags: ["mobile", "lifestyle"] },
        { name: 'RedmiRed', price: 260, sale: false, tags: ["mobile", "lifestyle"] },
        { name: 'Macbook pro 2020', price: 1300, sale: false, tags: ["work", "lifestyle"], image: "1600011872410_macbookpro.jpg" },
        { name: 'Xiaomi Redmi Note 8', price: 190, sale: true, tags: ["mobile", "lifestyle"], image: "1600011932250_xiaomi.jpg"  },
        { name: 'Tesla model X', price: 60000, sale: true, tags: ["motor", "work"] },
    ]);
    console.log(`Created ${createdAds.length} ads.`);
}

async function initUsers() {
    // Delete existing users
    console.log('Deleting previous users...');
    await User.deleteMany();

    // Create new users
    console.log('Creating new users, please wait...');
    const result = await User.insertMany([
        { username: "Tester", email: 'user@example.com', password: await User.hashPassword('1234'), rol: "user" },
        { username: "Kiara", email: 'kiaraymg@gmail.com', password: await User.hashPassword('1234'), rol: "admin" },
    ]);
    console.log(`Created ${result.length} users.`);
}

// The function to ask the user to restart or not the data on the database
function askUser(answer) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(answer, ans => {
            rl.close();
            resolve(ans);
        });
    });
}