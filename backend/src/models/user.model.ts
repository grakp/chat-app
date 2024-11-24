import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullNname: {
            type: String,
            required: [true, "Please provide a name"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;