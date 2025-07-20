
const express = require('express')
const { CreateUser, GetUsers, UpdateUser, DeleteUser } = require('../controllers/UserController.js')
const router = express.Router()

router.post('/',CreateUser)
router.get('/',GetUsers)
router.put('/:id',UpdateUser)
router.delete('/:id',DeleteUser)

module.exports = router