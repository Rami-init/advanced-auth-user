const express = require('express')
const router = express.Router()
const { private } = require('../controllers/private');
const { protect } = require('../middleware/protect');
router.route('/').get(protect, private)
module.exports = router