const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

const db = require('./config/keys').MongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true} )

.then(() =>console.log('mongodb connected..'))
.catch(err => console.log(err));

app.use(expressLayouts);
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: false}));


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.use(express.static('public'))
app.use('/img', express.static(__dirname + 'public/img'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
