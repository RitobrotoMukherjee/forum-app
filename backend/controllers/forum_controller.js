const { default: mongoose } = require('mongoose');
const ForumModel = require('../models/forum_model');

// To support immutability using constants
const SUCCESS = {
    success: true, data: [], msg: "No Data found"
}

const ERROR = {
    error: true, msg: "ERROR!"
}

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
    const { objectId } = req;

    const { acknowledged, deletedCount } = await ForumModel.deleteOne({ _id: objectId });
    
    if(acknowledged && deletedCount) resp.status(200).send({ ...SUCCESS, msg: `${id} Deleted` });
    else if(acknowledged && !deletedCount) resp.status(404).send({ ...SUCCESS, msg: `${id} Not Found` });
    else resp.status(400).send({ ...ERROR, msg: "Some Error Happened" });
}

const UpdateDataById = async (req, resp) => {
    const { objectId } = req;
    
    try {
        const { acknowledged, modifiedCount, matchedCount } = await ForumModel.updateOne(
            { _id: objectId },
            {
                $set: { ...req.body }
            },
            { runValidators: true }
        );
        
        if(acknowledged) {
            if(modifiedCount) return resp.status(200).send({...SUCCESS, msg: `${objectId} updated`});
            if(!modifiedCount) return resp.status(200).send({...SUCCESS, msg: `${objectId} nothing updated`});
            if(!matchedCount) return resp.status(404).send({ ...ERROR, msg: `No data is matching ${objectId}` })
        }
    } catch(err) { resp.status(400).send({ ...ERROR, msg: err.message}); }
    
}

module.exports = {
    GetData, GetDataById, CreateData,
    DeleteData, UpdateDataById
}
