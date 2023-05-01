import express from 'express'
import FichierControler from '../controllers/FichierController.js'
import FichierModel  from '../models/fichier.js'

const FicControler = new FichierControler();
const router = express.Router();

router.get('/all', (req, res) => FicControler.index(req, res));
router.post('/save', (req, res) => FicControler.save(req, res));
router.post('/edit/id',  (req, res) => FicControler.update(req, res));
router.post('/delete/:id', (req, res) => FicControler.remove(req, res));
router.get('/find/:id', (req, res) => FicControler.findFile(req, res));



export default router;