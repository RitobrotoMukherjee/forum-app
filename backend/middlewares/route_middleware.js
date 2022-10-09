const mongoose = require('mongoose');

const CheckIdHandler = (req, resp, next) => {
    const { id } = req.params;
    try {
        req.objectId = mongoose.Types.ObjectId(id);
        next();
    } catch(err) {
        return resp.status(500).send({ error: true, msg: err.message });
    }
}

module.exports = { CheckIdHandler };
