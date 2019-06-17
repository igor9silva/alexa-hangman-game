
// i18n
const { messageLocalizer } = require('../i18n');

module.exports = {

    canHandle() {
        return true;
    },

    handle(handlerInput, error) {
        
        // get request locale
        const locale = handlerInput.requestEnvelope.request.locale;
        const l7d = messageLocalizer(locale);

        console.log(`~~~~ Error handled: ${error.message}`); // you can see those on CloudWatch

        return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(l7d('Sorry, I didn\'t understand what you\'ve said. Could you please repeat?'))
                .getResponse();
    }
}
