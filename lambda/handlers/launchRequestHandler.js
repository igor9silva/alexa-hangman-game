
// Constants
const {
    INITIAL_LIVES,
    WORDS,
} = require('./config');

// Utils
const { randomIndex } = require('./util');

module.exports = {
    
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    
    async handle(handlerInput) {

        // shuffle a word
        const chosenWord = WORDS[randomIndex(0, WORDS.length)];

        // get session attributes
        const attributes = await handlerInput.attributesManager.getSessionAttributes();

        // create initial params
        attributes.word = chosenWord.toUpperCase();
        attributes.triedLetters = [];

        // save attributes
        handlerInput.attributesManager.setSessionAttributes(attributes);

        // say hello, the chosen word length and how
        // many lives the user have
        const sentences = [
            `Olá, você está no Jogo da Forca!`,
            `O jogo já começou!`,
            `A palavra possui ${chosenWord.length} letras.`,
            `Você tem ${INITIAL_LIVES} vidas.`,
            `Chute uma letra.`,
        ];

        return handlerInput.responseBuilder
                .speak(sentences.join(' '))
                .reprompt('Diga alguma letra...')
                .getResponse();
    }
};

