import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
    },
}, 
{
    timestamps: true
}
);

const File = mongoose.model('File', fileSchema);

export default File;