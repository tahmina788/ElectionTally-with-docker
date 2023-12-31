const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

console.log('cookieParser')
console.log(cookieParser)


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config({ path: './config.env' });

mongoose.set('strictQuery', false);

// Initialize DB
{/* 
mongoose
 .connect('mongodb+srv://tahminabithe47:01757112809A@electiontallywithlogin.1x4u0rl.mongodb.net/',{
     useNewUrlParser: true,
     useUnifiedTopology: true,
 })
 .then(() => console.log('connection successful'))
 .catch(err => console.log(`no connection`))
 */}

 mongoose
.connect('mongodb://mongo:27017/registrationlogin',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connection successful'))
.catch(err => console.log(`no connection`))


const User = require('./model/userSchema');

app.use(express.json())
app.use(cors({ credentials: true }));
app.use(require('./router/auth'));

const port = process.env.PORT;



app.listen(port,() => {
   console.log(`server is running at port no ${port}`);
});
