const mongoose = require('mongoose') 

const meetupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    event: {
        type: String,
        enum: ["Offline Event", "Online Event"], 
        required: true 
    },
    imageUrl: {
        type: String,
        required: true
    },
    hosted: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    dressCode: {
        type: String,
        required: true
    },
    ageRestriction: {
        type: String,
        required: true
    },
    eventTags: [{
        type: String,
        required: true
    }],

    address: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    speakerImg: {
        type: String,
        required: true
    },
    speakerName: [{
        type: String,
        required: true
    }],
    speakerDesignation: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true 
}
) 

const Meetup = mongoose.model("Meetup", meetupSchema) 

module.exports = Meetup; 