
import express from 'express'
import UtilisateurControler from "../controllers/UtilisateurControlleur.js";
import auth from '../middlewares/auth.js';

const UserControler = new UtilisateurControler()
const router = express.Router()


router.get('/', auth, (req, res) => UserControler.index(req, res));
router.get('/:email', auth, (req, res) => UserControler.findUser(req, res));
router.post('/', auth, (req, res) => UserControler.create(req, res));
router.put('/:id', auth, (req, res) => UserControler.update(req, res));
router.delete('/:id', auth, (req, res) => UserControler.remove(req, res));



export default router;