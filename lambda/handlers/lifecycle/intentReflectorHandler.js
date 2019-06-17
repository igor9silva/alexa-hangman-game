
// i18n
const { messageLocalizer } = require('../i18n');

module.exports = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },

    handle(handlerInput) {

        const intentName = handlerInput.requestEnvelope.request.intent.name;
        
        // get request locale
        const locale = handlerInput.requestEnvelope.request.locale;
        const l7d = messageLocalizer(locale);

        return handlerInput.responseBuilder
                .speak(l7d('You\'ve invoked {0}', intentName))
                .getResponse();
    }
}
