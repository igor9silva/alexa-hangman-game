
// Utils
const { p } = require('../util');

// Game Logic
const {
    hasBeenGuessed,
    countLives,
    countMissingLetters,
} = require('../game');

// i18n
const { messageLocalizer } = require('../i18n');

module.exports = {
    
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetStatusIntent';
    },
    
    async handle(handlerInput) {
        
        const attributes = await handlerInput.attributesManager.getSessionAttributes();
        const { word, triedLetters } = attributes;
        
        const lifeCount = countLives(word, triedLetters);
        const missingCount = countMissingLetters(word, triedLetters);
        
        // get request locale
        const locale = handlerInput.requestEnvelope.request.locale;
        const l7d = messageLocalizer(locale);
 
        let speechText = '';
        
        // say life count
        if (lifeCount > 1) {
            speechText += p(l7d('You have {0} lives left.', lifeCount));
        } else if (lifeCount === 1) {
            speechText += p(l7d('You have 1 life left.'));
        }
        
        // say missing count
        if (missingCount > 1) {
            speechText += p(l7d('There is {0} missing letters.', missingCount));
        } else if (missingCount === 1) {
            speechText += p(l7d('There is 1 missing letter.'));
        }

        // spell out letters (say "empty" if hasn't been guessed)
        speechText += p(l7d('I\'ll speak case by case:'));
        for (let letter of word) {
            if (hasBeenGuessed(letter, triedLetters)) {
                speechText += p(letter);
            } else {
                speechText += p(l7d('empty'));
            }
        }

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(l7d('Say any letter...'))
                .getResponse();
    }
}
