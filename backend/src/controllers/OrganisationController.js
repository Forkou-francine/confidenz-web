import { HttpResponse } from '../helpers/helper.js';
import { OrganisationModel } from '../models/index.js';
    

export default class OrganisationController {
    constructor() {}
        
/**
    * return all the Organisations
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
*/
   async index(req, res) {
       try {
           let data = await OrganisationModel.find();
           res.status(HttpResponse.OK);
           return res.send(data);
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           console.log("code error ", error)
           return res.send(error);
       }
   }

   /**
    * insert a OrganisationController in the database
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async save(req, res) {

       try {
           const data = await OrganisationModel.create(req.body);
           res.status(HttpResponse.OK);
           return res.send(data);
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           return res.send({ error });
       }
   }


   /**
    * get a single OrganisationController in the database
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async findOrg(req, res) {
       try {
           const data = await OrganisationModel.findOne({ _id: req.params.id });
           if (data != null) {
               res.status(HttpResponse.OK);
               return res.send({ data: data });
           } else {
               res.status(HttpResponse.NOT_FOUND);
               return res.send({ message: `${req.params.id} does not corresponde to any OrganisationController` })
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
    * get a single OrganisationController in the database
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
     async addUserToOrg(req, res) {
        try {
            const addOrgToUser = function(userId, organisaion) {
                return db.OrganisationModel.findByIdAndUpdate(
                  userId,
                  { $push: { tags: organisaion._id } },
                  { new: true, useFindAndModify: false }
                );
              };
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
    * update a OrganisationController
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async update(req, res) {

       try {
           let data = await OrganisationModel.updateOne({ _id: req.params.id }, req.body);
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
    * remove a OrganisationController
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async remove(req, res) {
       const data = await OrganisationModel.findOne({ _id: req.params.id });
       if (data == null) {
           res.status(HttpResponse.NOT_FOUND);
           return res.send({ message: `${req.params.id} does not corresponde to any data` })
       }
       try {
           await OrganisationModel.deleteOne({ _id: req.params.id });
           res.status(HttpResponse.OK);
           return res.send({ message: 'one ow removed' });
       } catch (error) {
           res.status(HttpResponse.INTERNAL_SERVER_ERROR);
           return res.send({ error });
       }
   }
        
            
        }