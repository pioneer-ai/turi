# Building Turi
To build the Turi chatbot from source on your computer follow these steps.
## Installing dependencies
Turi requires Node.js and some NPM packages. Install Node.js and then install all of the required packages by using this command (make sure to run in the ``src`` directory):
```
npm install express node-nlp fs body-parser bad-words && npm build
```
Then your done installing Turi's dependencies.
## Building Turi
One command is required to build Turi (make sure to run in the ``src`` directory):
```
node train-0.js && node train-0.1.js && node index.js
```
## Finished
Now your done! Head to http://localhost:8080 where it is hosted.
