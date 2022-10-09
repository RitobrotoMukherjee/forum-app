const express = require('express');
const { CheckIdHandler } = require('../middlewares/route_middleware');
const {
    GetData, GetDataById, 
    CreateData, UpdateDataById,
    DeleteData
} = require('../controllers/forum_controller');

const router = express.Router();

// Get All
router.get('/', GetData);

// Get By ID
router.get('/:id', CheckIdHandler, GetDataById);

// Create 1 Entry
router.post('/', CreateData);

// Delete 1 Entry by id
router.delete('/:id', CheckIdHandler, DeleteData);

// Update Entry by id
router.patch('/:id', CheckIdHandler, UpdateDataById);

module.exports = router;
