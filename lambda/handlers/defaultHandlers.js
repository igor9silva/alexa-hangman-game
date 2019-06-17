
// When the user calls for help
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
}

// When the user aks to stop or cancel
const CancelAndStopIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },

    handle(handlerInput) {

        const speechText = `Tchau! Foi um bom jogo!`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .getResponse();
    }
}

// Whenever the session has ended. A chance to cleanup!
const SessionEndedRequestHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },

    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
}

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {

    canHandle() {
        return true;
    },

    handle(handlerInput, error) {

        console.log(`~~~~ Error handled: ${error.message}`); // you can see those on CloudWatch

        const speechText = `Desculpe, eu não entendi o que você disse. Por favor tente novamente.`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
    }
}

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain.
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
}

// exports handlers
module.exports.HelpIntentHandler = HelpIntentHandler;
module.exports.CancelAndStopIntentHandler = CancelAndStopIntentHandler;
module.exports.SessionEndedRequestHandler = SessionEndedRequestHandler;
module.exports.ErrorHandler = ErrorHandler;
module.exports.IntentReflectorHandler = IntentReflectorHandler;