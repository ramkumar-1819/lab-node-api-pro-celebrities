const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
//express server
const app=express()
//Making connection to atlas and getting the module that we perform crud operation
const {mongoose}=require('../Connection/db');
const user=require('../Crud/crud');
//Parsing the req body in bodyparser middleware and enabling cors
app.use(bodyParser.json());
app.use(cors({origin:'*'}));
//starting the server
app.listen(3000,()=>console.log("Server Started at Port 3000"))
app.use('/celebrities',user)