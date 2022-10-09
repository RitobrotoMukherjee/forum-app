const { default: mongoose } = require('mongoose');
const ForumModel = require('../models/forum_model');

// To support immutability using constants
const SUCCESS = {
    success: true, data: [], msg: "No Data found"
}

const ERROR = {
    error: true, msg: "ERROR!"
}

// Get Req
const GetData = (_, resp) => {
    ForumModel.find({}, (err, data) => {
        if(err) return resp.status(400).send({ ...ERROR, msg: err.message});
        resp.status(200).send({ ...SUCCESS, data, msg: "Get all forum data" })
    }).sort({ createdAt: -1 });
}

const GetDataById = async (req, resp) => {
    const { id } = req.params;
    
    const data = await ForumModel.findById(mongoose.Types.ObjectId(id));
    
    if(!data) return resp.status(404).send({ ...SUCCESS });
    
    resp.status(200).send({ ...SUCCESS, data, msg: `${id} - ${data.title} found` })
}

const CreateData = async (req, resp) => {
    const { title, description, type } = req.body;
    const validate = new ForumModel({ title, description, type });
    const errors = validate.validateSync();
    if(errors) resp.status(400).send({ error: true, msg: errors.message});
    else {
        const data = await validate.save();
        resp.status(200).send({ data, msg: "Data Created" })
    }
}

const DeleteData = async (req, resp) => {
    const { id } = req.params;

    const { acknowledged, deletedCount } = await ForumModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    
    if(acknowledged && deletedCount) resp.status(200).send({ ...SUCCESS, msg: `${id} Deleted` });
    else if(acknowledged && !deletedCount) resp.status(404).send({ ...SUCCESS, msg: `${id} Not Found` });
    else resp.status(400).send({ ...ERROR, msg: "Some Error Happened" });
}

module.exports = {
    GetData, GetDataById, CreateData,
    DeleteData
}
