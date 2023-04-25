import mongoose from 'mongoose'

const fichierSchema = mongoose.Schema({
  fileId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "Utilisateur"
  },
  type: { type: String, required: true },
  creationDate: { type: Date, required: true}

});

/**
 * @type {mongoose.Model}
 */
const FichierModel = mongoose.model('Fichier', fichierSchema)

export default FichierModel