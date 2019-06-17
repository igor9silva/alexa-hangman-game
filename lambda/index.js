const Alexa = require('ask-sdk-core');

// Constants
const { INITIAL_LIVES, WORDS, VALID_LETTERS } = require('./config');

// Utils
const {
    randomIndex,
    parseLetter,
} = require('./util');

// Intent Handlers
const {
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler,
    ErrorHandler,
} = require('./handlers/defaultHandlers');

const LaunchRequestHandler = {
    
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
        
        console.log('letter:', letter);
        console.log('word:', word);
        console.log('hitCount:', hitCount);
        console.log('lifeCount:', lifeCount);
        console.log('missingCount:', missingCount);
        console.log('triedLetters:', triedLetters.join(', '));

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

const GetStatusIntentHandler = {
    
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
};

/// surround string with paragragh tag <p>
function p(text) {
    return `<p>${text}</p>\n`
}

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SuggestLetterIntentHandler,
        GetStatusIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
