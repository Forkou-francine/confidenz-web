import uniqueValidator from 'mongoose-unique-validator'
import mongoose from 'mongoose'

const utilisateurSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthday: { type: Date, required: true },
  imageUrl: { type: String, required: false },
  telephone: { type: Number, required: true },
});

utilisateurSchema.plugin(uniqueValidator);

/**
 * @type {mongoose.Model}
 */
const UtilisateurModel = mongoose.model('Utilisateur', utilisateurSchema)

export default UtilisateurModel