const express = require('express');
const { NlpManager } = require('node-nlp');
const fs = require('fs');
const bodyParser = require('body-parser');
const synonyms = require('synonyms');

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
app.post('/api/chat', (req, res) => {
    let response, message;
    message = req.body.prompt.toLowerCase();

    try {
        response = manager.process('en', message).answer || 'Sorry, I do not understand.';
        response = augmentMessage(response);
        res.send({answer: response});
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }

    
});

// Function to retrieve synonyms for a given word
function getSynonyms(word) {
    const wordSynonyms = synonyms(word);

    if (wordSynonyms && wordSynonyms.length > 0) {
        const flattenedSynonyms = wordSynonyms.flat();
        return flattenedSynonyms;
    }

    return [word]; // Fallback to the original word if no synonyms are found
}

// Function to perform data augmentation on a message
function augmentMessage(message) {
    const words = message.split(' ');
    const augmentedWords = [];

    for (const word of words) {
        try {
            const wordSynonyms = getSynonyms(word);
            const randomSynonym = wordSynonyms[Math.floor(Math.random() * wordSynonyms.length)];
            augmentedWords.push(randomSynonym || word);
        } catch (err) {
            console.error(`Error retrieving synonyms for "${word}":`, err);
            augmentedWords.push(word);
        }
    }

    const augmentedMessage = augmentedWords.join(' ');
    return augmentedMessage;
}
