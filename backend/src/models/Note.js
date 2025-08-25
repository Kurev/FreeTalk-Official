import mongoose from "mongoose";

// 1- create a scheme
// 2- model based off of that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true } // createdAt, updateAt fields will be added automatically
);

const Note = mongoose.model("Note", noteSchema);

export default Note;