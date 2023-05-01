
import express from 'express'
import UtilisateurControler from "../controllers/UtilisateurControlleur.js";
import UtilisateurModel from '../models/utilisateur.js';
import auth from '../middlewares/auth.js';
import multer from '../middlewares/multer.js'

const UserControler = new UtilisateurControler()
const router = express.Router()


router.get('/', auth, (req, res) => UserControler.index(req, res));
router.get('/:id', auth, (req, res) => UserControler.findUser(req, res));
router.post('/', auth, (req, res) => UserControler.create(req, res));
router.post('/:email', auth, (req, res) => UserControler.login(req, res));
router.put('/:id', auth, (req, res) => UserControler.update(req, res));
router.delete('/:id', auth (req, res) => UserControler.remove(req, res));



export default router;