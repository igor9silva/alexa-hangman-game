const Alexa = require('ask-sdk-core');

const INITIAL_LIVES = 5;

const WORDS = [
    'ventilador',
    'parede',
    'porta',
    'celular',
    'rato',
    'macarrao',
];

const LETTERS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'X',
    'Z',
    'W',
    'Y',
];

const LaunchRequestHandler = {
    
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    
    async handle(handlerInput) {
        
        const chosenWord = WORDS[randomIndex(0, WORDS.length)];

        const sentences = [
            `Olá, você está no Jogo da Forca!`,
            `Já sorteei uma palavra e o jogo começou!`,
            `A palavra possui ${chosenWord.length} letras.`,
            `Você tem ${INITIAL_LIVES} vidas.`,
            `Chute uma letra.`,
        ];

        const attributes = await handlerInput.attributesManager.getSessionAttributes();

        // create initial attributes
        attributes.word = chosenWord.toUpperCase();
        attributes.triedLetters = [];

        handlerInput.attributesManager.setSessionAttributes(attributes);

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
        const { triedLetters, word } = attributes;

        if (LETTERS.includes(letter)) {

            if (hasntBeenGuessed(letter, triedLetters)) {
                
                // add new tried letter
                attributes.triedLetters = triedLetters.concat(letter);
                handlerInput.attributesManager.setSessionAttributes(attributes);

                // get hit and life count
                const hitCount = countHits(letter, triedLetters, word);
                const lifeCount = countLives(triedLetters, word);

                // build speech
                speechText += `Você chutou a letra ${letter}.`;
                speechText += (hitCount > 0) ? `Acertou ${hitCount} posições.` : `Não acertou nada.`;
                speechText += `Restam ${lifeCount} vidas.`;

                if (lifeCount === 0) {
                    speechText = 'Acabaram suas vidas, você perdeu!';
                    ended = true;
                }

            } else {
                speechText = `Você já chutou a letra ${letter}. Tente outra.`;
            }

        } else {
            speechText = `A letra que você chutou não é válida. Tente outra.`;
        }

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt('Diga alguma letra...')
                .withShouldEndSession(ended)
                .getResponse();
    }
};

const GetStatusIntentHandler = {
    
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetStatusIntent';
    },
    
    async handle(handlerInput) {
        
        // TODO: implement

        const attributes = await handlerInput.attributesManager.getSessionAttributes();

        const speechText = `A palavra é ${attributes.word}. Você já tentou as letras: ${attributes.triedLetters.join(', ')}`;

        // const speechText = `Vou listar os espaços: vazio, e, n, vazio, i, l, a, vazio, vazio, vazio. A palavra possui 10 letras. Você ainda tem 3 vidas.`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt('Diga alguma letra...')
                .getResponse();
    }
};

const HelpIntentHandler = {
    
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    
    handle(handlerInput) {

        const speechText = `Diga uma letra, pergunte como está o jogo, ou desista! O que deseja?`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
    }
};

const CancelAndStopIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },

    handle(handlerInput) {

        // TODO: implement

        const speechText = `Tchau! Foi um bom jogo!`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .getResponse();
    }
};

const SessionEndedRequestHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },

    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },

    handle(handlerInput) {

        const intentName = handlerInput.requestEnvelope.request.intent.name;

        const speechText = `You você invocou ${intentName}`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {

    canHandle() {
        return true;
    },

    handle(handlerInput, error) {

        console.log(`~~~~ Error handled: ${error.message}`);

        const speechText = `Desculpe, eu não entendi o que você disse. Por favor tente novamente.`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
    }
};

// HELPERS

function randomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function parseLetter(value) {
    return (value || '').toUpperCase().replace('.', '');
}

// ACTUAL GAME LOGIC

/// boolean
/// valid if letter wasn't guessed yet
function hasntBeenGuessed(letter, triedLetters) {
    return !triedLetters.includes(letter);
}

/// int
/// return the hit count (how many occurrencies of `letter` in `word`)
function countHits(letter, triedLetters, word) {
    if (!triedLetters.includes(letter)) {
        return word.split(letter).length - 1; // `letter` occurrencies in `word`
    } else {
        return 0;
    }
}

/// int
/// return the current life count
function countLives(triedLetters, word) {

    const failedAttempts = triedLetters.reduce((count, letter) => {
        return count + (word.includes(letter) ? 0 : 1);
    }, 0);
    
    return INITIAL_LIVES - failedAttempts;
}

function countMissingLetters(attributes) {
    
    const { triedLetters, word } = attributes;
    
    const failedAttempts = triedLetters.reduce((count, letter) => {
        return count + (word.includes(letter) ? 0 : 1);
    }, 0);
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
