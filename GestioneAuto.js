const express = require('express'); //importa il framework express che permette la creazione del server HTTP.
const body = require('body-parser'); // gestisce i dati del body delle richiest HTTP.
const mysql = require('mysql2'); //permette di interagire con il database.

// Definizione della classe
class GestioneAuto {
    constructor() {
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'giuse',
            database: 'gestione_auto'
        });

        this.conn.connect((err) => {
            if (err) {
                console.error('Errore nella connessione:', err.message);
                return;
            }
            console.log('Connesso al database MariaDB.');
        });
    }

    addUtente(dati, callback) {
        const query = `INSERT INTO utenti (nome, cognome, marca, modello, targa) VALUES (?, ?, ?, ?, ?)`;
        this.conn.query(query, [dati.nome, dati.cognome, dati.marca, dati.modello, dati.targa], callback);
    }

    deleteUtente(dati, callback) {
        const query = `DELETE FROM utenti WHERE targa = ?`;
        this.conn.query(query, [dati.targa], callback);
    }

    editUtente(dati, callback) {
        const query = `UPDATE utenti SET nome = ?, cognome = ?, marca = ?, modello = ?, targa = ? WHERE targa = ?`;
        this.conn.query(query, [dati.new_nome, dati.new_cognome, dati.new_marca, dati.new_modello, dati.new_targa, dati.old_targa], callback);
    }

    visualizzaUtenti(callback) {
        const query = `SELECT * FROM utenti`;
        this.conn.query(query, callback);
    }

    closeConnection() {
        this.conn.end((err) => {
            if (err) {
                console.error('Errore durante la chiusura della connessione:', err.message);
                return;
            }
            console.log('Connessione al database chiusa.');
        });
    }
}

// Inizializza Express.js
const app = express();
const gestioneAuto = new GestioneAuto();

app.use(body.json()); // Per gestire i dati JSON nel body delle richieste

// API per aggiungere un utente
app.post('/api/utenti', (req, res) => {
    gestioneAuto.addUtente(req.body, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Errore durante l\'aggiunta dell\'utente', details: err.message });
        }
        res.send({ message: 'Utente aggiunto con successo', id: result.insertId });
    });
});

// API per eliminare un utente
app.delete('/api/utenti', (req, res) => {
    gestioneAuto.deleteUtente(req.body, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Errore durante l\'eliminazione dell\'utente', details: err.message });
        }
        if (result.affectedRows > 0) {
            res.send({ message: 'Utente eliminato con successo' });
        } else {
            res.status(404).send({ error: 'Utente non trovato' });
        }
    });
});

// API per modificare un utente
app.put('/api/utenti', (req, res) => {
    gestioneAuto.editUtente(req.body, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Errore durante la modifica dell\'utente', details: err.message });
        }
        if (result.affectedRows > 0) {
            res.send({ message: 'Utente modificato con successo' });
        } else {
            res.status(404).send({ error: 'Utente non trovato' });
        }
    });
});

// API per visualizzare tutti gli utenti
app.get('/api/utenti', (req, res) => {
    gestioneAuto.visualizzaUtenti((err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Errore durante la visualizzazione degli utenti', details: err.message });
        }
        res.send(results);
    });
});

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
