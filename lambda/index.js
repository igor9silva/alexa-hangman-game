
// Alexa Skill Kit
const Alexa = require('ask-sdk-core');

// TODO: add more words
// TODO: add word categories

// Skill Lifecycle
// const ErrorHandler = require('./handlers/lifecycle/errorHandler');
// const IntentReflectorHandler = require('./handlers/lifecycle/intentReflectorHandler');
// const CancelAndStopIntentHandler = require('./handlers/lifecycle/cancelAndStopIntentHandler');
// const SessionEndedRequestHandler = require('./handlers/lifecycle/sessionEndedRequestHandler');

// Main User Interactions
// const HelpIntentHandler = require('./handlers/helpIntentHandler');
// const LaunchRequestHandler = require('./handlers/launchRequestHandler');
// const GetStatusIntentHandler = require('./handlers/getStatusIntentHandler');
// const SuggestLetterIntentHandler = require('./handlers/suggestLetterIntentHandler');

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders
    .custom()
    .addRequestHandlers(
        // LaunchRequestHandler,
        // SuggestLetterIntentHandler,
        // GetStatusIntentHandler,
        // HelpIntentHandler,
        // CancelAndStopIntentHandler,
        // SessionEndedRequestHandler,
        // IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        // ErrorHandler,
    )
    .lambda();
