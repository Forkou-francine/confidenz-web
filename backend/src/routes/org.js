import express from 'express'
import OrganisationControler from '../controllers/OrganisationController.js'
import OrganisationModel  from '../models/organisation.js'

const OrgControler = new OrganisationControler();
const router = express.Router();

router.get('/all', (req, res) => OrgControler.index(req, res));
router.get('/find/:id', (req, res) => OrgControler.findOrg(req, res));
router.post('/save', (req, res) => OrgControler.save(req, res));
router.put('/edit/id',  (req, res) => OrgControler.update(req, res));
router.delete('/delete/:id', (req, res) => OrgControler.remove(req, res));



export default router;