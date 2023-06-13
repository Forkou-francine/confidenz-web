import mongoose from 'mongoose'

const fichierSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "Utilisateur"
  },
  creationDate: { type: Date, required: true}

});


/**
 * @type {mongoose.Model}
 */
const FichierModel = mongoose.model('Fichier', fichierSchema);
export default FichierModel