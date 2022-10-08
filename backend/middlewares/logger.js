const Logger = (req, _, next) => {
    console.log('Request Path: ',req.path);
    console.log('Request Method: ', req.method);
    next();
}

module.exports = Logger;
