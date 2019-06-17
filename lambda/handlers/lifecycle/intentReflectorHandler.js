
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

        const speechText = `You você invocou ${intentName}`;

        return handlerInput.responseBuilder
                .speak(speechText)
                .getResponse();
    }
}
