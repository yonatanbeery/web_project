const mongoose = require("mongoose");

const DealType = mongoose.Schema.Types.String;
DealType.enumValues = ['rent', 'sale'];
const PropertyType = mongoose.Schema.Types.String;
PropertyType.enumValues = [
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
    phone_number: {
        type: String,
        required: true
    },
    Email_address: {
        type: String,
        required: true
    }
});

const PropertySchema = new mongoose.Schema({
    deal_type: {
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
    bedrooms_number: {
        type: Number,
        required: true
    },
    bathrooms_number: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    property_type: {
        type: PropertyType,
        required: true
    },
    contact_details: {
        type: ContactDetailsSchema,
        required: true
    },
    free_text: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Property", PropertySchema);
