
import express from 'express'
import UtilisateurControler from "../controllers/UtilisateurControlleur.js";
import UtilisateurModel from '../models/utilisateur.js';

const UserControler = new UtilisateurControler()
const router = express.Router()


router.get('/all', (req, res) => UserControler.index(req, res));
router.post('/create', (req, res) => UserControler.create(req, res));
router.post('/signup',  (req, res) => UserControler.signup(req, res));
router.post('/login/:email', (req, res) => UserControler.login(req, res));
router.put('/edit/:id', (req, res) => UserControler.update(req, res));
router.delete('/delete/:id', (req, res) => UserControler.remove(req, res));



export default router;