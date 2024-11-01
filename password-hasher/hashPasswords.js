/*  backend/password-hasher/hashPasswords.js
    Generate Hash values for user passwords &
    store them in mongodb 
*/

const bcrypt = require('bcryptjs');

// List of passwords to hash
const passwords = [
    'admin0',
    'user@123',
    'letmein',
    'qwerty',
    'abc!@#123'
];

// Function to hash passwords one by one
const hashPasswords = async (passwordList) => {
    for (const password of passwordList) {
        try {
            // Generate hash for the password
            const hash = await bcrypt.hash(password, 10);
            console.log(`Password: ${password} | Hash: ${hash}`);
        } catch (err) {
            console.error(`Error hashing password ${password}:`, err);
        }
    }
};

hashPasswords(passwords);
