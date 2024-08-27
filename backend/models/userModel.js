import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minLength: 8,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    files: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'File', // Reference to the File model
          default: []
        }
      ]
}, 
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;