
import express from 'express'
import UtilisateurControler from "../controllers/UtilisateurControlleur.js";
import UtilisateurModel from '../models/utilisateur.js';

const UserControler = new UtilisateurControler()
const router = express.Router()


router.post('/login', (req, res) => UserControler.login(req, res));
router.get('/findFiles/:id', (req, res) => UserControler.getUserFiles(req, res));
router.get('/all', (req, res) => UserControler.index(req, res));
router.get('/findUser/:email', (req, res) => UserControler.findUser(req, res));
router.post('/create', (req, res) => UserControler.create(req, res));
router.put('/update/:id', (req, res) => UserControler.update(req, res));
router.post('/register', (req, res) => UserControler.signup(req, res));
router.delete('/delete/:id', (req, res) => UserControler.remove(req, res));


export default router;