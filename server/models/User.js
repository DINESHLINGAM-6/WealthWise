import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  interests: [String],
  goals: String,
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
