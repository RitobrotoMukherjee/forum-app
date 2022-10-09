const Logger = (req, _, next) => {
    console.log('Request Path: ',req.path);
    console.log('Request Method: ', req.method);
    next();
}

const NotFound = (req, resp) => {
    resp.status(404).send({ 
        msg: `Path: ${req.path}, Method: ${req.method} Not Available.` 
    });
}

module.exports = { Logger, NotFound };
