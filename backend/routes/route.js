const express = require('express');

const router = express.Router();

router.get('/', (req, resp) => {
    resp.send({ msg: "Get all list" });
});

router.post('/', (req, resp) => {
    resp.send({ msg: "Create New Entry" });
});

router.delete('/:id', (req, resp) => {
    resp.send({ msg: `Delete ${req.params.id}` });
});

router.get('/:id', (req, resp) => {
    resp.send({ msg: `Get data for ${req.params.id}` });
});

router.patch('/:id', (req, resp) => {
    resp.send({ msg: `Update data for ${req.params.id}` });
});

module.exports = router;
