module.exports = {
    checkUserByEmail: "SELECT id FROM user WHERE email = ?",
    checkUserByUsername: "SELECT id FROM user WHERE username = ?",
    registerUser: "INSERT INTO user SET ?",
    login: "SELECT id, username, password, activationCode FROM user WHERE username = ? AND isDisabled = false",
    getUserById: "SELECT * FROM user WHERE id = ? "
};