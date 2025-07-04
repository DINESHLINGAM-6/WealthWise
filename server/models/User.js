import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 13,
      max: 100,
    },
    interests: {
      type: [String],
      default: [],
    },
    goals: {
      type: String,
      required: true,
      trim: true,
    },
    skillLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false, // optional soft delete field for future use
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

const User = mongoose.model('User', userSchema);
export default User;
