module.exports = {
    checkUserByEmail: "SELECT id FROM user WHERE email = ?",
    checkUserByUsername: "SELECT id FROM user WHERE username = ?",
    registerUser: "INSERT INTO user SET ?",
    login: "SELECT id, username, password, activationCode, role FROM user WHERE username = ? AND isDisabled = false",
    getUserById: "SELECT * FROM user WHERE id = ? ",
    getAllUsers: "SELECT id, username, email, role, activationCode, isDisabled FROM user",
    getCodeCreatedDate: "SELECT passCodeStartDate FROM user where id = ?",
    disableUser: "UPDATE user SET isDisabled = 1 WHERE id = ?",
    enableUser: "UPDATE user SET isDisabled = 0 WHERE id = ?",
    changePassword: "UPDATE user SET password = ? WHERE id = ?",
    updatePassword: "UPDATE user SET password = ?, resetPassCode = NULL WHERE resetPassCode = ?"
};