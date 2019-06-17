
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
        
'There is {0} missing letters.'
'There is 1 missing letter.'
'You have {0} lives left.'
'You have 1 life left.'
'Say any letter...'
'I\'ll speak case by case:'
'empty'
        
        // say life count
        if (lifeCount > 1) {
            speechText += p(`Restam ${lifeCount} vidas.`);
        } else if (lifeCount === 1) {
            speechText += p(`Resta 1 vida.`);
        }
        
        // say missing count
        if (missingCount > 1) {
            speechText += p(`Faltam ${missingCount} letras.`);
        } else if (missingCount === 1) {
            speechText += p(`Falta 1 letra.`);
        }

        // spell out letters (say "empty" if hasn't been guessed)
        speechText += p(`Vou falar casa por casa ${triedLetters}:`);
        for (let letter of word) {
            if (hasBeenGuessed(letter, triedLetters)) {
                speechText += p(letter);
            } else {
                speechText += p(l7d('empty'));
            }
        }

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt('Diga alguma letra...')
                .getResponse();
    }
}
