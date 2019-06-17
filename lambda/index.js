
// Alexa Skill Kit
const Alexa = require('ask-sdk-core');

// TODO: abstract text messages (+ i18n)

const {
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler,
    ErrorHandler,
} = require('./handlers/defaultHandlers');

const HelpIntentHandler = require('./handlers/helpIntentHandler');
const CancelAndStopIntentHandler = require('./handlers/helpIntentHandler');
const SessionEndedRequestHandler = require('./handlers/sessionEndedRequestHandler');
const ErrorHandler = require('./handlers/errorHandler');
const IntentReflectorHandler = require('./handlers/intentReflectorHandler');

const LaunchRequestHandler = require('./handlers/launchRequestHandler');
const GetStatusIntentHandler = require('./handlers/GetStatusIntentHandler');
const SuggestLetterIntentHandler = require('./handlers/suggestLetterIntentHandler');

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders
    .custom()
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
