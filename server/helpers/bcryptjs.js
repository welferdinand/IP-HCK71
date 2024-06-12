const {hashSync, compareSync} = require('bcryptjs')

module.exports = {
    hashPassword: (password) => {
        return hashSync(password, 10);
    },
    compareSync: (password, hashedPassword) => {
        return compareSync(password,hashedPassword)
    }
}