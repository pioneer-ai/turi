const express = require('express');
const { NlpManager } = require('node-nlp');
const fs = require('fs');
const bodyParser = require('body-parser');
const Filter = require('bad-words');

const app = express();
const port = 8080;

// Set up rate limiter: maximum of twenty requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 20
});

// apply rate limiter to all requests
app.use(limiter);

// Create an instance of the NLP manager
const manager0 = new NlpManager({ languages: ['en'] });

// Create an instance of the NLP manager
const manager1 = new NlpManager({ languages: ['en'] });

// Load the trained model
async function loadModel() {
    await manager0.load('./npg-0.nlp');
    await manager1.load('./npg-0.1.nlp');
}

// Train and save the model
loadModel()
    .then(() => {
        console.log('NPG-0 & NPG-0.1 model loaded successfully.');
        // Start the server after training the model
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error loading the models:', err);
    });

// Set up the Express routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    fs.readFile('./index.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

// Serve ./turi/index.html on /turi
app.get("/turi", (req, res) => {
    fs.readFile('./turi/index.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

// Serve ./chat/index-0.html on /chat/0
app.get('/chat/0', (req, res) => {
    fs.readFile('./chat/index-0.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

// Serve ./chat/index-0.1.html on /chat/0.1
app.get('/chat/0.1', (req, res) => {
    fs.readFile('./chat/index-0.1.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

// Handle POST requests to /api/chat/npg-0 endpoint
app.post('/api/chat/npg-0', async (req, res) => {
    let message = req.body.prompt.toLowerCase();
    let response;

    // Check for explicit content asynchronously
    const hasExplicitContent = await containsExplicitContent(message);

    if (hasExplicitContent) {
        response = "I'm sorry, but I cannot respond to that request.";
        res.send({ answer: response });
        return;
    }

    try {
        response = await manager0.process('en', message);
        res.send({ answer });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Handle POST requests to /api/chat/npg-0.1 endpoint
app.post('/api/chat/npg-0.1', async (req, res) => {
    let message = req.body.prompt.toLowerCase();
    let response;

    // Check for explicit content asynchronously
    const hasExplicitContent = await containsExplicitContent(message);

    if (hasExplicitContent) {
        response = "I'm sorry, but I cannot respond to that request.";
        res.send({ answer: response });
        return;
    }

    try {
        response = await manager1.process('en', message);
        const answer = response.answer || 'Sorry, I do not understand.';
        res.send({ answer });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Function to check if the message contains explicit content
async function containsExplicitContent(message) {
    const filter = new Filter();
    const hasExplicitContent = filter.isProfane(message);
    return hasExplicitContent;
}
