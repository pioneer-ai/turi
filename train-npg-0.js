const { NlpManager } = require('node-nlp');
const fs = require('fs');

// Length = 206
let trainingData = [
    {
        "input": "hi",
        "output": "Hello!"
    },
    {
        "input": "generate an image of a cat",
        "output": "*[img-cat]"
    },
    {
        "input": "technical info",
        "output": "Model: Naturalistic Pre-trained Generation (NPG-0) Model Codename: Kumquat Zero Model info: 146 params, 0.93MB XXS Model"
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
        "output": "I can chat with you and provide generic information on a topic. For more information head to https://pioneer.fifly.org/info/."
    },
    {
        "input": "what is npg-0",
        "output": "NPG-0 (Naturalistic Pre-trained Generation) is a NLP model for engaging in conversation and chatting. It is used in the chatbot Pioneer Chat."
    },
    {
        "input": "what company owns pioneer labs",
        "output": "Pioneer Labs is owned by FiFly, Corp. FiFly's website is https://www.fifly.org/"
    },
    {
        "input": "what is nlp",
        "output": "Natural Language Processing (NLP) is a type of AI or machine learning where a AI model can interpret and utilize natural text."
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
    },
    {
        "input": "what's the best way to learn programming?",
        "output": "The best way to learn programming is to start with a beginner-friendly language, practice regularly, and work on real-world projects."
      },
      {
        "input": "tell me about the benefits of meditation.",
        "output": "Meditation has many benefits, including reduced stress, improved focus, and increased self-awareness."
      },
      {
        "input": "what are some popular tourist attractions in rome?",
        "output": "Some popular tourist attractions in Rome include the Colosseum, Vatican City, and the Trevi Fountain."
      },
      {
        "input": "how do i make a paper airplane?",
        "output": "To make a paper airplane, fold a sheet of paper in half, then fold the top corners to the center, fold the resulting triangle in half, and fold the wings down."
      },
      {
        "input": "what's the difference between a virus and a bacteria?",
        "output": "Viruses are smaller than bacteria and require a host to reproduce, while bacteria are single-celled organisms that can reproduce on their own."
      },
      {
        "input": "how do i grow tomatoes in a garden?",
        "output": "To grow tomatoes in a garden, choose a sunny spot, prepare the soil, plant the tomato seedlings, and water and fertilize them regularly."
      },
      {
        "input": "what's the process for getting a driver's license?",
        "output": "The process for getting a driver's license involves studying the driver's manual, taking a written test, practicing driving with a licensed adult, and passing a road test."
      },
      {
        "input": "tell me about the history of the great wall of china.",
        "output": "The Great Wall of China was built over centuries to protect China from invasions and is considered one of the world's most impressive architectural feats."
      },
      {
        "input": "how do i create a budget for personal finance?",
        "output": "To create a budget for personal finance, track your expenses, categorize them, set financial goals, allocate funds accordingly, and review and adjust the budget regularly."
      },
      {
        "input": "what are the symptoms of a common cold?",
        "output": "Symptoms of a common cold include a runny or stuffy nose, sore throat, cough, and mild fatigue."
      },
      {
        "input": "what's the best way to prepare for a job interview?",
        "output": "To prepare for a job interview, research the company, practice common interview questions, dress professionally, and bring copies of your resume and any relevant documents."
      },
      {
        "input": "how do i train a dog to sit?",
        "output": "To train a dog to sit, hold a treat above their head, say the command 'sit,' and gently press their hindquarters down while praising them. Repeat this process consistently."
      },
      {
        "input": "what's the capital of australia?",
        "output": "The capital of Australia is Canberra."
      },
      {
        "input": "tell me about the health benefits of drinking water.",
        "output": "Drinking water has numerous health benefits, including maintaining hydration, supporting digestion, and promoting healthy skin."
      },
      {
        "input": "how do i improve my public speaking skills?",
        "output": "To improve your public speaking skills, practice regularly, prepare and rehearse your speeches, focus on body language and vocal tone, and seek feedback from others."
      },
      {
        "input": "what's the best way to store fresh produce?",
        "output": "The best way to store fresh produce is to keep them in a cool, dry place or in the refrigerator, depending on the specific fruit or vegetable."
      },
      {
        "input": "how do i take care of indoor plants?",
        "output": "To take care of indoor plants, provide them with adequate sunlight, water them regularly (but avoid overwatering), and occasionally fertilize them."
      },
      {
        "input": "what's the process for applying to college?",
        "output": "The process for applying to college involves researching and selecting schools, completing applications, submitting required documents, and potentially attending interviews or campus visits."
      },
      {
        "input": "tell me about the history of the internet.",
        "output": "The Internet was developed in the late 1960s and has since revolutionized communication and information sharing on a global scale."
      },
      {
        "input": "how do i make homemade pizza?",
        "output": "To make homemade pizza, prepare the dough, add your desired toppings, and bake it in the oven until the crust is golden and the cheese is melted."
      },
      {
        "input": "what are the health benefits of regular exercise?",
        "output": "Regular exercise has numerous health benefits, including improved cardiovascular health, increased strength and flexibility, and enhanced mood."
      },
      {
        "input": "how do i take care of my laptop battery?",
        "output": "To take care of your laptop battery, avoid overcharging it, keep it cool, and occasionally recalibrate it by fully charging and discharging."
      },
      {
        "input": "what's the best way to start a small business?",
        "output": "The best way to start a small business is to conduct market research, develop a business plan, secure funding, and take steps to establish your products or services."
      },
      {
        "input": "how do i make homemade chocolate chip cookies?",
        "output": "To make homemade chocolate chip cookies, cream butter and sugar, add eggs and vanilla extract, mix in dry ingredients and chocolate chips, and bake until golden brown."
      },
      {
        "input": "what's the largest ocean in the world?",
        "output": "The largest ocean in the world is the Pacific Ocean."
      },
      {
        "input": "tell me about the health benefits of regular sleep.",
        "output": "Regular sleep has numerous health benefits, including improved cognitive function, boosted immune system, and better overall mental and physical well-being."
      },
      {
        "input": "how do i improve my photography skills?",
        "output": "To improve your photography skills, practice regularly, learn about composition and lighting, experiment with different settings, and study the work of other photographers."
      },
      {
        "input": "what's the process for buying a house?",
        "output": "The process for buying a house involves getting pre-approved for a mortgage, finding a real estate agent, searching for homes, making an offer, and completing the closing process."
      },
      {
        "input": "tell me about the history of the olympic games.",
        "output": "The Olympic Games have a long history dating back to ancient Greece and have evolved into the international sporting event we know today."
      },
      {
        "input": "how do i write a compelling resume?",
        "output": "To write a compelling resume, highlight your relevant skills and experiences, use action verbs, tailor it to the specific job, and proofread for errors."
      },
      {
        "input": "what's the best way to manage stress?",
        "output": "The best way to manage stress is to practice relaxation techniques, engage in regular exercise, maintain a healthy lifestyle, and seek support from loved ones."
      },
      {
        "input": "how do i take care of a newborn baby?",
        "output": "To take care of a newborn baby, ensure proper feeding and burping, establish a sleep routine, keep them clean and comfortable, and provide lots of love and attention."
      },
      {
        "input": "what are the symptoms of seasonal allergies?",
        "output": "Symptoms of seasonal allergies include sneezing, itching eyes, runny nose, and congestion, often triggered by pollen or other environmental factors."
      },
      {
        "input": "what's the best way to save money?",
        "output": "The best way to save money is to create a budget, track expenses, cut back on non-essential spending, and consider automated savings or investment options."
      },
      {
        "input": "how do i take care of leather shoes?",
        "output": "To take care of leather shoes, clean them regularly with a soft cloth, apply a leather conditioner, store them in a cool, dry place, and polish them when needed."
      },
      {
        "input": "what's the process for starting a blog?",
        "output": "The process for starting a blog involves choosing a blogging platform, selecting a niche or topic, creating and publishing content, and promoting your blog to gain readership."
      },
      {
        "input": "tell me about the history of space exploration.",
        "output": "Space exploration has a rich history, from the first human-made satellites to landing on the moon and sending probes to distant planets."
      },
      {
        "input": "how do i improve my time management skills?",
        "output": "To improve your time management skills, set clear goals, prioritize tasks, eliminate distractions, delegate when possible, and use productivity tools or techniques."
      },
      {
        "input": "what's the best way to handle conflicts in relationships?",
        "output": "The best way to handle conflicts in relationships is to communicate openly, listen to each other's perspectives, seek compromise, and prioritize empathy and understanding."
      },
      {
        "input": "how do i make a healthy breakfast?",
        "output": "To make a healthy breakfast, include a balance of protein, whole grains, fruits or vegetables, and healthy fats, such as eggs with whole grain toast and avocado slices."
      },
      {
        "input": "what's the process for adopting a pet?",
        "output": "The process for adopting a pet involves researching and selecting a suitable pet, filling out an adoption application, meeting the pet, and completing the necessary paperwork."
      },
      {
        "input": "tell me about the history of the roman empire.",
        "output": "The Roman Empire was one of the most powerful and influential civilizations in history, spanning several centuries and leaving a lasting impact on culture, governance, and architecture."
      },
      {
        "input": "how do i create a strong password?",
        "output": "To create a strong password, use a combination of uppercase and lowercase letters, numbers, and symbols, and avoid using easily guessable information or common phrases."
      },
      {
        "input": "what's the best way to build a professional network?",
        "output": "The best way to build a professional network is to attend industry events, join professional organizations, leverage online platforms like LinkedIn, and engage in networking conversations."
      },
      {
        "input": "how do i make a good first impression?",
        "output": "To make a good first impression, dress appropriately, maintain good posture and eye contact, be attentive and engaged in conversations, and show genuine interest in others."
      },
      {
        "input": "what are the symptoms of a migraine headache?",
        "output": "Symptoms of a migraine headache include severe head pain, sensitivity to light and sound, nausea, and in some cases, visual disturbances or aura."
      },
      {
        "input": "how do i remove a stain from clothing?",
        "output": "To remove a stain from clothing, identify the type of stain, treat it with the appropriate stain remover or method, and wash the garment following the care instructions."
      },
      {
        "input": "what's the process for filing taxes?",
        "output": "The process for filing taxes involves gathering necessary documents, completing the appropriate tax forms, calculating income and deductions, and submitting the return to the tax authorities."
      },
      {
        "input": "tell me about the history of the renaissance.",
        "output": "The Renaissance was a period of cultural and intellectual flourishing in Europe, marked by advancements in art, literature, science, and philosophy."
      },
      {
        "input": "how do i improve my creative writing skills?",
        "output": "To improve your creative writing skills, read widely, practice writing regularly, experiment with different styles and genres, and seek feedback from peers or writing communities."
      },
      {
        "input": "what's the best way to start investing in the stock market?",
        "output": "The best way to start investing in the stock market is to educate yourself about different investment options, set financial goals, and consider working with a financial advisor."
      },
      {
        "input": "how do i reduce my carbon footprint?",
        "output": "To reduce your carbon footprint, consider using renewable energy sources, minimizing energy consumption, reducing waste, and adopting sustainable transportation options."
      },
      {
        "input": "what are the symptoms of a broken bone?",
        "output": "Symptoms of a broken bone include severe pain, swelling, bruising, deformity, and difficulty moving the affected area."
      },
      {
        "input": "how do i take care of a cactus?",
        "output": "To take care of a cactus, provide it with plenty of sunlight, water sparingly, use well-draining soil, and avoid overhandling or touching the spines."
      },
      {
        "input": "what's the process for writing a research paper?",
        "output": "The process for writing a research paper involves choosing a topic, conducting research, organizing and outlining the paper, writing the draft, and revising and editing it."
      },
      {
        "input": "tell me about the history of the industrial revolution.",
        "output": "The Industrial Revolution was a period of significant technological, economic, and social changes, marked by the transition to machine-based manufacturing and the rise of factories."
      },
      {
        "input": "how do i make a healthy smoothie?",
        "output": "To make a healthy smoothie, blend together a combination of fruits, vegetables, a liquid base (such as water or almond milk), and optional add-ins like yogurt or protein powder."
      },
      {
        "input": "what's the best way to study for exams?",
        "output": "The best way to study for exams is to create a study schedule, break down the material into manageable chunks, review and practice regularly, and use active learning techniques."
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
    console.log("NPG-0 Model trained and saved successfully!");
}

trainModel();
