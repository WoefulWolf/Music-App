// node-postgres connection to database
const { Client } = require('pg')
const connectionString = process.env.DATABASE_URL;
const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

class Database {
    constructor() {
        client.connect();   // Connect to the database
    }

    async Query(text, values) {
        try {   // Try to query the database
            const res = await client.query(text, values)
            return this.#CheckQueryResult(res);
        } catch (err) { // Catch any errors and throw them to the caller
            return this.#GenerateErrJSON(err);
        }
    }

    #GenerateErrJSON(err) {
        //console.log(err);
        return {
            status: 500,
            body: {"Database error": err.detail},
        };
    }

    #CheckQueryResult(res) {
        if (res.rowCount == 0) {    // If no rows were returned
            //console.log(res);
            return {
                status: 404,
                body: {"No results": "No results were found"},
            };
        } else {
            //console.log(res);
            return {
                status: 200,
                body: res.rows,
            };
        }
    }

    async endClient() {
        await client.end();
    }
}

// Create and export the database object
let database = new Database();
module.exports = database;