const errorHandler = async (req, res, next) => {
    try {
        await next()
    } catch (e) {
        console.log(e);
    }
}

module.exports = errorHandler;