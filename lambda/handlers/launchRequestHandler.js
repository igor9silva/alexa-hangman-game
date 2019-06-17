
// Constants
const { INITIAL_LIVES } = require('../config');

const {
    localizedMessage,
    localizedRandomWord,
} = require('../i18n');

module.exports = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    
    async handle(handlerInput) {
        
        // get request locale
        const locale = handlerInput.requestEnvelope.request.locale;

        // shuffle a word
        const chosenWord = localizedRandomWord(locale);

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
            localizedMessage(locale, 'Hello, you are in the Hangman Game!'),
            localizedMessage(locale, 'The game has started!'),
            localizedMessage(locale, 'The word has {0} letters.', chosenWord.length),
            localizedMessage(locale, 'You have {0} lives.', INITIAL_LIVES),
            localizedMessage(locale, 'Guess a letter.'),
        ];

        return handlerInput.responseBuilder
                .speak(sentences.join(' '))
                .reprompt(localizedMessage(locale, 'Guess any letter...'))
                .getResponse();
    }
}
