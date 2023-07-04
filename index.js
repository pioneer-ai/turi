const express = require('express');
const { NlpManager } = require('node-nlp');
const fs = require('fs');
const bodyParser = require('body-parser');
const Filter = require('bad-words');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const app = express();
const port = 8080;

// Create an instance of the NLP manager
const manager = new NlpManager({ languages: ['en'] });

// Load the trained model
async function loadNpgModel() {
    await manager.load('/disk/models/npg-0.nlp');
}

// Train and save the model
loadNpgModel()
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
    const message = req.body.prompt.toLowerCase();

    // Check for explicit content asynchronously
    const hasExplicitContent = await containsExplicitContent(message);

    if (hasExplicitContent) {
        response = "I'm sorry, but I cannot respond to that request.";
        res.send({ answer: response });
        return;
    }

    try {
        const response = await manager.process('en', message);
        const answer = response.answer || 'Sorry, I do not understand.';
        res.send({ answer });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Handle POST requests to /api/img endpoint
app.post('/api/img', async (req, res) => {
    const message = req.body.prompt.toLowerCase();

    // Check for explicit content asynchronously
    const hasExplicitContent = await containsExplicitContent(message);

    if (hasExplicitContent) {
        let response = {
            message: "I'm sorry, but I cannot respond to that request.",
            type: "text"
        };
        res.send(response);
        return;
    }

    try {
        const img = await generateDataImg(message);
        const resp = {
            message: img,
            type: "img"
        };
        res.send(resp);
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

// Load your trained image generation model
async function loadRpiModel() {
    const model = await tf.loadLayersModel('/disk/models/rpi-0.json');
    return model;
}

async function generateDataImg(prompt) {
    const model = await loadRpiModel();

    // Preprocess the textual prompt (e.g., convert to numerical representation)
    const promptTensor = preprocessText(promptText);

    // Generate the image from the prompt
    let tensor = model.predict(promptTensor);

    const canvas = document.createElement('canvas');
    const [width, height, channels] = tensor.shape;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    // Normalize tensor values to the range [0, 255]
    const normalizedTensor = tf.mul(tf.add(tensor, 1), 127.5);

    // Create an image buffer from the tensor data
    const imageBuffer = new Uint8ClampedArray(normalizedTensor.dataSync());

    // Create ImageData object from the buffer
    const imageData = new ImageData(imageBuffer, width, height);

    // Draw the image data onto the canvas
    ctx.putImageData(imageData, 0, 0);

    // Get the data URL from the canvas
    const dataUrl = canvas.toDataURL();

    return dataUrl;
}

function preprocessText(promptText) {
    // Define your text preprocessing logic here
    // ...

    // For illustration purposes, let's assume a simple one-hot encoding

    const vocabulary = ['cat', 'dog', 'bird']; // Example vocabulary
    const promptTokens = promptText.split(' ');

    // Create a tensor with the same length as the vocabulary
    const tensorShape = [1, vocabulary.length];
    const promptTensor = tf.buffer(tensorShape);

    // Encode the text prompt as a one-hot tensor
    promptTokens.forEach((token) => {
        const tokenIndex = vocabulary.indexOf(token);
        if (tokenIndex !== -1) {
            promptTensor.set(1, 0, tokenIndex);
        }
    });

    return promptTensor.toTensor();
}