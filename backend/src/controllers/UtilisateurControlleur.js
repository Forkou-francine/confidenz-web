import {UtilisateurModel} from "../models/index.js";
import {HttpResponse} from '../helpers/helper.js'
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';


export default class UtilisateurControler{
    constructor(){}


    /**
      * return all the users
      * @param {Express.Request} req 
      * @param {Express.Response} res 
      * @returns Express.res
    */
    async index(req, res) {
        try {
            let data = await UtilisateurModel.find();
            res.status(HttpResponse.OK);
            return res.send({ utilisateur: data });
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error: "une erreur c'est produite!" });
        }
    }


    /**
      * ceate a new user
      * @param {Express.Request} req 
      * @param {Express.Response} res 
      * @returns Express.res
    */
    async create(req, res) {
       
        try {
            const data = await UtilisateurModel.create(req.body);
            res.status(HttpResponse.OK);
            return res.send(data._id);
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error });
        }
    }


     /**
      * Login of a user
      * @param {Express.Request} req 
      * @param {Express.Response} res 
      * @returns Express.res
    */
     async login(req, res) {
            UtilisateurModel.findOne({ email: req.body.email })
                .then(user => {
                    if (!user) {
                        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                    }
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        })
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
         
    }


    /**
     * update a User
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
     async update(req, res) {
        try {
         await  UtilisateurModel.updateOne({ _id: req.params.id }, req.body)
              .then(() => res.status(200).json({ message: 'Objet modifié !'}))
              .catch(error => res.status(400).json({ error }));
          
        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
            return res.send({ error });
        }
    }


    
/**
     * remove a user
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
async remove(req, res) {
    let data = await UtilisateurModel.findOne({ _id: req.params.id });
        if (data == null) {
            res.status(404).json({ message: 'Utilisateur inconnu !'});
        }
    try {
        await UtilisateurModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
         .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(HttpResponse.INTERNAL_SERVER_ERROR);
        return res.send({ error });
    }

}


 /**
     * get a single Test in the database
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
 async findUser(req, res) {
    try {
        const data = await UtilisateurModel.findOne({ _id: req.params.id });
        if (data != null) {
            res.status(HttpResponse.OK);
            return res.send({ data: data });
        } else {
            res.status(HttpResponse.NOT_FOUND);
            return res.send({ message: `${req.params.id} does not corresponde to any User` })
        }
    } catch (error) {
        if (error.name == 'CastError') {
            res.status(HttpResponse.BAD_REQUEST);
        } else {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR);
        }
        return res.send({ message: error.message });
    }
}


}


