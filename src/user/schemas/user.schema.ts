import mongoose from 'mongoose';
import { Password } from '../../common/services/password-manager';

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

UserSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});
