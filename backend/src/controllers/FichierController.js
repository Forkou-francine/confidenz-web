import { HttpResponse } from '../helpers/helper.js';
import { FichierModel, UtilisateurModel } from '../models/index.js';
import File from '../helpers/file.js'
import {ObjectId} from 'mongodb'
import xls from 'xlsx';

        
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
           return res.send({fichier: data});
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           console.log("code error ", error)
           return res.send(error);
       }

       
   }

   /**
    * return all the Files of a single user
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns {Express.Response}
    */
   async fileByUser(req, res) {
    try {
        const id = new ObjectId(req.params.id)
        const files = await FichierModel.find({userId: id});
        return res.status(HttpResponse.OK).send({files, id});
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

    //console.log(req.files);
       try {
        const userId = new ObjectId(req.body.userId);   
        const file =  await File.saveFile(req.files.file, "uploads" );
        const data = await FichierModel.create({
            name: req.body.name || file.path,
            description: req.body.description || "",
            userId: req.body.userId || userId,
            creationDate: new Date()
        });
        
        res.status(HttpResponse.OK);
        return res.send(data);
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
           const data = await FichierModel.findOne({ _id: req.params.id });
           if (data) {
               res.status(HttpResponse.OK);
               return res.send({ data: data });
           } else {
               res.status(HttpResponse.NOT_FOUND);
               return res.send({ message: `${req.params.id} does not corresponde to any File` })
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
           const data = await FichierModel.updateOne({ _id: req.params.id }, req.body);
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
    * get a single FichierController in the database
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async getInfos(){
    // const workbook = xls.readFile('/uploads/confidenzia.xlsx');
    const sheetName = workbook.SheetNames[0];
    // console.log("Helloooo", workbook);
    // console.log("Hiiiii", sheetName);
    const worksheet = workbook.Sheets[sheetName];

    const headers = [];
        for (let cell in worksheet) {
        if (cell[0] === 'A') {
        headers.push(worksheet[cell].v);
        }
    }

    // console.log("Je les vois en chelouuuu", headers);
   }

   /**
    * remove a FichierController
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async remove(req, res) {
        console.log("File ID: ", req.params.id);
       const data = await FichierModel.findOne({ _id: req.params.id });
       if (!data) {
           return res.status(HttpResponse.NOT_FOUND).send({ message: `${req.params.id} does not corresponde to any data` })
       }
       try {
           await FichierModel.deleteOne({ _id: req.params.id });
           res.status(HttpResponse.OK);
           return res.send({ message: 'one row removed' });
       } catch (error) {
        console.log("File Remove Error", error);
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           return res.send({ error });
       }
   }


   
  
        
            
}