const express = require('express');
const {
    GetData, GetDataById, 
    CreateData
} = require('../controllers/forum_controller');

const router = express.Router();

// Get All
router.get('/', GetData);

// Get By ID
router.get('/:id', GetDataById);

// Create 1 Entry
router.post('/', CreateData);

router.delete('/:id', (req, resp) => {
    resp.send({ msg: `Delete ${req.params.id}` });
});

router.patch('/:id', (req, resp) => {
    resp.send({ msg: `Update data for ${req.params.id}` });
});

module.exports = router;
