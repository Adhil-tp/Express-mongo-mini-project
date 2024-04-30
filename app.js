const express = require('express');
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const path = require('path');

const users = require('./model/User');
const session = require('express-session');


dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "this-is-my-secret-key",
    saveUninitialized: true,
    resave: true
}))

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('database connected successfully..'))
    .catch(err => console.error(`error connecting database ${err.message}`))


app.use('/admin', adminRouter)
app.use('/', userRouter)


app.listen(3000, () => {
    console.log(`server is running in ${port}`)
})

module.exports = app