const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    res.send('Inicio')
})

module.exports = router