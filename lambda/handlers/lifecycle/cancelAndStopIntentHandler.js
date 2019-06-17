
module.exports = {

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
