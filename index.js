const express = require('express')
require('dotenv').config();
const PORT = process.env.PORT || 6000;
const errorHandler = require('./middleware/errorHandler.js');
const connectDB = require('./config/dbConnection.js');
const validateToken = require('./middleware/validateTokenHandler.js');
connectDB();

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{res.send("server is running on "+ PORT)})

app.use('/api/contacts',validateToken,require('./router/contactRouter.js'))
app.use('/api/users',require('./router/userRouter.js'))

app.use(errorHandler);
app.listen(PORT,()=>console.log(`Server is running on: localhost:${PORT}`))