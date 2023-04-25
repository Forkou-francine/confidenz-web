import 'dotenv/config';
import express from 'express'
import bodyParser from  'body-parser'
import multer from 'multer'
import Database from './src/db/database.js';
import UserRoute from './src/routes/user.js'
import OrgRoute from './src/routes/org.js'
const env = 'develop'



// get the db connexion
const db = new Database()
// connect to the db
await db.createConnection()

const app = express();

// for parsing application/json
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user', UserRoute);

app.use('/org', OrgRoute);


// const upload = multer({ dest: 'uploads/' });
// // Méthode pour charger un fichier tabulaire
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
//     // Se connecter à la base de données MongoDB
//     const client = await MongoClient.connect('mongodb://localhost:27017');
//     const db = client.db('mydb');
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


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });


export default app;
