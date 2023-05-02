import 'dotenv/config';
import express from 'express'
import bodyParser from  'body-parser'
import multer from 'multer'
import excelToJson from 'convert-excel-to-json';
import UtilisateurModel from './src/models/utilisateur.js';
import FichierModel from './src/models/fichier.js';
import Database from './src/db/database.js';
import UserRoute from './src/routes/user.js'
import OrgRoute from './src/routes/org.js'
import AuthRoute from './src/routes/authicate.js'
import FileRoute from './src/routes/fichiers.js'
import fileUpload from 'express-fileupload';
const env = 'develop'
import path from 'path'

// const storage =  multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/uploads');
//     },

//     filename: (req, file, cb) =>{
//         cb(null, file.fieldname + '_' + Date.now());
//     }
//     })

// const upload = multer({storage: storage});



// get the db connexion
const db = new Database()
// connect to the db
await db.createConnection()

const app = express();

//set the template engine  
app.set('view engine','ejs');  

// for parsing application/json
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileUpload());

app.use('/user', UserRoute);

app.use('/auth', AuthRoute);

app.use('/org', OrgRoute);

app.use('/file', FileRoute);


//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


export default app;
