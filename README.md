# GestioneAuto - REST API per la Gestione di Utenti e Auto

## Descrizione
Questo progetto fornisce un'API REST per gestire un database di utenti e auto. Le funzionalità includono:
- **Aggiungere un utente**
- **Eliminare un utente**
- **Modificare un utente**
- **Visualizzare tutti gli utenti**

Il progetto utilizza **Node.js** con il framework **Express.js** e si collega a un database **MariaDB/MySQL** per gestire i dati.

---

## Requisiti
1. **Node.js** (v16 o superiore)
2. **MariaDB/MySQL** installato e configurato
3. **Postman** (o qualsiasi client API) per testare le richieste

---

## Installazione

1. Clona il repository o copia i file in una directory locale.
2. Installa le dipendenze del progetto eseguendo:
   ```bash
   npm install express body-parser mysql2
   ```
3. Configura il database MariaDB:
   - Crea un database chiamato `gestione_auto`.
   - Crea una tabella `utenti` con la seguente struttura:
     ```sql
     CREATE TABLE utenti (
         id INT AUTO_INCREMENT PRIMARY KEY,
         nome VARCHAR(50),
         cognome VARCHAR(50),
         marca VARCHAR(50),
         modello VARCHAR(50),
         targa VARCHAR(20) UNIQUE
     );
     ```
4. Modifica i dettagli di connessione al database nel file `GestioneAuto.js`:
   ```javascript
   this.conn = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'giuse',
       database: 'gestione_auto'
   });
   ```
   Assicurati di sostituire `root` e `giuse` con il tuo username e password del database.

---

## Utilizzo

### Avviare il server
Esegui il file principale:
```bash
node GestioneAuto.js
```
Il server sarà disponibile su `http://localhost:3000`.

---

## API disponibili

### 1. **Aggiungere un utente**
- **Endpoint:** `POST /api/utenti`
- **Body JSON:**
  ```json
  {
      "nome": "Mario",
      "cognome": "Rossi",
      "marca": "Fiat",
      "modello": "500",
      "targa": "AB123CD"
  }
  ```
- **Risposta di successo:**
  ```json
  {
      "message": "Utente aggiunto con successo",
      "id": 1
  }
  ```

### 2. **Eliminare un utente**
- **Endpoint:** `DELETE /api/utenti`
- **Body JSON:**
  ```json
  {
      "targa": "AB123CD"
  }
  ```
- **Risposta di successo:**
  ```json
  {
      "message": "Utente eliminato con successo"
  }
  ```
- **Errore se l'utente non esiste:**
  ```json
  {
      "error": "Utente non trovato"
  }
  ```

### 3. **Modificare un utente**
- **Endpoint:** `PUT /api/utenti`
- **Body JSON:**
  ```json
  {
      "new_nome": "Luca",
      "new_cognome": "Verdi",
      "new_marca": "Audi",
      "new_modello": "A4",
      "new_targa": "CD456EF",
      "old_targa": "AB123CD"
  }
  ```
- **Risposta di successo:**
  ```json
  {
      "message": "Utente modificato con successo"
  }
  ```

### 4. **Visualizzare tutti gli utenti**
- **Endpoint:** `GET /api/utenti`
- **Risposta di successo:**
  ```json
  [
      {
          "id": 1,
          "nome": "Mario",
          "cognome": "Rossi",
          "marca": "Fiat",
          "modello": "500",
          "targa": "AB123CD"
      },
      {
          "id": 2,
          "nome": "Luca",
          "cognome": "Verdi",
          "marca": "Audi",
          "modello": "A4",
          "targa": "CD456EF"
      }
  ]
  ```

---

## Test delle API con Postman
1. Avvia Postman e crea una nuova richiesta.
2. Imposta il metodo HTTP (`POST`, `GET`, `PUT`, `DELETE`) e l'URL appropriato.
3. Per i metodi `POST`, `PUT` e `DELETE`, fornisci un corpo JSON nei **body settings**.
4. Invia la richiesta e verifica la risposta.

---


