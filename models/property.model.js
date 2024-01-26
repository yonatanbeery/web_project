const mongoose = require("mongoose");

const DealType = mongoose.Schema.Types.String;
DealType.enumValues = ['rent', 'sale'];
const HomeType = mongoose.Schema.Types.String;
HomeType.enumValues = [
    'house',
    'townhome',
    'multi-family',
    'condos/co-ops',
    'lots/land',
    'apartment',
    'manufactured'
];

const ContactDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    EmailAddress: {
        type: String,
        required: true
    }
});

const PropertySchema = new mongoose.Schema({
    dealType: {
        type: DealType,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    homeType: {
        type: HomeType,
        required: true
    },
    contactDetails: {
        type: ContactDetailsSchema,
        required: true
    },
    freeText: {
        type: String,
        required: false
    },
    comments: {
        type: [String],
        required: false
    },
    creator: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Property", PropertySchema);
