class UserNotFound extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = UserNotFound;