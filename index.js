const express = require('express');
const { NlpManager } = require('node-nlp');
const fs = require('fs');
const bodyParser = require('body-parser');
const Filter = require('bad-words');
const fetch = require('node-fetch');

const app = express();
const port = 8080;

// Create an instance of the NLP manager
const manager = new NlpManager({ languages: ['en'] });

// Load the trained model
async function loadModel() {
    await manager.load('/disk/models/npg-0.nlp');
}

// Train and save the model
loadModel()
    .then(() => {
        console.log('NPG-0 model loaded successfully.');
        // Start the server after training the model
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error loading the model:', err);
    });

// Set up the Express routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Redirect / to /chat
app.get("/", (req, res) => {
    res.redirect("/info");
});

// Serve ./info/index.html on /info
app.get("/info", (req, res) => {
    fs.readFile('./info/index.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

// Serve ./chat/index.html on /chat
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
    let message = req.body.prompt.toLowerCase();
    let response;

    // Check for explicit content asynchronously
    const hasExplicitContent = await containsExplicitContent(message);
    const isPromptUnsafe = isUnsafe(message);

    if (hasExplicitContent || isPromptUnsafe) {
        response = "I'm sorry, but I cannot respond to that request.";
        res.send({ answer: response });
        return;
    }

    try {
        response = await manager.process('en', message);
        const answer = response.answer || 'Sorry, I do not understand.';
        res.send({ answer });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Function to check if the message contains explicit content
function containsExplicitContent(message) {
    return new Promise((resolve, reject) => {
        const filter = new Filter();
        const hasExplicitContent = filter.isProfane(message);
        resolve(hasExplicitContent);
    });
}

async function isUnsafe(prompt) {
    const perspectiveApiKey = 'AIzaSyBBOdIXmmAyKBKnpVuzgHNyThWFYIgD4ag';
    const perspectiveApiUrl = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${perspectiveApiKey}`;

    const requestBody = {
        comment: { text: prompt },
        requestedAttributes: { TOXICITY: {} },
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    };

    try {
        const response = await fetch(perspectiveApiUrl, requestOptions);
        const { attributeScores } = await response.json();
        const toxicityScore = attributeScores.TOXICITY.summaryScore.value;

        if (toxicityScore >= 0.7) {
            return true; // Prompt is considered unsafe
        }

        return false; // Prompt is safe
    } catch (error) {
        console.error('Error checking prompt safety:', error);
        return true; // Error occurred, assume it is unsafe
    }
}