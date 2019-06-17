
// Utils
const {
    parseLetter,
    p,
} = require('./util');

const SuggestLetterIntentHandler = {
    
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SuggestLetterIntent';
    },
    
    async handle(handlerInput) {
        
        const request = handlerInput.requestEnvelope.request;
        const slots = request.intent.slots;
        const letter = parseLetter(slots.letter.value);

        let speechText = '';
        let ended = false;

        const attributes = await handlerInput.attributesManager.getSessionAttributes();
        const { word } = attributes;
        let { triedLetters } = attributes;

        // finish shortcut
        const speak = (speechText, shouldEndSession) => {
            return handlerInput.responseBuilder
                    .speak(speechText)
                    .reprompt('Diga alguma letra...')
                    .withShouldEndSession(shouldEndSession || false)
                    .getResponse()
        };

        // check if guessed letter is valid
        // else stop here
        if (!VALID_LETTERS.includes(letter)) {
            return speak(p(`A letra que você chutou não é válida.`) + p(`Tente outra.`));
        }

        // check if letter hasnt been guessed yet
        // else stop here
        if (hasBeenGuessed(letter, triedLetters)) {
            return speak(p(`Você já chutou a letra ${letter}`) + p(`Tente outra.`));
        }

        // persist new tried letter
        attributes.triedLetters = triedLetters = triedLetters.concat(letter);
        handlerInput.attributesManager.setSessionAttributes(attributes);

        // get hit, life and missing letters count
        const hitCount = countHits(letter, word);
        const lifeCount = countLives(word, triedLetters);
        const missingCount = countMissingLetters(word, triedLetters);

        // say guessed letter
        speechText += p(`Você chutou a letra ${letter}.`);

        // say hit count
        if (hitCount > 1) {
            speechText += p(`Acertou ${hitCount} posições.`);
        } else if (hitCount === 1) {
            speechText += p(`Acertou 1 posição.`);
        } else {
            speechText += p(`Não acertou nada.`);
        }
        
        // say missing count (or tell user it've won)
        if (missingCount > 1) {
            speechText += p(`Faltam ${missingCount} letras.`);
        } else if (missingCount === 1) {
            speechText += p(`Falta 1 letra.`);
        } else {
            return speak(`Parabéns, você ganhou! A palavra é ${word}.`, true);
        }

        // say life count (or tell user it've lost)
        if (lifeCount > 1) {
            speechText += p(`Restam ${lifeCount} vidas.`);
        } else if (lifeCount === 1) {
            speechText += p(`Resta ${lifeCount} vida.`);
        } else {
            return speak(`Acabaram suas vidas, você perdeu! A palavra era  ${word}.`, true);
        }
        
        return speak(speechText);
    }
};