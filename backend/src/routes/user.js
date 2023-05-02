
import express from 'express'
import UtilisateurControler from "../controllers/UtilisateurControlleur.js";
import UtilisateurModel from '../models/utilisateur.js';
import auth from '../middlewares/auth.js';

const UserControler = new UtilisateurControler()
const router = express.Router()


router.post('/login/:email', (req, res) => UserControler.login(req, res));


export default router;