const {User} = require('../models/index')
const { compareSync } = require('bcryptjs')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

class UserController {
    static async loginUser(req,res,next) {
        try {
            let {email, password} = req.body
            if(!email || !password) throw({name: "InvalidInput"})
            
            let user = await User.findOne({where: { email }})
            if(!user || !compareSync(password, user.password)) throw({name: "InvalidUser"})
            
            res.status(200).json({ access_token: signToken( { id: user.id} ), role: user.role})
        } catch (error) {
            next(error)
        }
    }

    static async loginByGoogle(req,res,next){
        try {
            const {google_token} = req.headers
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENTID
            });
            const payload = ticket.getPayload();
            
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: `${Math.random() * 1000}`,
                    phoneNumber: `${payload.nbf}`
                }
            })
            res.status(200).json({ access_token: signToken( { id: user.id} ), role: user.role})
        } catch (error) {
            next(error)
        }
    }

    static async registerUser(req,res,next) {
        try {
            let {email, password, phoneNumber, username} = req.body
            
            let user = await User.create({email, password, phoneNumber, username})
            
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController