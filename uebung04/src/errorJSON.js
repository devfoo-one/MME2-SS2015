module.exports = {
    /**
     * error object to be returned in case there is an error
     * @param  {String} type       example: "error"
     * @param  {Number} statusCode HTTP statusCode
     * @param  {String} msg        message
     * @return {Object}            error object
     */
    Error: function(type, statusCode, msg) {
        this.type = type;
        this.statusCode = statusCode;
        this.msg = msg;
    },
    /**
     * sends given error object as response
     * @param  {Error} error    error object
     * @param  {Response} res   response to send over
     */
    send: function(error, res) {
        res.status(error.statusCode).send(error);
    }
};
