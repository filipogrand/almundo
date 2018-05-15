'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HotelSchema = Schema({
    id: String,
    name: String,
    stars: {type: Number, default: 0 },
    price: {type: Number, default: 0 },
    image: String,
    amenities: { type: Array }
})

module.exports = mongoose.model('Hotel', HotelSchema)