const database = require("./database");
const isValid = require("./validation");

class Accounts {
    async RegisterAccount(ID, email, username) {
        // Check fields for validity
        // Check ID
        if (!isValid.String(ID)) {
            return {
                status: 400,
                body: {"Invalid ID": "The ID '" + ID + "' is not valid"},
            };
        }

        // Check email
        if (!isValid.Email(email)) {
            return {
                status: 400,
                body: {"Invalid email": "The email '" + email + "' is not valid"},
            };
        }

        // Check username
        if (!isValid.String(username)) {
            return {
                status: 400,
                body: {"Invalid username": "The username '" + username + "' is not valid"},
            };
        }

        // Create a new account in the database
        const text = "INSERT INTO accounts(\"Email\", \"Username\", \"User_ID\", \"Date_Joined\") VALUES($1, $2, $3, CURRENT_DATE)";
        const values = [email, username, ID];
        const res = await database.Query(text, values);
        return res;
    }

    async GetAccount(ID) {
        // Check fields for validity
        // Check ID
        if (!isValid.String(ID)) {
            return {
                status: 400,
                body: {"Invalid ID": "The ID '" + ID + "' is not valid"},
            };
        }

        // Get an account from the database
        const text = "SELECT * FROM accounts WHERE \"User_ID\" = $1";
        const values = [ID];
        const res = await database.Query(text, values);
        return res;
    }
}

// Create and export the accounts object
const accounts = new Accounts();
module.exports = accounts;