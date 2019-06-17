
// i18n
const { messageLocalizer } = require('../i18n');

module.exports = {
    
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    
    handle(handlerInput) {

        // get request locale
        const locale = handlerInput.requestEnvelope.request.locale;
        const l7d = messageLocalizer(locale);

        const speechText = l7d('Say any letter, ask how you\'re going, or quit! Which one will it be?');

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
    }
}
