import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        
    },
    address:{
        type: String,
        required: true,
        
    },
    photos:[String],
    description:{
        type: String,
        required: true,
        
    },
    perks:[String],
    extraInfo:{
        type: String,
        
    },
    price:{
        type: Number,
        required: true,
        
    },
    rating:{
        type: Number,
        
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chekIn:Number,
    checkOut:Number,
    maxGuests:Number,
    bedrooms:Number,
    beds:Number,
    bathrooms:Number,
    
}, { timestamps: true });

const placeModel = mongoose.model('Place', placeSchema);

export default placeModel;