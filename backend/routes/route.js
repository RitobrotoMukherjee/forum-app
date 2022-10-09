const express = require('express');
const { CheckIdHandler } = require('../middlewares/route_middleware');
const {
    GetData, GetDataById, 
    CreateData, DeleteData
} = require('../controllers/forum_controller');

const router = express.Router();

// Get All
router.get('/', GetData);

// Get By ID
router.get('/:id', CheckIdHandler, GetDataById);

// Create 1 Entry
router.post('/', CreateData);

router.delete('/:id', CheckIdHandler, DeleteData);

router.patch('/:id', CheckIdHandler, (req, resp) => {
    resp.send({ msg: `Update data for ${req.params.id}` });
});

module.exports = router;
