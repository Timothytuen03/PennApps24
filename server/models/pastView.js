import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

let Schema = mongoose.Schema;

let viewsSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    presented: {
        type: Array
    },
    viewings: {
        type: Array
    }
})

viewsSchema.plugin(passportLocalMongoose);
const PastView = mongoose.model("PastView", viewsSchema);
export default PastView;