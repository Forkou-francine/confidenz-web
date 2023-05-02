import { HttpResponse } from '../helpers/helper.js';
import { FichierModel } from '../models/index.js';
import File from '../helpers/file.js'
        
export default class FichierController {
    constructor() {}
        
    /**
    * return all the Files
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async index(req, res) {
       try {
           let data = await FichierModel.find();
           res.status(HttpResponse.OK);
           return res.send(data);
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           console.log("code error ", error)
           return res.send(error);
       }
   }

   /**
    * insert a FichierController in the database
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async save(req, res) {

    console.log(req.files);
       try {

    const fichier =  await File.saveFile(req.files.file, "uploads" );
        //    const data = await FichierModel.create(req.body);
           res.status(HttpResponse.OK);
           return res.send({fichier});
       } catch (error) {
        console.log(error);
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           return res.send({ error });
       }
   }


   /**
    * get a single FichierController in the database
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async findFile(req, res) {
       try {
           const data = await FichierController.findOne({ _id: req.params.id });
           if (data != null) {
               res.status(HttpResponse.OK);
               return res.send({ data: data });
           } else {
               res.status(HttpResponse.NOT_FOUND);
               return res.send({ message: `${req.params.id} does not corresponde to any FichierController` })
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

   /**
    * update a FichierController
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async update(req, res) {

       try {
           let data = await FichierModel.updateOne({ _id: req.params.id }, req.body);
           if (data.modifiedCount == 1 || data.matchedCount == 1) {
               res.status(HttpResponse.OK);
               return res.send({ message: "data modifier avec success!" });
           } else {
               res.status(HttpResponse.NOT_FOUND);
               return res.send({ message: `${req.params.id} does not corresponde to any data` })
           }
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           return res.send({ error });
       }
   }

   /**
    * remove a FichierController
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async remove(req, res) {
       let data = await FichierModel.findOne({ _id: req.params.id });
       if (data == null) {
           res.status(HttpResponse.NOT_FOUND);
           return res.send({ message: `${req.params.id} does not corresponde to any data` })
       }
       try {
           await FichierModel.remove({ _id: req.params.id });
           res.status(HttpResponse.OK);
           return res.send({ message: 'one ow removed' });
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           return res.send({ error });
       }
   }
        
            
        }