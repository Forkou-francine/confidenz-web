
import mongoose from 'mongoose'

const organisationSchema = mongoose.Schema(
    {
    name: { type: String, required: true },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Utilisateur"
    },    
    email: { type: String, required: true, unique: true },
  });


  /**
 * @type {mongoose.Model}
 */
const OrganisationModel = mongoose.model('Organisation', organisationSchema)

export default OrganisationModel;