/**
 * Returns a user-friendly error message based on the provided error code.
 *
 * @param {string} code - The error code to be translated into a message.
 * @returns {string} A user-friendly error message corresponding to the error code.
 */
const errorCodes = (code) => {
    let msg = 'Sorry, try again later'

    switch(code){
        case 'auth/user-not-found':
            msg = 'User not found, check data';
            break;

        case 'auth/email-already-in-use':
            msg = 'Email already in use';
            break;
        
        case ' auth/wrong-password':
            msg = 'Wrong password';
            break;

        case 'auth/invalid-credential':
            msg = 'Sorry, Invalid credentials';
            break;

        default:msg = code;
    }

    return msg
}

export default errorCodes;