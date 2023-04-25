
import mongoose from 'mongoose'


const notificationSchema = mongoose.Schema({
  fileId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  creationDate: { type: Date, required: true}
  
});

/**
 * @type {mongoose.Model}
 */
const NotificationModel = mongoose.model('Notification', notificationSchema)

export default NotificationModel