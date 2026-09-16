// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true, // Har email unique hona chahiye
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Yeh zaroori hai taaki Next.js mein baar-baar model compile na ho
export default mongoose.models.User || mongoose.model('User', UserSchema);
