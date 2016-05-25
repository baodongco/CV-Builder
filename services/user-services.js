module.exports = {
    checkUserByEmail: "SELECT id FROM users WHERE email = ?",
    checkUserByUsername: "SELECT id FROM users WHERE username = ?",
    registerUser: "INSERT INTO users SET ?",
    login: "SELECT id, username, password, isDisabled FROM users WHERE username = ? AND isDisabled = false",
    getUserById: "SELECT * FROM users WHERE id = ? "
};