import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  },
);

UserSchema.pre('save', async function(done) {});
