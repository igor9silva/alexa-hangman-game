
// i18n
const { messageLocalizer } = require('../i18n');

module.exports = {
    
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
