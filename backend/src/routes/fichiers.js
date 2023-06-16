import express from 'express'
import FichierControler from '../controllers/FichierController.js'
import FichierModel  from '../models/fichier.js'
import cors from 'cors';

const FicControler = new FichierControler();
const router = express.Router();

router.get('/all', (req, res) => FicControler.index(req, res));
router.post('/save', (req, res) => FicControler.save(req, res));
router.put('/edit/:id',  (req, res) => FicControler.update(req, res));
router.delete('/:id', (req, res) => FicControler.remove(req, res));
router.get('/:id', (req, res) => FicControler.findFile(req, res));
router.get('/user/:id', (req, res) => FicControler.fileByUser(req, res));



export default router;