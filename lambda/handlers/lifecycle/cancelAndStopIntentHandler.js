
// i18n
const { messageLocalizer } = require('../i18n');

module.exports = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },

    handle(handlerInput) {
        
        // get request locale
        const locale = handlerInput.requestEnvelope.request.locale;
        const l7d = messageLocalizer(locale);

        const speechText = l7d('Bye Bye! It was a nice game!');

        return handlerInput.responseBuilder
                .speak(speechText)
                .getResponse();
    }
}
