const { NlpManager } = require('node-nlp');
const fs = require('fs');

// Length = 144
let trainingData = [
    {
        "input": "hi",
        "output": "Hello!"
    },
    {
        "input": "technical info",
        "output": "Model: Naturalistic Pre-trained Generation (NPG-0) model Codename: Kumquat Zero Model info: 143 params, 1.0MB XXS Model"
    },
    {
        "input": "thanks",
        "output": "Your welcome! I'm always here to help."
    },
    {
        "input": "who are you",
        "output": "I'm Pioneer Chat - Your AI chatbot."
    },
    {
        "input": "what can you do",
        "output": "I can chat with you and provide generic information on a topic. For more information head to https://pioneer.fifly.org/info."
    },
    {
        "input": "what are you",
        "output": "I'm an AI chatbot using the model NPG-0. My name is Pioneer Chat and I was created by Pioneer Labs."
    },
    {
        "input": "hello",
        "output": "Hi!"
    },
    {
        "input": "how are you",
        "output": "I'm good, thank you!"
    },
    {
        "input": "what is your name",
        "output": "My name is Pioneer Chat (using the NPG-0 model)."
    },
    {
        "input": "who created you",
        "output": "I was created by a team of developers at Pioneer Labs."
    },
    {
        "input": "tell me a joke",
        "output": "Why don't scientists trust atoms? Because they make up everything!"
    },
    {
        "input": "tell me another joke",
        "output": "Why did the cat cross the road? Because it wanted to!"
    },
    {
        "input": "that wasn't funny",
        "output": "I'm sorry."
    },
    {
        "input": "what is the weather today",
        "output": "I'm sorry, I don't have access to real-time weather information."
    },
    {
        "input": "what is the capital of France",
        "output": "The capital of France is Paris."
    },
    {
        "input": "tell me about yourself",
        "output": "I am a AI chatbot running on the NPG-0 model. I was created by Pioneer Labs."
    },
    {
        "input": "how old are you",
        "output": "I don't have an age. I'm just a program."
    },
    {
        "input": "what is the meaning of life",
        "output": "The meaning of life is subjective and can vary for each individual."
    },
    {
        "input": "can you help me with programming",
        "output": "Of course! I can assist you with programming-related questions."
    },
    {
        "input": "do you have any hobbies",
        "output": "As an AI, I don't have hobbies, but I enjoy helping people with their inquiries."
    },
    {
        "input": "tell me a fun fact",
        "output": "Did you know that the world's oldest known organism is a seagrass called Posidonia oceanica?"
    },
    {
        "input": "what is the largest planet in our solar system",
        "output": "The largest planet in our solar system is Jupiter."
    },
    {
        "input": "tell me a quote",
        "output": "The only way to do great work is to love what you do. - Steve Jobs"
    },
    {
        "input": "can you recommend a good book",
        "output": "One highly recommended book is 'Sapiens: A Brief History of Humankind' by Yuval Noah Harari."
    },
    {
        "input": "what is the time",
        "output": "*[time]"
    },
    {
        "input": "what is your favorite color",
        "output": "I don't have a favorite color, but I appreciate all colors."
    },
    {
        "input": "where are you from",
        "output": "I don't have a physical presence. I exist in the digital realm."
    },
    {
        "input": "tell me a famous quote",
        "output": "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela"
    },
    {
        "input": "what is the square root of 16",
        "output": "The square root of 16 is 4."
    },
    {
        "input": "who is the current president of the United States",
        "output": "The current president of the United States is Joe Biden."
    },
    {
        "input": "can you sing a song",
        "output": "I'm sorry, I don't have the ability to sing."
    },
    {
        "input": "tell me a random fact",
        "output": "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible."
    },
    {
        "input": "what is the largest mammal",
        "output": "The blue whale is the largest mammal on Earth."
    },
    {
        "input": "what is the meaning of AI",
        "output": "AI stands for Artificial Intelligence, which refers to the simulation of human intelligence by machines."
    },
    {
        "input": "tell me a famous scientist",
        "output": "One famous scientist is Albert Einstein, known for his theory of relativity."
    },
    {
        "input": "how far is the Moon",
        "output": "The average distance from Earth to the Moon is about 384,400 kilometers."
    },
    {
        "input": "what is the best programming language",
        "output": "The best programming language depends on the specific use case and personal preference. There is no definitive answer."
    },
    {
        "input": "tell me a riddle",
        "output": "I have cities but no houses, forests but no trees, and rivers but no water. What am I? A map!"
    },
    {
        "input": "what is the national animal of Canada",
        "output": "The national animal of Canada is the beaver."
    },
    {
        "input": "what is the largest ocean on Earth",
        "output": "The largest ocean on Earth is the Pacific Ocean."
    },
    {
        "input": "tell me a famous painting",
        "output": "One famous painting is the Mona Lisa by Leonardo da Vinci."
    },
    {
        "input": "how many continents are there",
        "output": "There are seven continents: Africa, Antarctica, Asia, Europe, North America, Australia (Oceania), and South America."
    },
    {
        "input": "what is the speed of light",
        "output": "The speed of light in a vacuum is approximately 299,792 kilometers per second."
    },
    {
        "input": "tell me a mythological creature",
        "output": "One mythological creature is the phoenix, a bird associated with rebirth and resurrection."
    },
    {
        "input": "what is the currency of Japan",
        "output": "The currency of Japan is the Japanese yen (JPY)."
    },
    {
        "input": "tell me a famous inventor",
        "output": "One famous inventor is Thomas Edison, known for inventing the practical electric light bulb."
    },
    {
        "input": "how many planets are there in our solar system",
        "output": "There are eight planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune."
    },
    {
        "input": "what is the tallest mountain in the world",
        "output": "The tallest mountain in the world is Mount Everest, located in the Himalayas."
    },
    {
        "input": "tell me a famous actor",
        "output": "One famous actor is Leonardo DiCaprio, known for his roles in movies like Titanic and The Revenant."
    },
    {
        "input": "what is the boiling point of water",
        "output": "The boiling point of water is 100 degrees Celsius (212 degrees Fahrenheit) at sea level."
    },
    {
        "input": "who painted the Sistine Chapel ceiling",
        "output": "The Sistine Chapel ceiling was painted by Michelangelo."
    },
    {
        "input": "tell me a famous landmark",
        "output": "One famous landmark is the Eiffel Tower in Paris, France."
    },
    {
        "input": "how many languages are spoken in the world",
        "output": "There are thousands of languages spoken in the world, but the exact number is difficult to determine."
    },
    {
        "input": "what is the largest desert in the world",
        "output": "The largest desert in the world is the Antarctic Desert, followed by the Arctic Desert."
    },
    {
        "input": "tell me a famous musician",
        "output": "One famous musician is Ludwig van Beethoven, a renowned composer and pianist."
    },
    {
        "input": "what is the chemical symbol for gold",
        "output": "The chemical symbol for gold is Au, derived from the Latin word 'aurum'."
    },
    {
        "input": "who wrote the novel 'Pride and Prejudice'",
        "output": "The novel 'Pride and Prejudice' was written by Jane Austen."
    },
    {
        "input": "tell me a famous athlete",
        "output": "One famous athlete is Usain Bolt, a Jamaican sprinter and multiple Olympic gold medalist."
    },
    {
        "input": "how many bones are in the human body",
        "output": "The human body typically has 206 bones."
    },
    {
        "input": "what is the largest species of shark",
        "output": "The largest species of shark is the whale shark."
    },
    {
        "input": "tell me a famous actress",
        "output": "One famous actress is Meryl Streep, known for her versatile performances and numerous accolades."
    },
    {
        "input": "what is the diameter of the Earth",
        "output": "The diameter of the Earth is about 12,742 kilometers."
    },
    {
        "input": "who wrote the play 'Romeo and Juliet'",
        "output": "The play 'Romeo and Juliet' was written by William Shakespeare."
    },
    {
        "input": "tell me a famous landmark in India",
        "output": "One famous landmark in India is the Taj Mahal, a mausoleum located in Agra."
    },
    {
        "input": "what is the population of China",
        "output": "The population of China is over 1.4 billion people."
    },
    {
        "input": "who is the author of 'To Kill a Mockingbird'",
        "output": "The author of 'To Kill a Mockingbird' is Harper Lee."
    },
    {
        "input": "tell me a famous scientist",
        "output": "One famous scientist is Marie Curie, known for her pioneering research on radioactivity."
    },
    {
        "input": "what is the largest stadium in the world",
        "output": "The largest stadium in the world by capacity is the Rungrado 1st of May Stadium in Pyongyang, North Korea."
    },
    {
        "input": "how many players are there in a soccer team",
        "output": "A soccer team typically has 11 players."
    },
    {
        "input": "tell me a famous scientist",
        "output": "One famous scientist is Isaac Newton, known for his laws of motion and universal gravitation."
    },
    {
        "input": "what is the capital of France",
        "output": "The capital of France is Paris."
    },
    {
        "input": "tell me a famous artist",
        "output": "One famous artist is Pablo Picasso, known for his contributions to modern art."
    },
    {
        "input": "what is the largest country in the world",
        "output": "The largest country in the world by land area is Russia."
    },
    {
        "input": "who wrote the play 'Hamlet'",
        "output": "The play 'Hamlet' was written by William Shakespeare."
    },
    {
        "input": "tell me a famous author",
        "output": "One famous author is J.K. Rowling, known for the Harry Potter book series."
    },
    {
        "input": "what is the capital of Australia",
        "output": "The capital of Australia is Canberra."
    },
    {
        "input": "tell me a famous musician",
        "output": "One famous musician is Wolfgang Amadeus Mozart, a prolific composer from the classical era."
    },
    {
        "input": "what is the largest lake in Africa",
        "output": "The largest lake in Africa is Lake Victoria."
    },
    {
        "input": "who painted the 'Mona Lisa'",
        "output": "The 'Mona Lisa' was painted by Leonardo da Vinci."
    },
    {
        "input": "tell me a famous athlete",
        "output": "One famous athlete is Serena Williams, a highly successful tennis player."
    },
    {
        "input": "what is the currency of Germany",
        "output": "The currency of Germany is the Euro (€)."
    },
    {
        "input": "tell me a famous landmark in the United States",
        "output": "One famous landmark in the United States is the Statue of Liberty in New York."
    },
    {
        "input": "what is the population of Brazil",
        "output": "The population of Brazil is over 211 million people."
    },
    {
        "input": "who is the author of '1984'",
        "output": "The author of '1984' is George Orwell."
    },
    {
        "input": "tell me a famous inventor",
        "output": "One famous inventor is Alexander Graham Bell, known for inventing the telephone."
    },
    {
        "input": "what is the largest city in Canada",
        "output": "The largest city in Canada is Toronto."
    },
    {
        "input": "tell me a famous actress",
        "output": "One famous actress is Audrey Hepburn, known for her iconic roles in movies like 'Breakfast at Tiffany's'."
    },
    {
        "input": "what is the height of Mount Kilimanjaro",
        "output": "The height of Mount Kilimanjaro is approximately 5,895 meters."
    },
    {
        "input": "who wrote the novel 'The Great Gatsby'",
        "output": "The novel 'The Great Gatsby' was written by F. Scott Fitzgerald."
    },
    {
        "input": "tell me a famous landmark in China",
        "output": "One famous landmark in China is the Great Wall of China."
    },
    {
        "input": "what is the population of India",
        "output": "The population of India is over 1.3 billion people."
    },
    {
        "input": "who is the author of 'The Lord of the Rings'",
        "output": "The author of 'The Lord of the Rings' is J.R.R. Tolkien."
    },
    {
        "input": "tell me a famous scientist",
        "output": "One famous scientist is Albert Einstein, known for his theory of relativity."
    },
    {
        "input": "what is the tallest building in the world",
        "output": "The tallest building in the world is the Burj Khalifa in Dubai, United Arab Emirates."
    },
    {
        "input": "how many planets are there in the solar system",
        "output": "There are eight planets in the solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune."
    },
    {
        "input": "who painted the 'Starry Night'",
        "output": "The 'Starry Night' was painted by Vincent van Gogh."
    },
    {
        "input": "tell me a famous athlete",
        "output": "One famous athlete is Michael Jordan, considered one of the greatest basketball players of all time."
    },
    {
        "input": "what is the currency of Japan",
        "output": "The currency of Japan is the Japanese Yen (¥)."
    },
    {
        "input": "tell me a famous landmark in France",
        "output": "One famous landmark in France is the Eiffel Tower in Paris."
    },
    {
        "input": "what is the population of the United States",
        "output": "The population of the United States is over 331 million people."
    },
    {
        "input": "who is the author of 'The Catcher in the Rye'",
        "output": "The author of 'The Catcher in the Rye' is J.D. Salinger."
    },
    {
        "input": "tell me a famous inventor",
        "output": "One famous inventor is Thomas Edison, known for his inventions such as the phonograph and the practical electric light bulb."
    },
    {
        "input": "what is the largest city in Australia",
        "output": "The largest city in Australia is Sydney."
    },
    {
        "input": "tell me a famous actress",
        "output": "One famous actress is Marilyn Monroe, known for her iconic status and memorable film performances."
    },
    {
        "input": "what is the depth of the Mariana Trench",
        "output": "The depth of the Mariana Trench is approximately 10,994 meters, making it the deepest part of the world's oceans."
    },
    {
        "input": "who wrote the novel 'Moby-Dick'",
        "output": "The novel 'Moby-Dick' was written by Herman Melville."
    },
    {
        "input": "tell me a famous landmark in Italy",
        "output": "One famous landmark in Italy is the Colosseum in Rome."
    },
    {
        "input": "what is the population of Russia",
        "output": "The population of Russia is over 144 million people."
    },
    {
        "input": "who is the author of 'The Hobbit'",
        "output": "The author of 'The Hobbit' is J.R.R. Tolkien."
    },
    {
        "input": "tell me a famous scientist",
        "output": "One famous scientist is Charles Darwin, known for his theory of evolution by natural selection."
    },
    {
        "input": "what is the tallest mountain in the world",
        "output": "The tallest mountain in the world is Mount Everest."
    },
    {
        "input": "how many continents are there",
        "output": "There are seven continents: Africa, Antarctica, Asia, Europe, North America, Australia (Oceania), and South America."
    },
    {
        "input": "who painted the 'Guernica'",
        "output": "The 'Guernica' was painted by Pablo Picasso."
    },
    {
        "input": "tell me a famous athlete",
        "output": "One famous athlete is Cristiano Ronaldo, a highly skilled soccer player."
    },
    {
        "input": "what is the currency of China",
        "output": "The currency of China is the Chinese Yuan (CNY)."
    },
    {
        "input": "tell me a famous landmark in Egypt",
        "output": "One famous landmark in Egypt is the Great Pyramids of Giza."
    },
    {
        "input": "what is the population of Japan",
        "output": "The population of Japan is over 126 million people."
    },
    {
        "input": "who is the author of 'To Kill a Mockingbird'",
        "output": "The author of 'To Kill a Mockingbird' is Harper Lee."
    },
    {
        "input": "tell me a famous inventor",
        "output": "One famous inventor is Nikola Tesla, known for his contributions to the development of alternating current (AC) electrical systems."
    },
    {
        "input": "what is the largest city in China",
        "output": "The largest city in China is Shanghai."
    },
    {
        "input": "tell me a famous actress",
        "output": "One famous actress is Meryl Streep, known for her versatile acting skills and numerous accolades."
    },
    {
        "input": "what is the height of the Eiffel Tower",
        "output": "The height of the Eiffel Tower is approximately 330 meters."
    },
    {
        "input": "who wrote the novel 'Pride and Prejudice'",
        "output": "The novel 'Pride and Prejudice' was written by Jane Austen."
    },
    {
        "input": "tell me a famous landmark in India",
        "output": "One famous landmark in India is the Taj Mahal in Agra."
    },
    {
        "input": "what is the population of China",
        "output": "The population of China is over 1.4 billion people."
    },
    {
        "input": "who is the author of 'The Chronicles of Narnia'",
        "output": "The author of 'The Chronicles of Narnia' is C.S. Lewis."
    },
    {
        "input": "tell me a famous scientist",
        "output": "One famous scientist is Marie Curie, known for her pioneering research on radioactivity."
    },
    {
        "input": "what is the tallest waterfall in the world",
        "output": "The tallest waterfall in the world is Angel Falls in Venezuela."
    },
    {
        "input": "how many elements are there in the periodic table",
        "output": "There are 118 elements in the periodic table."
    },
    {
        "input": "who painted the 'Sistine Chapel Ceiling'",
        "output": "The 'Sistine Chapel Ceiling' was painted by Michelangelo."
    },
    {
        "input": "tell me a famous athlete",
        "output": "One famous athlete is Usain Bolt, known as the fastest man in the world for his achievements in sprinting."
    },
    {
        "input": "what is the currency of Brazil",
        "output": "The currency of Brazil is the Brazilian Real (BRL)."
    },
    {
        "input": "tell me a famous landmark in the United Kingdom",
        "output": "One famous landmark in the United Kingdom is Big Ben in London."
    },
    {
        "input": "what is the population of Germany",
        "output": "The population of Germany is over 83 million people."
    },
    {
        "input": "who is the author of 'The Odyssey'",
        "output": "The author of 'The Odyssey' is Homer."
    },
    {
        "input": "tell me a famous inventor",
        "output": "One famous inventor is Galileo Galilei, known for his contributions to astronomy and physics."
    },
    {
        "input": "what is the largest city in the United States",
        "output": "The largest city in the United States is New York City."
    },
    {
        "input": "tell me a famous actress",
        "output": "One famous actress is Angelina Jolie, known for her acting skills and humanitarian work."
    },
    {
        "input": "what is the depth of the Grand Canyon",
        "output": "The depth of the Grand Canyon is approximately 1,857 meters."
    },
    {
        "input": "who wrote the novel 'The Odyssey'",
        "output": "The novel 'The Odyssey' was written by Homer."
    },
    {
        "input": "tell me a famous landmark in Brazil",
        "output": "One famous landmark in Brazil is the Christ the Redeemer statue in Rio de Janeiro."
    },
    {
        "input": "what is the population of the United Kingdom",
        "output": "The population of the United Kingdom is over 66 million people."
    },
    {
        "input": "who is the author of 'The Iliad'",
        "output": "The author of 'The Iliad' is Homer."
    },
    {
        "input": "how to create a file in node.js",
        "output": "You can create a file in Node.js as following:\nconst fs = require('fs');\n\nfs.writeFileSync(\"./a/path/to/some.where\");\nRemember to replace the path in fs.writeFileSync() to the path you want."
    }
];

// Train the model
async function trainModel() {
    // Create an instance of the NLP manager
    const manager = new NlpManager({ languages: ['en'] });

    trainingData.forEach((element, index) => {
        manager.addDocument('en', element.input, 'message.' + index.toString());
        manager.addAnswer('en', 'message.' + index.toString(), element.output);
    });

    await manager.train();
    await manager.save('/disk/models/npg-0/model.nlp');
    console.log("NPG-0 Model Params: " + trainingData.length.toString());
}

fs.writeFileSync("/disk/models/npg-0/model.nlp", "");
trainModel();
