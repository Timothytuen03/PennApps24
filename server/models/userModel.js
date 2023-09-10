import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    number: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    preferences: {
        type: Array,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
export default User;