const Alexa = require('ask-sdk-core');

// TODO: abstract text messages (+ i18n)
// Intent Handlers
const {
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler,
    ErrorHandler,
} = require('./handlers/defaultHandlers');

const LaunchRequestHandler = require('./handlers/launchRequestHandler');
const SuggestLetterIntentHandler = require('./handlers/suggestLetterIntentHandler');
const GetStatusIntentHandler = require('./handlers/GetStatusIntentHandler');

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
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
