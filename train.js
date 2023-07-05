const { NlpManager } = require('node-nlp');
const fs = require('fs');

let trainingData = getTrainingData();

// Train the model
async function trainModel() {
    // Create an instance of the NLP manager
    const manager = new NlpManager({ languages: ['en'] });

    trainingData.forEach((element, index) => {
        manager.addDocument('en', element.input, 'message.' + index.toString());
        manager.addAnswer('en', 'message.' + index.toString(), element.output);
    });

    await manager.train();
    await manager.save('/disk/models/npg-0.nlp');
    console.log("NPG-0 Model Params: " + trainingData.length.toString());
    console.log("NPG-0 Model trained and saved successfully!");
}

function getTrainingData() {
    return JSON.parse(fs.readFileSync("./scribe-datset.json"));
}

trainModel();