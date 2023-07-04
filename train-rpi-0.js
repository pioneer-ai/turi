const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

// Define your model architecture
function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 100, inputShape: [100] }));
    model.add(tf.layers.dense({ units: 784, activation: 'sigmoid' }));
    return model;
}

async function trainModel(model, data, epochs, batchSize) {
    const { trainImages, trainLabels } = data;

    model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

    await model.fit(trainImages, trainLabels, {
        epochs,
        batchSize,
        shuffle: true,
        callbacks: tf.callbacks.earlyStopping({ patience: 10 }),
    });
}

async function loadData() {
    const datasetPath = './rpi-data/';

    const imageFiles = fs.readdirSync(datasetPath);

    const images = [];
    const labels = [];

    for (const file of imageFiles) {
        const imagePath = path.join(datasetPath, file);
        const imageBuffer = fs.readFileSync(imagePath);
        const decodedImage = /*tf.node.decodeImage(imageBuffer)*/imageBuffer;

        // Preprocess the image if needed (e.g., resize or normalize)

        images.push(decodedImage);
        labels.push(file.split('.')[0]);
    }

    const trainImages = tf.stack(images);
    const trainLabels = tf.stack(labels);

    return { trainImages, trainLabels };
}

async function trainAndSaveModel() {
    // Load your dataset and preprocess it
    const { trainImages, trainLabels } = await loadData();

    // Create and compile the model
    const model = createModel();

    // Train the model
    await trainModel(model, { trainImages, trainLabels }, 10, 32);

    // Save the trained model
    await model.save('/disk/models/rpi-0.json');

    console.log("RPI-0 Model trained and saved successfully!");
}

trainAndSaveModel();