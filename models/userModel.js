const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address.'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 9,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// use document middleware to enable encryption using bcrypt
userSchema.pre('save', async function (next) {
  // if the current document's password has not modified, exit the function and call the next middleware
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // remove passwordConfirm field from database
  this.passwordConfirm = undefined;
  next();
});

// instance method to check if password is correct using bcrypt
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

// Create instance method on user model
userSchema.methods.createPasswordResetToken = function () {
  // generate reset token using crypto module
  const resetToken = crypto.randomBytes(32).toString('hex');

  //   encrypt reset token
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // set passwordresetexpires property to 20 mins from now
  this.passwordResetExpires = Date.now() + 20 * 60 * 1000;

  // return plain text token for use in email
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
