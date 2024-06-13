module.exports = async function authorizationAdmin(req,res,next) {
    try {
        if(req.user.role !== "Admin") throw {name: "Forbidden"}
        next()
    } catch (error) {
        next(error)
    }
}