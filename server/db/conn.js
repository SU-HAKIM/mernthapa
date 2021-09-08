const mongoose = require('mongoose');
require('dotenv').config();

const DB = `mongodb://localhost:27017/${process.env.DB_NAME}`;
mongoose.connect(DB, { useNewUrlParser: true }).then(() => console.log('connected')).catch(err => console.log(err));
