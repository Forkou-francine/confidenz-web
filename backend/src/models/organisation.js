
import mongoose from 'mongoose'

const organisationSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: false,
      ref: "Utilisateur"
    },    
    contact: { type: Number, required: false },
    creationDate: { type: Date, required: false}
  });


  /**
 * @type {mongoose.Model}
 */
const OrganisationModel = mongoose.model('Organisation', organisationSchema)

export default OrganisationModel;