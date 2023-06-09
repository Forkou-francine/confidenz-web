
import mongoose from 'mongoose'


const notificationSchema = mongoose.Schema({
  fileId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: false,
    ref: "Utilisateur"
  },      
  type: { type: String, required: true },
  creationDate: { type: Date, required: true}
  
});

/**
 * @type {mongoose.Model}
 */
const NotificationModel = mongoose.model('Notification', notificationSchema)

export default NotificationModel