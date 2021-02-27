const express = require('express')
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');

let rawdata = fs.readFileSync('pokemon.json');
let pokemons = JSON.parse(rawdata);

// console.log(student);


router.get('/test', (req, res) => {
    res.status(200).json(pokemons)
})




module.exports = router;