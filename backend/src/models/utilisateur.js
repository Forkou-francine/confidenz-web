import uniqueValidator from 'mongoose-unique-validator'
import mongoose from 'mongoose'

const utilisateurSchema = mongoose.Schema({
  name: { type: String, required: true },
  // password: { type: String, required: true },
  authentication:{
    password: { type: String, required: true, select: false},
    salt: { type: String, select: false},
    sessionToken: { type: String, select: false}
  },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: false },
  telephone: { type: Number, required: true },
  isAuthor: { type: Boolean, required: false},
  isAdmin : { type : Boolean, default: false }
});

utilisateurSchema.plugin(uniqueValidator);

/**
 * @type {mongoose.Model}
 */
const UtilisateurModel = mongoose.model('Utilisateur', utilisateurSchema)

export default UtilisateurModel