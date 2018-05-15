'use strict'

const Hotel = require('../models/hotel')

function getHotel(req, res) {
    let hotelId = req.params.hotelId

    console.log(hotelId)

    Hotel.findById(hotelId, (err, hotels) => {
    //Hotel.findOne({ id: hotelId}, (err, hotel) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if (!hotel) return res.status(404).send({message: `El hotel ${hotel} no existe`})

        res.status(200).send({ hotels })
    })
}

function getHotelByName(req, res) {

    let hotelName = req.query.name;
    let hotelStars = req.query.stars;

    var regexName = new RegExp(hotelName, "i")

    if(hotelName == null)
    {
        Hotel.find({ stars: hotelStars }, (err, hotels) => {
            if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
            if (!hotels) return res.status(404).send({message: `El hotel ${hotels} no existe`})

            res.status(200).send({ hotels })
        })
    }

    if(hotelStars == null)
    {
        
        Hotel.find({ name: regexName }, (err, hotels) => {
            if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
            if (!hotels) return res.status(404).send({message: `El hotel ${hotels} no existe`})

            res.status(200).send({ hotels })
        })
        
    }    
}

function getHotels(req, res) {
    Hotel.find({}, (err, hotels) => {
        if(err) return res.status(500).send({message: `Error al realizaar la peticion: ${err}`})
        if(!hotels) return res.status(404).send({message: `El hotel no existe`})
        res.status(200).send({ hotels });
    })
}

function saveHotel (req, res)
{
    let hotel = new Hotel()
    hotel.id = req.body.name
    hotel.name = req.body.name;
    hotel.stars = req.body.stars;
    hotel.price = req.body.price;
    hotel.image = req.body.image;
    hotel.amenities = req.body.amenities;

    hotel.save((err, hotelStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos ${err}`})

        res.status(200).send({message: hotelStored})
    })
}

function updateHotel (req, res) {
    let hotelId = req.params.hotelId
    let update = req.body

    Hotel.findByIdAndUpdate(hotelId, update, (err, hotelUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el hotel ${err}`})

        res.status(200).send({hotel: hotelUpdated})
    })

}

function deleteHotel (req, res) {
    let hotelId = req.params.hotelId
    Hotel.findById(hotelId, (err, hotel) => {
        if (err) res.status(500).send({message: `Error al borrar el hotel ${err}`})

        hotel.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar el hotel ${err}`})
            res.status(200).send({message: `el hotel ha sido borrado`})
        })
    })
}

module.exports = {
    getHotel,
    getHotels,
    getHotelByName,
    saveHotel,
    updateHotel,
    deleteHotel
}