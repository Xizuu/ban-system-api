const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.status(500).json({ message: "Hello world" })
})

app.get('/ban', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM player_bans');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/ban/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM player_bans WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Data not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/ban', async (req, res) => {
    const { player, staff, reason } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO player_bans (player, staff, reason) VALUES ($1, $2, $3) RETURNING *',
            [player, staff, reason]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/ban/:id/update', async (req, res) => {
    const { id } = req.params;
    const { player, staff, reason } = req.body;
    try {
        const result = await db.query(
            'UPDATE player_bans SET player = $1, staff = $2, reason = $3 WHERE id = $4 RETURNING *',
            [player, staff, reason, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Data updated' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/ban/:id/delete', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM player_bans WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Data not found' });
        } else {
            res.status(200).json({ message: 'Data deleted successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
