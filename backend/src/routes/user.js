
import express from 'express'
import UtilisateurControler from "../controllers/UtilisateurControlleur.js";
import UtilisateurModel from '../models/utilisateur.js';

const UserControler = new UtilisateurControler()
const router = express.Router()


router.post('/login/:email', (req, res) => UserControler.login(req, res));
router.get('/findFiles', (req, res) => UserControler.getUserFiles(req, res));
router.get('/all', (req, res) => UserControler.index(req, res));


export default router;