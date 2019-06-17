
// Constants
const { INITIAL_LIVES } = require('../config');

// i18n
const {
    messageLocalizer,
    localizedRandomWord,
} = require('../i18n');

module.exports = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    
    async handle(handlerInput) {
        
        // get request locale
        const locale = handlerInput.requestEnvelope.request.locale;
        const l7d = messageLocalizer(locale);

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
            l7d('Hello, you are in the Hangman Game!'),
            l7d('The game has started!'),
            l7d('The word has {0} letters.', chosenWord.length),
            l7d('You have {0} lives.', INITIAL_LIVES),
            l7d('Guess a letter.'),
        ];

        return handlerInput.responseBuilder
                .speak(sentences.join(' '))
                .reprompt(l7d('Guess any letter...'))
                .getResponse();
    }
}
