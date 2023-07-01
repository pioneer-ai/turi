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
    await manager.load('./models/chat/model.nlp');
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

app.get("/favicon.ico", (req, res) => {
    fs.readFile('./favicon.ico', 'utf-8', (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
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
    console.log(req.body);
    const message = req.body.prompt;
    let answer = message.toLowerCase();

    const mathRegex = /^(\d+)\s*([\+\-\*\/])\s*(\d+)$/;
    const match = answer.match(mathRegex);

    if (match) {
        const num1 = parseInt(match[1]);
        const operator = match[2];
        const num2 = parseInt(match[3]);
        let result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                answer = 'Sorry, I cannot perform that calculation.';
                break;
        }

        if (result !== undefined) {
            answer = `The answer is ${result}.`;
        } else {
            answer = "Sorry, I can't preform that calculation.";
        }
    } else {
        manager.process('en', answer)
            .then((response) => {
                let answer = response.answer || 'Sorry, I do not understand.';
                answer = augmentMessage(answer);
            })
            .catch((error) => {
                console.error('Error processing message:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    res.send(answer);
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
