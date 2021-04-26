const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please input email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [6, 'Password must be minimum 6 characters']
    }
});

// Fire a function after document is saved to db
userSchema.pre('save', async function (next) {
    console.log('user about to be saved', this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
}); 

// Static method to login user
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({ email });
    if(user){
      const auth = await bcrypt.compare(password, user.password);
      if(auth){
          return user;
      }
      throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;