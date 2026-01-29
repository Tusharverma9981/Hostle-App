const mongoose =  require("mongoose");

const lisitngSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        city:{
            type:String,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true,
        },
         amenities: {
            type: [String],
            default: []
        },
        images: {
            type: [String],
            default: []
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },{timestamps:true}
);

module.exports = mongoose.model("Listing",lisitngSchema);