const express = require('express');
const { NlpManager } = require('node-nlp');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Create an instance of the NLP manager
const manager = new NlpManager({ languages: ['en'] });

// Load the trained model
async function loadModel() {
    await manager.load('/disk/models/npg-0/model.nlp');
}

// Train and save the model
loadModel()
    .then(() => {
        console.log('Model loaded successfully.');
        // Start the server after training the model
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error training or saving the model:', err);
    });

// Set up the Express routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Redirect / to /chat
app.get("/", (req, res) => {
    res.redirect("/chat");
});

// Serve index.html on /chat
app.get('/chat', (req, res) => {
    fs.readFile('./chat/index.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

// Handle POST requests to /api/chat endpoint
app.post('/api/chat', async (req, res) => {
    const message = req.body.prompt.toLowerCase();
    console.log(message);

    try {
        const response = await manager.process('en', message);
        console.log(response);
        const answer = response.answer || 'Sorry, I do not understand.';
        res.send({ answer });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
