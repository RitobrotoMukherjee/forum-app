const mongoose = require('mongoose');

const CheckIdHandler = (req, resp, next) => {
    const { id } = req.params;
    
    if(mongoose.Types.ObjectId.isValid(id)) {
        req.objectId = mongoose.Types.ObjectId(id);
        next();
    } else {
        return resp.status(500).send({ error: true, msg: "Invalid Id" });
    }
}

module.exports = { CheckIdHandler };
