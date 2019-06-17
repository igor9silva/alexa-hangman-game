

// Utils
const { p } = require('./util');

// Game Logic
const {
    countLives,
    countMissingLetters,
} = require('./game');

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
        
        console.log('lifeCount:', lifeCount);
        console.log('missingCount:', missingCount);
        console.log('triedLetters:', triedLetters.join(', '));
 
        let speechText = '';
        
        // say life count
        if (lifeCount > 1) {
            speechText += p(`Restam ${lifeCount} vidas.`);
        } else if (lifeCount === 1) {
            speechText += p(`Resta ${lifeCount} vida.`);
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
                speechText += p('vazio');
            }
        }

        // const speechText = `Vou listar os espaços: vazio, e, n, vazio, i, l, a, vazio, vazio, vazio. A palavra possui 10 letras. Você ainda tem 3 vidas.`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt('Diga alguma letra...')
                .getResponse();
    }
}
