const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnathorizedError())
        }

        const accesToken = authorizationHeader.split(' ')[1]
        if (!accesToken) {
            return next(ApiError.UnathorizedError())
        }

        const userData = tokenService.validateAccessToken(accesToken)
        if (!userData) {
            return next(ApiError.UnathorizedError())
        }

        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnathorizedError())
    }
}