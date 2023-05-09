import 'dotenv/config';
import express from 'express'
import bodyParser from  'body-parser'
import excelToJson from 'convert-excel-to-json';
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



// get the db connexion
const db = new Database()
// connect to the db
await db.createConnection()

const app = express();
app.use(cors({
  origin: ['http://localhost:4200'],
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

// app.use(express.static(path.join(root, 'frontend/confidenz')));
// app.get('*', (req, res) => {
//   res.sendFile('dist/frontend/confidenz/index.html', {root});
// });

app.use(fileUpload());

app.use('/user', UserRoute);

app.use('/auth', AuthRoute);

app.use('/org', OrgRoute);

app.use('/file', cors(corsOptions), FileRoute);
// app.route('/api/thumbnail-upload').post(onFileupload);

// export function onFileupload(req, res) {

//   let file = req['files'].thumbnail;

//   console.log("File uploaded: ", file.name);

// }

//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', always);


    next();
  });


export default app;
