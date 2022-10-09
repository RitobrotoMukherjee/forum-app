const express = require('express');
const ForumModel = require('../models/forum_model');

const router = express.Router();

router.get('/', (_, resp) => {
    ForumModel.find()
    .then((data) => resp.status(200).send({ data, msg: "Get all list" }))
    .catch(err => resp.status(400).send({ error: true, msg: err}));
});

router.post('/', (req, resp) => {
    const { title, description, type } = req.body;
    const data = new ForumModel({ title, description, type });
    const errors = data.validateSync();
    if(errors) resp.status(400).send({ error: true, msg: errors});
    else resp.status(200).send({ data, msg: "Data Created" })
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
