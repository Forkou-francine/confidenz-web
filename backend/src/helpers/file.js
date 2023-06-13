import path from "path"
import fs from "fs"
import UploadedFile from 'express-fileupload'
import xlsx from 'node-xlsx';
import mongoose from "mongoose";

export default class File{
    constructor() {}

    /** 
     * save the file in a specifique directory
     * @param {UploadedFile} file
     * @param {String} _path 
     */

    static async saveFile(file, _directory) {
      
        const directory = path.dirname('public')+`/public/${_directory}/`;
        const timeStamp = Date.now().toString()
        const filePath = `${directory}${file.name}`;
        // const files = [];
        // const filename = file.name;
        // files.push({
        //     filename,
        //     creationDate: new Date(),
        //     user: userId  
        // })
        const fileTypes = /jpeg|jpg|png|PNG|JPEG|xlsx|xls|JPG/;

        if (file.size > 100000000) {
            return { error: 'le fichier est trop grand.' }
        }
        if (!fileTypes.test(path.extname(file.name))) {
            return { error: "le format de fichier n'est pas supporte." }
        }

        try {
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory)
            }
            await file.mv(filePath);

            return { path: `/${_directory}/${file.name}` }

        } catch (error) {
            return { error }
        }
    }

    /** 
     * drop a specific the file
     * @param {String} _path 
     */
    static dropFile(_path) {
        const __path =  `path.dirname('public') + /public${_path}`
        try {
            if (fs.existsSync(__path)) fs.unlinkSync(__path)

            return null

        } catch (error) {
            return { error: error }
        }
    }


     /**
    * remove a convert a file
    * @param {Express.Request} req 
    * @param {Express.Response} res 
    * @returns Express.res
    */
   async convert (req, res){
    const parse = (filename = req.file.filename) => {
        const sheetsFromFile = xls.parse(`${__dirname}/myFile.xlsx`);
      
        if (sheetsFromFile.length === 0) {
          throw new Error("Le fichier ne contient pas de données");
          }
          // Récupérer les données de la première feuille du fichier
          const donnees = sheetsFromFile[0].data;
          return donnees;
          }
   }
}