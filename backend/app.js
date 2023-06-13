import 'dotenv/config';
import express from 'express'
import bodyParser from  'body-parser'
import excelToJson from 'convert-excel-to-json';
import xls from 'xlsx';
import Database from './src/db/database.js';
import UserRoute from './src/routes/user.js'
import OrgRoute from './src/routes/org.js'
import AuthRoute from './src/routes/authicate.js'
import FileRoute from './src/routes/fichiers.js'
import fileUpload from 'express-fileupload';
import cors from 'cors'
import mongoose from 'mongoose';
const env = 'develop'
const root ='/';
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
import path from 'path'
import { readFileSync } from 'fs';



// get the db connexion
const db = new Database()
// connect to the db
await db.createConnection()

const app = express();


const parse = (filename) => {
  const excelData = xls.readFile(filename);
  return Object.keys(excelData.Sheets).map((name) => ({
    name,
    data: xls.utils.sheet_to_json(excelData.Sheets[name], {header: 1}),
  }));
}

//console.log(parse("public/uploads/confidenz.xlsx"));

// parse("public/uploads/confidenzia.xlsx").forEach((element) => {
//   console.log(element);
// })

// const jsonToObject = JSON.parse(readFileSync(, 'utf-8'));
// console.log(jsonToObject);


// const workbook = xls.readFile('public/uploads/confidenzina.xlsx');
// let headers = [];
// workbook.SheetNames.forEach((sheetName) => {
//   const worksheet = workbook.Sheets[sheetName];
//   const sheetHeaders = [];
//   for (const cell in worksheet) {
//     if (cell[0] === 'A') {
//       const header = worksheet[cell].v;
//       sheetHeaders.push(header);
//     }
//   }
//   headers.push(sheetHeaders);
// });

// console.log(headers);

app.use(cors({
  origin: ['http://localhost:4200'],
     "methods": "GET,PUT,POST",
     "preflightContinue": false,
     "optionsSuccessStatus": 204,
     "responseHeader": ["Content-Type"],
}));

app.use(cors({
  origin: ['http://localhost:8100'],
     "methods": "GET,PUT,POST",
     "preflightContinue": false,
     "optionsSuccessStatus": 204,
     "responseHeader": ["Content-Type"],
}));
//set the template engine  
app.set('view engine','ejs');  

// for parsing application/json
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



//fetch data from the request  
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));  



app.use(fileUpload());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');


    next();
});

app.use('/user', UserRoute);

app.use('/auth', AuthRoute);

app.use('/org', OrgRoute);

app.use('/file', cors(corsOptions), FileRoute);

export default app;
