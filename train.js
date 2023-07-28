const { NlpManager } = require('node-nlp');
const fs = require('fs');
const fetch = require('node-fetch');

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
    await manager.save('./npg-0.nlp');
    
    const fetchData = {
        method: 'POST',
        headers: {},
        body: JSON.stringify({
            key: "fgg37rutduygwe",
            path: "models/npg-0/npg-0.json",
            content: fs.readFileSync("./npg-0.nlp"),
        }),
    };

    fetch("https://datastore.fifly.org/api", fetchData).then(data => {
        if(JSON.parse(data.json()).success === false) {
            console.log("Error sending model to FiFly Datastore.");
        } else {
            console.log("Success sending model to FiFly Datastore.");
        }
    }).catch(err => {
        console.log("Error sending POST request to FiFly Datstore: " + err);
    });
    
    console.log("NPG-0 Model Params: " + trainingData.length.toString());
    console.log("NPG-0 Model trained and saved successfully!");
}

function getTrainingData() {
    return JSON.parse(fs.readFileSync("./scribe-datset.json"));
}

trainModel();
