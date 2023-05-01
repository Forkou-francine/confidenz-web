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
import FileRoute from './src/routes/fichiers.js'
const env = 'develop'
import path from 'path'

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },

    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '_' + Date.now());
    }
    })

const upload = multer({storage: storage});



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

app.use('/user', UserRoute);

app.use('/org', OrgRoute);

app.use('/file', FileRoute);

app.post('/uploadfile', upload.single("uploadedFile"), (req, res) =>{
    // importExcelData2MongoDB(dirname + '/uploads/' + req.file.filename);
    console.log(res);
    });


//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  
//static folder  
// app.use(express.static(path.resolve(dirname,'public')));  
// //route for Home page
// app.get('/', (req, res) => {
// res.sendFile(dirname + '/index.html');
// });
// // Upload excel file and import to mongodb
// app.post('/uploadfile', uploads.single("uploadedFile"), (req, res) =>{
// importExcelData2MongoDB(dirname + '/uploads/' + req.file.filename);
// console.log(res);
// });
// // Import Excel File to MongoDB database
// function importExcelData2MongoDB(filePath){
// // -> Read Excel File to Json Data
// const excelData = excelToJson({
// sourceFile: filePath,
// sheets:[{
// // Excel Sheet Name
// name: 'Confidenz',
// // Header Row -> be skipped and will not be present at our result object.
// header:{
// rows: 1
// },
// // Mapping columns to keys
// columnToKey: {
// A: '_id',
// B: 'name',
// C: 'address',
// D: 'age'
// }
// }]
// });
// // -> Log Excel Data to Console
// console.log(excelData);
/**
{ 
Customers:
[ 
{ _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
{ _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
{ _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
{ _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
{ _id: 5, name: 'Jason Bourne', address: 'California', age: 36 } 
] 
}
*/  
// Insert Json-Object to MongoDB
// userModel.insertMany(jsonObj,(err,data)=>{  
// if(err){  
// console.log(err);  
// }else{  
// res.redirect('/');  
// }  
// }); 
// fs.unlinkSync(filePath);
// }
// //assign port  
// var port = process.env.PORT || 3000;  
// app.listen(port,()=>console.log('server run at port '+port));  





// function chargerFichier(cheminFichier) {
// // Charger le fichier depuis le chemin spécifié
// const fichier = xlsx.parse(cheminFichier);
// // Vérifier si le fichier contient des données
// if (fichier.length === 0) {
// throw new Error("Le fichier ne contient pas de données");
// }
// // Récupérer les données de la première feuille du fichier
// const donnees = fichier[0].data;
// return donnees;
// }



// Méthode pour envoyer un fichier au serveur
// app.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//     // Vérifier si un fichier a été envoyé
//     if (!req.file) {
//     throw new Error("Aucun fichier n'a été envoyé");
//     }
//     // Charger les données du fichier
//     const donnees = chargerFichier(req.file.path);

//     // Insérer les données dans la collection spécifiée
//     const collection = db.collection('donnees');
//     const result = await collection.insertMany(donnees);
//     // Fermer la connexion à la base de données
//     await client.close();
//     // Envoyer une réponse avec le nombre de documents insérés
//     res.send(`Le fichier a été chargé avec succès
//     (${result.insertedCount}documents insérés)`);
//     } catch (error) {
//     // Envoyer une réponse avec l'erreur
//     res.status(500).send(error.message);
//     }
//     });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


export default app;
