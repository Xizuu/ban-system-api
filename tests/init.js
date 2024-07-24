const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: false
});

const createTable = async () => {
    const client = await pool.connect();
    try {
        const queryText = `
            CREATE TABLE player_bans (
                id SERIAL PRIMARY KEY,
                player VARCHAR(255) NOT NULL,
                staff VARCHAR(255) NOT NULL,
                reason TEXT
            );
        `;
        await client.query(queryText);
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table: ', err);
    } finally {
        client.release();
    }
};

createTable();
