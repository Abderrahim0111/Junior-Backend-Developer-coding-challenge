const express = require('express')
const { fetchThreads } = require('../controllers/threadControllers')
const router = express.Router()



router.get('/fetchThreads', fetchThreads)



module.exports = router